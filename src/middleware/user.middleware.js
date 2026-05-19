// 密码加密
const bcrypt = require('bcryptjs')
const { getUserInfo } = require('../service/user.service')
// 导入错误类型
const { userFormateError, phoneFormateError, userAlreadyExited, userREgisterError, userDoesNotExist, userLoginError, userInvalidPassword } = require('../constant/err.type')
// 验证器
const userValidator = async (ctx, next) => {
    const { user_name, user_password } = ctx.request.body
    // 合法性
    if (!user_name || !user_password) {
        // 错误日志
        console.error('账号或密码为空', ctx.request.body)
        ctx.app.emit('error', userFormateError, ctx)
        return
    }
    await next()
}
const phoneValidator = async (ctx, next) => {
    const phone = ctx.params.phone;
    console.log(phone)
    if (!phone) {
        console.error('手机号为空', ctx.params.phone)
        ctx.app.emit('error', phoneFormateError, ctx)
        return
    }
    await next()
}
// 验证用户
const verifyUser = async (ctx, next) => {
    const { user_name, user_password, user_phone } = ctx.request.body
    // 合理性
    // if (await getUserInfo({ user_name })) {
    //     ctx.app.emit('error', userAlreadyExited, ctx)
    //     return
    // }
    try {
        const res = await getUserInfo({ user_name, user_phone })
        if (res) {
            console.error('账号已经存在', { user_name, user_phone })
            ctx.app.emit('error', userAlreadyExited, ctx)
            return
        }
    } catch (error) {
        console.error('获取用户信息错误', error)
        ctx.app.emit('error', userREgisterError, ctx)
        return
    }
    await next()
}

const cryptPassword = async (ctx, next) => {
    const { user_password } = ctx.request.body
    // 加严10次
    const salt = bcrypt.genSaltSync(10)
    // 存储密文
    const hash = bcrypt.hashSync(user_password, salt)

    ctx.request.body.user_password = hash
    await next()
}

// 验证登录
const verifyLogin = async (ctx, next) => {
    // 1. 判断用户是否存在
    const { user_name, user_password, user_phone } = ctx.request.body
    try {
        const res = await getUserInfo({ user_name, user_phone })
        if (!res) {
            console.error('用户不存在', { user_name, user_phone })
            return ctx.app.emit('error', userDoesNotExist, ctx)
        }
        // 2. 当用户密码是否正确
        if (!bcrypt.compareSync(user_password, res.user_password)) {
            return ctx.app.emit('error', userInvalidPassword, ctx)
        }
    } catch (error) {
        console.error(error)
        ctx.app.emit('error', userLoginError, ctx)
        return
    }

    await next()

}

module.exports = { userValidator, verifyUser, cryptPassword, verifyLogin, phoneValidator }
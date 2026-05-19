const jwt = require('jsonwebtoken')

const { createUser, getUserInfo, updateById,findOneUserPhone } = require('../service/user.service')

const { userREgisterError } = require('../constant/err.type')

const { JWT_SECRET } = require("../config/config.default")
class UserController {
    async register(ctx, next) {
        // 1.获取数据
        const { user_name, user_password,user_phone } = ctx.request.body;
        // 2.操作数据库
        try {
            const result = await createUser(user_name, user_password,user_phone)
            // 3.返回数据
            ctx.body = {
                code: 0,
                message: "用户注册成功",
                result: {
                    id: result.id,
                    user_name: result.user_name,
                }
            }
        } catch (err) {
            console.log(err);
            ctx.app.emit('error', userREgisterError, ctx)
        }

    }
    async login(ctx, next) {
        const { user_name } = ctx.request.body;
        // 1. 获取用户信息(token的payload中，记录id，user_name，is_admin)
        try {
            // 去除user_password字段
            const { user_password, ...res } = await getUserInfo({ user_name })
            ctx.body = {
                code: 0,
                message: '用户登录成功',
                result: {
                    token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
                    res: res
                }
            }
            console.log(jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }))
        } catch (error) {
            console.error("用户登录失败", err)
        }
        // 2. 
    }
    async changePassword(ctx, next) {
        // 1. 获取数据
        const id = ctx.state.user.id
        const user_password = ctx.request.body.user_password
        // 2. 操作数据库
        if (await updateById({ id, user_password })) {
            ctx.body = {
                code: 0,
                message: '修改密码成功',
                result: ''
            }
        } else {
            ctx.body = {
                code: '10007',
                message: '修改密码失败',
                result: ''
            }
        }
        // 3. 返回结果    
    }
    async loginPhone(ctx, next) {
        // 获取phone
        const phone = ctx.params.phone;
        const res = await findOneUserPhone(phone)
        ctx.body = {
            code: 0,
            message: "登录成功",
            result: res
        }
    }
}

module.exports = new UserController();
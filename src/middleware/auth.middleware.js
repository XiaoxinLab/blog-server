const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/config.default')

// 导入错误信息
const { tokenExpiredError, invalidToken, hasNotAdminPermission, guestNoPermission } = require('../constant/err.type')

const auth = async (ctx, next) => {
    const { authorization = '' } = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    // 验证token
    try {
        // user中包含payload信息
        console.log(token)
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user;
        // console.log('user', user)
    } catch (error) {
        switch (error.name) {
            case 'TokenExpiredError':
                console.error('token过期', error)
                return ctx.app.emit('error', tokenExpiredError, ctx)
            case 'JsonWebTokenError':
                console.error('token无效', error)
                return ctx.app.emit('error', invalidToken, ctx)
        }
    }

    await next()
}

// 判断用户权限
const hadAdminPermission = async (ctx, next) => {
    const { is_admin } = ctx.state.user
    if (!is_admin) {
        console.error('无管理员权限', ctx.state.user);
        return ctx.app.emit('error', hasNotAdminPermission, ctx)
    }
    await next()
}

// 检查是否为游客（游客无写操作权限）
const checkGuestPermission = async (ctx, next) => {
    const { is_guest } = ctx.state.user
    if (is_guest) {
        console.error('游客账号无操作权限', ctx.state.user);
        return ctx.app.emit('error', guestNoPermission, ctx)
    }
    await next()
}


module.exports = { auth, hadAdminPermission, checkGuestPermission }
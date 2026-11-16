module.exports = {
    invalidParamsError: {
        code: '10206',
        message: '参数不合法',
        result: ''
    },
    userFormateError: {
        code: '10001',
        message: "账号或密码为空",
        result: ""
    },
    phoneFormateError: {
        code: '10001',
        message: "手机号为空",
        result: ""
    },
    userAlreadyExited: {
        code: "10002",
        message: "账号已存在",
        result: ""
    },
    userREgisterError: {
        code: '10003',
        message: "注册失败",
        result: ""
    },
    userDoesNotExist: {
        code: '10004',
        message: "账号不存在",
        result: ""
    },
    userLoginError: {
        code: '10005',
        message: "账号登录失败",
        result: ""
    },
    userInvalidPassword: {
        code: '10006',
        message: "账号密码错误",
        result: ""
    },
    tokenExpiredError: {
        code: '10101',
        message: "token过期",
        result: ""
    },
    invalidToken: {
        code: "10102",
        message: "无效token",
        result: ""
    },
    hasNotAdminPermission: {
        code: '10103',
        message: "没有管理员权限",
        result: ""
    },
    fileUploadError: {
        code: '10201',
        message: '图片上传失败',
        result: ''
    },
    unSupportedFileType: {
        code: "10202",
        message: "不支持的文件类型",
        result: ""
    },
    articleFormatError: {
        code: '10203',
        message: '文章格式错误',
        result: ''
    },
    publishArticleError: {
        code: '10204',
        message: '发布文章失败',
        result: ''
    },
    invalidArticleID: {
        code: "10205",
        message: "无效的文章ID",
        result: ""
    },
    hasNotAdminPermission: {
        code: '10103',
        message: '没有管理员权限',
        result: ''
    },
    guestNoPermission: {
        code: '10104',
        message: '游客账号无操作权限，仅支持预览',
        result: ''
    },
    guestAccountError: {
        code: '10105',
        message: '游客账号创建失败',
        result: ''
    }
}
const Router = require('koa-router');

// 导入中间件
const { userValidator, phoneValidator, verifyUser, cryptPassword, verifyLogin } = require('../middleware/user.middleware')

const { auth } = require("../middleware/auth.middleware")

const { register, login, changePassword, loginPhone } = require('../controller/user.controller');

const router = new Router({ prefix: '/user' });

// 注册接口
router.post('/register', userValidator, verifyUser, cryptPassword, register);

// 登录
router.post('/login', userValidator, verifyLogin, login);
router.post('/login/phone/:phone', phoneValidator, loginPhone);

// 修改密码
router.patch('/', auth, cryptPassword, changePassword)

module.exports = router;
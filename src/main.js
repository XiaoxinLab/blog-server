const app = require('./app')

const { APP_PORT } = require('./config/config.default')

const UserService = require('./service/user.service')

// 初始化游客账号
UserService.initGuestAccount().then(() => {
    console.log('✅ 游客账号初始化完成（用户名: tourist, 密码: tourist）');
}).catch(err => {
    console.error('❌ 游客账号初始化失败:', err);
});

// app.listen(APP_PORT, () => {
//     console.log(`server in running on https://localhost:${APP_PORT}`)
// })
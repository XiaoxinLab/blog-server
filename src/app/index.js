const path = require('path')

const Koa = require('koa')
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static')
const parameter = require('koa-parameter')
const Cors = require('@koa/cors')
const fs = require('fs');
const https = require('https');
const enforceHttps = require('koa-sslify');
// 导入错误处理
const errHandler = require('./errHandler')
// 路由
const router = require('../router')

const app = new Koa()
//  证书
// 使用绝对路径
const keyPath = path.resolve(__dirname, '../ssl/xiaoxinl.asia.key');
const certPath = path.resolve(__dirname, '../ssl/xiaoxinl.asia.pem');

const options = {
    key: fs.readFileSync(keyPath), // 读取私钥
    cert: fs.readFileSync(certPath) // 读取证书
};
// 中间件
app.use(KoaBody.koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, '../upload'),
        keepExtensions: true,
    },
    parsedMethods: ['POST', 'PUT', 'PATCH', "DELETE"]
}))
app.use(Cors())
app.use(KoaStatic(path.join(__dirname, '../upload')))
app.use(parameter(app))

app.use(router.routes()).use(router.allowedMethods())
app.on('error', errHandler)
 
app.listen(1011,()=>{
    console.log('服务启动成功,http://localhost:1011')
})

// https.createServer(options, app.callback()).listen(8000);

// https.createServer(options, (req, res) => {
//     res.writeHead(200);
//     res.end('hello world\n');
//   }).listen(8000);

// 进行统一错误处理
module.exports = app 
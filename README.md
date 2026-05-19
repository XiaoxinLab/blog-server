# Blog Server

基于 **Koa.js + Sequelize + MySQL** 构建的博客系统后端服务。

## 技术栈

- **Koa.js** - Web 框架
- **Sequelize** - ORM 框架
- **MySQL** - 数据库
- **JWT** - 身份认证
- **bcryptjs** - 密码加密
- **koa-body** - 文件上传
- **koa-parameter** - 参数校验

## API 模块

- 文章管理 - CRUD、模糊搜索、上架/下架、图片上传
- 项目管理 - CRUD、图片上传
- 用户管理 - 注册、登录、JWT 认证
- 字典管理 - 系统字典项维护
- 访客统计 - 页面访问记录

## 快速开始

```bash
# 安装依赖
npm install

# 配置环境变量 (复制 .env.example 或参考下方配置)
# 创建 .env 文件

# 启动开发服务器
npm run dev
```

## 环境变量

在项目根目录创建 `.env` 文件：

```env
APP_PORT=8000
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PWD=your_password
MYSQL_DB=blog_database
JWT_SECRET=your_jwt_secret_key
```

## 项目结构

```
server/
├── src/
│   ├── app/             # Koa 应用初始化与错误处理
│   ├── config/          # 配置项
│   ├── constant/        # 常量定义 (错误类型)
│   ├── controller/      # 控制器层
│   ├── db/              # 数据库连接
│   ├── middleware/       # 中间件 (auth, article, user)
│   ├── model/           # 数据模型
│   ├── router/          # 路由定义
│   ├── service/         # 服务层
│   ├── ssl/             # SSL 证书
│   └── upload/          # 上传文件目录
└── main.js              # 入口文件
```

## 标准响应格式

```json
{
  "code": 0,
  "message": "操作成功",
  "result": { }
}
```
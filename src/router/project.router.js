const Router = require('koa-router')

const { auth, hadAdminPermission, checkGuestPermission } = require('../middleware/auth.middleware')

const { upload, create, update, remove, findAll, restore, findOne, findAllPublic } = require('../controller/project.controller')

const router = new Router({ prefix: '/project' })

// 图片上传
router.post('/upload', auth, hadAdminPermission, checkGuestPermission, upload)

// 发布项目
router.post('/', auth, hadAdminPermission, checkGuestPermission, create)

// 修改项目
router.put('/:id', auth, hadAdminPermission, checkGuestPermission, update)

// 删除项目（软删除）
router.post('/:id/off', auth, hadAdminPermission, checkGuestPermission, remove)
router.post('/:id/on', auth, hadAdminPermission, checkGuestPermission, restore)

// 获取项目列表（后台管理）- 所有登录用户可查看
router.get('/', auth, findAll)

// 获取单个项目 - 所有登录用户可查看
router.get('/findOne/:id', auth, findOne)

// 公开接口：获取所有项目（前端展示）
router.get('/public', findAllPublic)

module.exports = router
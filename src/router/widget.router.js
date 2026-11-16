const Router = require('koa-router')
const widgetController = require('../controller/widget.controller')
const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const router = new Router({ prefix: '/widget' })

// 公开接口（无需认证），博客前台用
router.get('/public', widgetController.publicList)
router.get('/public/findOne/:key', widgetController.publicFindOne)
router.get('/categories', widgetController.categories)

// 需要管理员权限的接口，后台管理用
router.get('/', auth, hadAdminPermission, widgetController.list)
router.get('/findOne/:id', auth, hadAdminPermission, widgetController.findOne)
router.post('/create', auth, hadAdminPermission, widgetController.create)
router.put('/update/:id', auth, hadAdminPermission, widgetController.update)
router.delete('/delete/:id', auth, hadAdminPermission, widgetController.delete)

module.exports = router

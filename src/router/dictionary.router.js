const Router = require('koa-router')
const dictionaryController = require('../controller/dictionary.controller')
const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const router = new Router({ prefix: '/dictionary' })

// 公开接口（无需认证）
router.get('/findByType/:type', dictionaryController.findByType)
router.get('/types', dictionaryController.findAllTypes)

// 需要管理员权限的接口
router.post('/init', auth, hadAdminPermission, dictionaryController.init)
router.post('/create', auth, hadAdminPermission, dictionaryController.create)
router.put('/update/:id', auth, hadAdminPermission, dictionaryController.update)
router.delete('/delete/:id', auth, hadAdminPermission, dictionaryController.delete)
router.get('/findOne/:id', auth, hadAdminPermission, dictionaryController.findOne)
router.get('/', auth, hadAdminPermission, dictionaryController.list)

module.exports = router
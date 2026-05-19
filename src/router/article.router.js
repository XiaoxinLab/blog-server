const Router = require('koa-router')

const { auth, hadAdminPermission, checkGuestPermission } = require('../middleware/auth.middleware')
const { validator, validator2 } = require('../middleware/article.middleware')

const { upload, create, update, remove, findAll, restore, findOne, findByCategory,fuzzyKeywords,findKeyWordsAll, uploadMd } = require('../controller/article.controller')

const router = new Router({ prefix: '/article' })

// 图片上传
router.post('/upload', auth, hadAdminPermission, checkGuestPermission, upload)

// Markdown 文件上传
router.post('/uploadMd', auth, hadAdminPermission, checkGuestPermission, uploadMd)

// 发布文章
router.post('/', auth, hadAdminPermission, checkGuestPermission, validator, create)

// 修改文章
router.put('/:id', auth, hadAdminPermission, checkGuestPermission, validator, update)

// 模糊查询
router.get('/fuzzyKeywords/:key', fuzzyKeywords)
// router.get('/fuzzyKeywords', findKeyWordsAll)

// 硬删除文章
// router.delete('/', auth, hadAdminPermission, validator2({ ids: 'array' }))

// 软删除文章
router.post('/:id/off', auth, hadAdminPermission, checkGuestPermission, remove)
router.post('/:id/on', auth, hadAdminPermission, checkGuestPermission, restore)

// 获取文章列表
router.get('/', findAll)

// 获取单个文章
router.get('/findOne/:id', findOne)

// 获取某个分类
router.get('/findByCategory/:category', findByCategory)



module.exports = router
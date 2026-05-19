const Router = require('koa-router')

const { record, getVisitStats, getTotalVisits, getVisitorList } = require('../controller/visit.controller')

const router = new Router({ prefix: '/visit' })

router.post('/record', record)
router.get('/stats', getVisitStats)
router.get('/total', getTotalVisits)
router.get('/visitors', getVisitorList)

module.exports = router

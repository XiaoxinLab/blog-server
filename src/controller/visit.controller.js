const { recordVisit, getStats, getVisitorList } = require('../service/visit.service')

class VisitController {
    async record(ctx) {
        try {
            const visitData = {
                pagePath: ctx.request.body.pagePath || ctx.request.body.page_path,
                pageTitle: ctx.request.body.pageTitle || ctx.request.body.page_title,
                ipAddress: ctx.ip || ctx.request.ip || null,
                userAgent: ctx.get('User-Agent') || null,
                referrer: ctx.get('Referer') || ctx.request.body.referrer || null
            }

            if (!visitData.pagePath) {
                ctx.status = 400
                ctx.body = {
                    code: -1,
                    message: '页面路径不能为空',
                    result: null
                }
                return
            }

            await recordVisit(visitData)

            ctx.body = {
                code: 0,
                message: '记录访问成功',
                result: null
            }
        } catch (error) {
            console.error('记录访问失败:', error)
            ctx.status = 500
            ctx.body = {
                code: -1,
                message: '服务器内部错误',
                result: null
            }
        }
    }

    async getVisitStats(ctx) {
        try {
            const { days = 7 } = ctx.request.query
            const stats = await getStats(parseInt(days))

            ctx.body = {
                code: 0,
                message: '获取访问统计成功',
                result: stats
            }
        } catch (error) {
            console.error('获取访问统计失败:', error)
            ctx.status = 500
            ctx.body = {
                code: -1,
                message: '服务器内部错误',
                result: null
            }
        }
    }

    async getTotalVisits(ctx) {
        try {
            const PageVisit = require('../model/pageVisit.model')
            const total = await PageVisit.count()

            ctx.body = {
                code: 0,
                message: '获取总访问量成功',
                result: { totalVisits: total }
            }
        } catch (error) {
            console.error('获取总访问量失败:', error)
            ctx.status = 500
            ctx.body = {
                code: -1,
                message: '服务器内部错误',
                result: null
            }
        }
    }

    async getVisitorList(ctx) {
        try {
            const { pageNum = 1, pageSize = 20 } = ctx.request.query
            const result = await getVisitorList({
                pageNum: parseInt(pageNum),
                pageSize: parseInt(pageSize)
            })

            ctx.body = {
                code: 0,
                message: '获取访客列表成功',
                result: result
            }
        } catch (error) {
            console.error('获取访客列表失败:', error)
            ctx.status = 500
            ctx.body = {
                code: -1,
                message: '服务器内部错误',
                result: null
            }
        }
    }
}

module.exports = new VisitController()

const { Op } = require('sequelize')
const PageVisit = require('../model/pageVisit.model')

function parseUserAgent(userAgent) {
    if (!userAgent) return { type: '未知', name: '未知设备' }

    let type = '其他'
    let name = userAgent

    if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        type = '移动端'
        if (/iPhone|iPad|iPod/i.test(userAgent)) {
            name = 'iOS 设备'
        } else if (/Android/i.test(userAgent)) {
            const match = userAgent.match(/Android\s+([\d.]+)/)
            name = match ? `Android ${match[1]}` : 'Android 设备'
        } else {
            name = '移动设备'
        }
    } else if (/Windows|Macintosh|Linux|X11/i.test(userAgent)) {
        type = '桌面端'
        if (/Windows NT 10/i.test(userAgent)) {
            name = 'Windows 10/11'
        } else if (/Windows NT 6\.[0-9]/i.test(userAgent)) {
            name = 'Windows 7/8'
        } else if (/Macintosh/i.test(userAgent)) {
            name = 'macOS'
        } else if (/Linux/i.test(userAgent)) {
            name = 'Linux'
        } else {
            name = '桌面设备'
        }
    }

    const browserMatch = userAgent.match(/(Chrome|Firefox|Safari|Edge|Opera|MSIE|Trident)[\/\s]([\d.]+)/i)
    if (browserMatch) {
        name += ` / ${browserMatch[1]} ${browserMatch[2]}`
    }

    return { type, name }
}

class VisitService {
    async recordVisit(visitData) {
        const visit = await PageVisit.create({
            page_path: visitData.pagePath,
            page_title: visitData.pageTitle || null,
            ip_address: visitData.ipAddress || null,
            user_agent: visitData.userAgent || null,
            referrer: visitData.referrer || null
        })
        return visit
    }

    async getStats(days = 7) {
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - days)
        startDate.setHours(0, 0, 0, 0)

        const totalVisits = await PageVisit.count()

        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const todayVisits = await PageVisit.count({
            where: {
                createdAt: {
                    [Op.gte]: today
                }
            }
        })

        const dailyStats = []
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date()
            date.setDate(date.getDate() - i)
            date.setHours(0, 0, 0, 0)

            const nextDate = new Date(date)
            nextDate.setDate(nextDate.getDate() + 1)

            const count = await PageVisit.count({
                where: {
                    createdAt: {
                        [Op.gte]: date,
                        [Op.lt]: nextDate
                    }
                }
            })

            dailyStats.push({
                date: date.toISOString().split('T')[0],
                dayName: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()],
                count: count
            })
        }

        const pageStats = await PageVisit.findAll({
            attributes: [
                'page_path',
                'page_title',
                [PageVisit.sequelize.fn('COUNT', PageVisit.sequelize.col('id')), 'visit_count']
            ],
            where: {
                createdAt: {
                    [Op.gte]: startDate
                }
            },
            group: ['page_path', 'page_title'],
            order: [[PageVisit.sequelize.literal('visit_count'), 'DESC']],
            limit: 10,
            raw: true
        })

        return {
            totalVisits,
            todayVisits,
            dailyStats,
            topPages: pageStats.map(p => ({
                path: p.page_path,
                title: p.page_title || p.page_path,
                visits: parseInt(p.visit_count)
            }))
        }
    }

    async getVisitorList({ pageNum = 1, pageSize = 20 }) {
        const offset = (pageNum - 1) * pageSize
        const { count, rows } = await PageVisit.findAndCountAll({
            order: [['createdAt', 'DESC']],
            limit: parseInt(pageSize),
            offset: parseInt(offset),
            raw: true
        })

        const visitorList = rows.map(visit => ({
            id: visit.id,
            time: visit.createdAt,
            ip: visit.ip_address,
            device: parseUserAgent(visit.user_agent),
            page: visit.page_path,
            pageTitle: visit.page_title,
            referrer: visit.referrer
        }))

        return {
            total: count,
            list: visitorList,
            pageNum: parseInt(pageNum),
            pageSize: parseInt(pageSize)
        }
    }
}

module.exports = new VisitService()

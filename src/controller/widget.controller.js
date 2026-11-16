const { createWidget, updateWidget, deleteWidget, findOneWidget, findOneByKey, findPublicList, findWidgetList, findAllCategories, checkKeyExists } = require('../service/widget.service')
const { invalidParamsError } = require('../constant/err.type')

class WidgetController {
    /**
     * 前台列表
     */
    async publicList(ctx) {
        const { category = 'all' } = ctx.query

        try {
            const res = await findPublicList(category)

            ctx.body = {
                code: 0,
                message: '查询组件列表成功',
                result: res
            }
        } catch (error) {
            console.error('查询组件列表失败:', error)
            ctx.body = {
                code: -1,
                message: '查询组件列表失败',
                result: []
            }
        }
    }

    /**
     * 前台详情，按 widget_key 查
     */
    async publicFindOne(ctx) {
        const { key } = ctx.params

        if (!key) {
            return ctx.app.emit('error', invalidParamsError, ctx)
        }

        try {
            const res = await findOneByKey(key)

            if (!res) {
                return ctx.app.emit('error', invalidParamsError, ctx)
            }

            ctx.body = {
                code: 0,
                message: '查询组件成功',
                result: res
            }
        } catch (error) {
            console.error('查询组件失败:', error)
            ctx.body = {
                code: -1,
                message: '查询组件失败',
                result: null
            }
        }
    }

    /**
     * 所有分类
     */
    async categories(ctx) {
        try {
            const res = await findAllCategories()

            ctx.body = {
                code: 0,
                message: '查询组件分类成功',
                result: res
            }
        } catch (error) {
            console.error('查询组件分类失败:', error)
            ctx.body = {
                code: -1,
                message: '查询组件分类失败',
                result: []
            }
        }
    }

    /**
     * 后台分页列表
     */
    async list(ctx) {
        const { category = 'all', pageNum = 1, pageSize = 10 } = ctx.query

        try {
            const res = await findWidgetList(category, parseInt(pageNum), parseInt(pageSize))

            ctx.body = {
                code: 0,
                message: '查询组件列表成功',
                result: res
            }
        } catch (error) {
            console.error('查询组件列表失败:', error)
            ctx.body = {
                code: -1,
                message: '查询组件列表失败',
                result: { list: [], total: 0, pageNum: 1, pageSize: 10 }
            }
        }
    }

    /**
     * 后台详情，按 ID 查
     */
    async findOne(ctx) {
        const { id } = ctx.params

        if (!id) {
            return ctx.app.emit('error', invalidParamsError, ctx)
        }

        try {
            const res = await findOneWidget(id)

            if (!res) {
                return ctx.app.emit('error', invalidParamsError, ctx)
            }

            ctx.body = {
                code: 0,
                message: '查询组件成功',
                result: res
            }
        } catch (error) {
            console.error('查询组件失败:', error)
            ctx.body = {
                code: -1,
                message: '查询组件失败',
                result: null
            }
        }
    }

    /**
     * 新增组件
     */
    async create(ctx) {
        const { widget_key, title, desc, category, code_html, code_css, code_js, sort_order, status, remark } = ctx.request.body

        if (!widget_key || !title) {
            return ctx.app.emit('error', invalidParamsError, ctx)
        }

        try {
            const exists = await checkKeyExists(widget_key)
            if (exists) {
                ctx.body = {
                    code: -1,
                    message: '组件标识已存在，换一个',
                    result: ''
                }
                return
            }

            const res = await createWidget({
                widget_key,
                title,
                desc: desc || '',
                category: category || 'visual',
                code_html: code_html || '',
                code_css: code_css || '',
                code_js: code_js || '',
                sort_order: sort_order || 0,
                status: status === undefined ? 1 : status,
                remark: remark || ''
            })

            ctx.body = {
                code: 0,
                message: '新增组件成功',
                result: res
            }
        } catch (error) {
            console.error('新增组件失败:', error)
            ctx.body = {
                code: -1,
                message: '新增组件失败',
                result: ''
            }
        }
    }

    /**
     * 修改组件
     */
    async update(ctx) {
        const { id } = ctx.params
        const { widget_key, title, desc, category, code_html, code_css, code_js, sort_order, status, remark } = ctx.request.body

        if (!id || !title) {
            return ctx.app.emit('error', invalidParamsError, ctx)
        }

        try {
            if (widget_key) {
                const exists = await checkKeyExists(widget_key, id)
                if (exists) {
                    ctx.body = {
                        code: -1,
                        message: '组件标识已存在，换一个',
                        result: ''
                    }
                    return
                }
            }

            const data = {
                title,
                desc: desc || '',
                category: category || 'visual',
                code_html: code_html || '',
                code_css: code_css || '',
                code_js: code_js || '',
                sort_order: sort_order || 0,
                status: status === undefined ? 1 : status,
                remark: remark || ''
            }
            if (widget_key) {
                data.widget_key = widget_key;
            }

            const res = await updateWidget(id, data)

            ctx.body = {
                code: 0,
                message: res ? '修改组件成功' : '要改的组件不存在',
                result: res
            }
        } catch (error) {
            console.error('修改组件失败:', error)
            ctx.body = {
                code: -1,
                message: '修改组件失败',
                result: ''
            }
        }
    }

    /**
     * 删除组件
     */
    async delete(ctx) {
        const { id } = ctx.params

        if (!id) {
            return ctx.app.emit('error', invalidParamsError, ctx)
        }

        try {
            const res = await deleteWidget(id)

            ctx.body = {
                code: 0,
                message: res ? '删除组件成功' : '要删的组件不存在',
                result: res
            }
        } catch (error) {
            console.error('删除组件失败:', error)
            ctx.body = {
                code: -1,
                message: '删除组件失败',
                result: ''
            }
        }
    }
}

module.exports = new WidgetController()

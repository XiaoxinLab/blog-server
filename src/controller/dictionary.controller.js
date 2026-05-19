const { createDictionary, updateDictionary, deleteDictionary, findOneDictionary, findByType, findAllTypes, findDictionaryList, checkKeyExists, initDefaultData } = require('../service/dictionary.service')
const { invalidParamsError } = require('../constant/err.type')

class DictionaryController {
    async init(ctx) {
        try {
            await initDefaultData()
            ctx.body = {
                code: 0,
                message: '字典初始化成功',
                result: ''
            }
        } catch (error) {
            console.error('字典初始化失败:', error)
            ctx.body = {
                code: -1,
                message: '字典初始化失败',
                result: ''
            }
        }
    }

    async create(ctx) {
        const { dict_type, dict_key, dict_value, sort_order, status, remark } = ctx.request.body
        
        if (!dict_type || !dict_key || !dict_value) {
            return ctx.app.emit('error', invalidParamsError, ctx)
        }

        const exists = await checkKeyExists(dict_type, dict_key)
        if (exists) {
            ctx.body = {
                code: -1,
                message: '该字典类型下已存在相同的键',
                result: ''
            }
            return
        }

        try {
            const res = await createDictionary({
                dict_type,
                dict_key,
                dict_value,
                sort_order: sort_order || 0,
                status: status !== undefined ? status : 1,
                remark: remark || ''
            })
            
            const { createdAt, updatedAt, ...data } = res
            
            ctx.body = {
                code: 0,
                message: '创建字典成功',
                result: data
            }
        } catch (error) {
            console.error('创建字典失败:', error)
            ctx.body = {
                code: -1,
                message: '创建字典失败',
                result: ''
            }
        }
    }

    async update(ctx) {
        const id = ctx.params.id
        const { dict_type, dict_key, dict_value, sort_order, status, remark } = ctx.request.body

        if (!id) {
            return ctx.app.emit('error', invalidParamsError, ctx)
        }

        if (dict_type && dict_key) {
            const exists = await checkKeyExists(dict_type, dict_key, id)
            if (exists) {
                ctx.body = {
                    code: -1,
                    message: '该字典类型下已存在相同的键',
                    result: ''
                }
                return
            }
        }

        try {
            const updateData = {}
            if (dict_type !== undefined) updateData.dict_type = dict_type
            if (dict_key !== undefined) updateData.dict_key = dict_key
            if (dict_value !== undefined) updateData.dict_value = dict_value
            if (sort_order !== undefined) updateData.sort_order = sort_order
            if (status !== undefined) updateData.status = status
            if (remark !== undefined) updateData.remark = remark

            const success = await updateDictionary(id, updateData)
            
            if (success) {
                ctx.body = {
                    code: 0,
                    message: '更新字典成功',
                    result: ''
                }
            } else {
                ctx.body = {
                    code: -1,
                    message: '字典不存在或更新失败',
                    result: ''
                }
            }
        } catch (error) {
            console.error('更新字典失败:', error)
            ctx.body = {
                code: -1,
                message: '更新字典失败',
                result: ''
            }
        }
    }

    async delete(ctx) {
        const id = ctx.params.id

        if (!id) {
            return ctx.app.emit('error', invalidParamsError, ctx)
        }

        try {
            const success = await deleteDictionary(id)
            
            if (success) {
                ctx.body = {
                    code: 0,
                    message: '删除字典成功',
                    result: ''
                }
            } else {
                ctx.body = {
                    code: -1,
                    message: '字典不存在或删除失败',
                    result: ''
                }
            }
        } catch (error) {
            console.error('删除字典失败:', error)
            ctx.body = {
                code: -1,
                message: '删除字典失败',
                result: ''
            }
        }
    }

    async findOne(ctx) {
        const id = ctx.params.id

        if (!id) {
            return ctx.app.emit('error', invalidParamsError, ctx)
        }

        try {
            const res = await findOneDictionary(id)
            
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '查询字典成功',
                    result: res
                }
            } else {
                ctx.body = {
                    code: -1,
                    message: '字典不存在',
                    result: ''
                }
            }
        } catch (error) {
            console.error('查询字典失败:', error)
            ctx.body = {
                code: -1,
                message: '查询字典失败',
                result: ''
            }
        }
    }

    async findByType(ctx) {
        const { type } = ctx.params

        if (!type) {
            return ctx.app.emit('error', invalidParamsError, ctx)
        }

        try {
            const res = await findByType(type)
            
            ctx.body = {
                code: 0,
                message: '查询字典列表成功',
                result: res
            }
        } catch (error) {
            console.error('查询字典列表失败:', error)
            ctx.body = {
                code: -1,
                message: '查询字典列表失败',
                result: []
            }
        }
    }

    async findAllTypes(ctx) {
        try {
            const res = await findAllTypes()
            
            ctx.body = {
                code: 0,
                message: '查询字典类型成功',
                result: res
            }
        } catch (error) {
            console.error('查询字典类型失败:', error)
            ctx.body = {
                code: -1,
                message: '查询字典类型失败',
                result: []
            }
        }
    }

    async list(ctx) {
        const { type = 'all', pageNum = 1, pageSize = 10 } = ctx.query

        try {
            const res = await findDictionaryList(type, parseInt(pageNum), parseInt(pageSize))
            
            ctx.body = {
                code: 0,
                message: '查询字典列表成功',
                result: res
            }
        } catch (error) {
            console.error('查询字典列表失败:', error)
            ctx.body = {
                code: -1,
                message: '查询字典列表失败',
                result: { list: [], total: 0, pageNum: 1, pageSize: 10 }
            }
        }
    }
}

module.exports = new DictionaryController()
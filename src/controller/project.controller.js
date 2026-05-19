const path = require('path')
const fs = require('fs')
const { fileUploadError, unSupportedFileType } = require('../constant/err.type')

const { createProject, updateProject, removeProject, restoreProject, findProject, findOneProject } = require('../service/project.service')

class ProjectController {
    async upload(ctx, next) {
        const { file } = ctx.request.files;
        const extname = path.extname(file.filepath).replace('.', '')
        const arr = ['image/jpeg', 'image/png']

        if (file) {
            if (!arr.includes(file.mimetype)) {
                return ctx.app.emit('error', unSupportedFileType, ctx)
            }
            ctx.body = {
                code: 0,
                message: '图片上传成功',
                result: {
                    project_image: path.basename(file.filepath)
                }
            }
        } else {
            return ctx.app.emit('error', fileUploadError, ctx)
        }
    }

    async create(ctx) {
        try {
            const { createdAt, updatedAt, ...res } = await createProject(ctx.request.body)
            ctx.body = {
                code: 0,
                message: "发布项目成功",
                result: res
            }
        } catch (error) {
            console.error(error)
            ctx.body = {
                code: -1,
                message: "发布项目失败",
                result: error.message
            }
        }
    }

    async update(ctx) {
        try {
            const res = await updateProject(ctx.params.id, ctx.request.body)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '修改项目成功',
                    result: ''
                }
            } else {
                ctx.body = {
                    code: -1,
                    message: '项目不存在',
                    result: ''
                }
            }
        } catch (err) {
            console.error(err)
            ctx.body = {
                code: -1,
                message: '修改项目失败',
                result: err.message
            }
        }
    }

    async findOne(ctx) {
        const res = await findOneProject(ctx.params.id)
        ctx.body = {
            code: 0,
            message: "查询项目成功",
            result: res
        }
    }

    async remove(ctx) {
        try {
            const res = await removeProject(ctx.params.id)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '删除项目成功',
                    result: ''
                }
            } else {
                ctx.body = {
                    code: -1,
                    message: '项目不存在',
                    result: ''
                }
            }
        } catch (err) {
            console.error(err)
            ctx.body = {
                code: -1,
                message: '删除项目失败',
                result: err.message
            }
        }
    }

    async restore(ctx) {
        const res = await restoreProject(ctx.params.id)
        if (res) {
            ctx.body = {
                code: 0,
                message: '恢复项目成功',
                result: ''
            }
        } else {
            ctx.body = {
                code: -1,
                message: '项目不存在',
                result: ''
            }
        }
    }

    async findAll(ctx) {
        try {
            const { pageNum = 1, pageSize = 10, search = '' } = ctx.request.query
            const res = await findProject(pageNum, pageSize, search)
            ctx.body = {
                code: 0,
                message: '获取项目列表成功',
                result: res
            }
        } catch (error) {
            console.error(error)
            ctx.body = {
                code: -1,
                message: '获取项目列表失败',
                result: error.message
            }
        }
    }

    async findAllPublic(ctx) {
        try {
            const res = await findProject(1, 100)
            ctx.body = {
                code: 0,
                message: '获取项目列表成功',
                result: res.list || []
            }
        } catch (error) {
            console.error(error)
            ctx.body = {
                code: -1,
                message: '获取项目列表失败',
                result: error.message
            }
        }
    }
}

module.exports = new ProjectController()
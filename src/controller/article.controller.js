const path = require('path')
const fs = require('fs')
const { fileUploadError, unSupportedFileType, publishArticleError, invalidArticleID } = require('../constant/err.type')

const { createArticle, updateArticle, removeArticle, restoreArticle, findArticle, findOneArticle, findArticleCategory, keywords, keyWordsAll } = require('../service/article.service')
class ArticleController {
    async upload(ctx, next) {
        // console.log(ctx.request.body)
        // 接受前端传递的base64编码


        const { file } = ctx.request.files;
        // const { file } = ctx.request.body
        // console.log(file.replace(/^data:image\/\w+;base64,/, ''));
        // const files = new Buffer.from(file.replace(/^data:image\/\w+;base64,/, ''), 'base64')
        // const filename = "image_" + Date.now() + ".png"
        // // console.log(files);
        // fs.writeFile(path.join(__dirname, '../upload', filename), files, function (err) {
        //     if (err) return console.log(err)
        //     console.log('Image saved successfully.')
        // })
        // ctx.body = {
        //     code: 0,
        //     message: '图片上传成功',
        //     result: {
        //         article_img: filename
        //     }
        // }
        // return
        // 取出后缀名
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
                    article_img: path.basename(file.filepath)
                }
            }
        } else {
            return ctx.app.emit('error', fileUploadError, ctx)
        }
    }

    async uploadMd(ctx) {
        const { file } = ctx.request.files
        if (!file) {
            return ctx.app.emit('error', fileUploadError, ctx)
        }
        const allowedMime = ['text/markdown', 'text/plain', 'application/octet-stream']
        const allowedExt = ['.md', '.markdown', '.txt']
        const ext = path.extname(file.originalFilename || file.newFilename || '').toLowerCase()
        if (!allowedExt.includes(ext) && !allowedMime.includes(file.mimetype)) {
            return ctx.app.emit('error', unSupportedFileType, ctx)
        }
        ctx.body = {
            code: 0,
            message: 'Markdown 文件上传成功',
            result: {
                article_file_url: path.basename(file.filepath)
            }
        }
    }

    async create(ctx) {
        // 直接调用service得createArticle方法
        try {
            const { createdAt, updatedAt, ...res } = await createArticle(ctx.request.body)
            ctx.body = {
                code: 0,
                message: "发布文章成功",
                result: res
            }
        } catch (error) {
            console.error(error)
            return ctx.app.emit('error', publishArticleError, ctx)
        }
    }

    async update(ctx) {
        try {
            const res = await updateArticle(ctx.params.id, ctx.request.body)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '修改文章成功',
                    result: ''
                }
            } else {
                return ctx.app.emit('error', invalidArticleID, ctx)
            }
        } catch (err) {
            console.error(err)
        }
    }

    async findOne(ctx) {
        const res = await findOneArticle(ctx.params.id)
        ctx.body = {
            code: 0,
            message: "查询文章成功",
            result: res
        }
    }

    async remove(ctx) {
        try {
            const res = await removeArticle(ctx.params.id)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '下架文章成功',
                    result: ''
                }
            } else {
                return ctx.app.emit('error', invalidArticleID, ctx)
            }

        } catch (err) {
            console.error(err)
        }
    }

    async restore(ctx) {
        const res = await restoreArticle(ctx.params.id)
        if (res) {
            ctx.body = {
                code: 0,
                message: '恢复文章成功',
                result: ''
            }
        } else {
            return ctx.app.emit('error', invalidArticleID, ctx)

        }
    }

    async findAll(ctx) {
        // 解析所有查询参数（统一接口）
        const { 
            pageNum = 1, 
            pageSize = 10, 
            article_classification,
            key  // 搜索关键字
        } = ctx.request.query
        
        console.log('=== /article/ 统一接口参数 ===')
        console.log('完整 query:', ctx.request.query)
        console.log('pageNum:', pageNum)
        console.log('pageSize:', pageSize)
        console.log('分类筛选:', article_classification)
        console.log('搜索关键字:', key)
        
        // 处理数据（传递所有参数）
        const res = await findArticle(pageNum, pageSize, article_classification, key)
        
        // 返回结果
        ctx.body = {
            code: 0,
            message: '获取文章列表成功',
            result: res
        }
    }

    async findByCategory(ctx) {
        // 解析分页参数
        const { pageNum = 1, pageSize = 10 } = ctx.request.query
        const category = ctx.request.params.category
        // 处理数据
        const res = await findArticleCategory(category, pageNum, pageSize)
        ctx.body = {
            code: 0,
            message: "查询文章分类列表",
            result: res
        }
    }

    async fuzzyKeywords(ctx) {
        const key = ctx.request.params.key
        const { pageNum = 1, pageSize = 10, article_classification } = ctx.request.query
        
        console.log('=== fuzzyKeywords 接口参数 ===')
        console.log('搜索关键字:', key)
        console.log('分类筛选:', article_classification)
        
        const res = await keywords(key, pageNum, pageSize, article_classification)
        ctx.body = {
            code: 0,
            message: "获取关键字成功",
            result: res
        }
    }

    async findKeyWordsAll(ctx) {
        const res = await keyWordsAll()
        // console.log(res)
        // ctx.body = {
        //     code: 0,
        //     message: "获取关键字成功",
        //     result: res
        // }
    }

}

module.exports = new ArticleController()
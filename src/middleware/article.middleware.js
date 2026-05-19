const { articleFormatError } = require('../constant/err.type')

const validator = async (ctx, next) => {
    try {
        ctx.verifyParams({
            article_title: {
                type: 'string',
                required: true
            },
            article_author: {
                type: 'string',
                required: true
            },
            article_classification: {
                type: 'string',
                required: true
            },
            article_content: {
                type: 'string',
                required: false
            },
            article_img: {
                type: 'string',
                required: true
            },
            article_file_url: {
                type: 'string',
                required: false
            }

        })
    } catch (err) {
        console.error(err)
        articleFormatError.result = err
        return ctx.app.emit('error', articleFormatError, ctx)
    }

    const { article_content, article_file_url } = ctx.request.body
    if (!article_content && !article_file_url) {
        ctx.body = {
            code: '10203',
            message: '文章内容和上传文件至少填写一项'
        }
        return
    }

    await next()
}
const validator2 = (rules) => {
    return async (ctx, next) => {
        try {
            ctx.verifyParams(rules)
        } catch (err) {
            console.error(err)
        }
        await next()
    }
}

module.exports = { validator, validator2 }
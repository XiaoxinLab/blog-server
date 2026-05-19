
const Articles = require('../model/article.model');

// 使用模糊查询需要先引入Op
const seq = require('sequelize');
const Op = seq.Op;

class ArticleService {
    async createArticle(article) {
        const res = await Articles.create(article);
        // console.log(res)
        return res.dataValues;
    }

    async updateArticle(id, article) {
        const res = await Articles.update(article, { where: { id: id } });
        return res[0] > 0 ? true : false
    }

    async findOneArticle(id) {
        const res = await Articles.findOne({ where: { id: id } });
        return res.dataValues;
    }

    async removeArticle(id) {
        const res = await Articles.destroy({ where: { id: id } });
        return res > 0 ? true : false
    }

    async restoreArticle(id) {
        const res = await Articles.restore({ where: { id: id } });
        return res > 0 ? true : false
    }

    async findArticle(pageNum, pageSize, article_classification = '', key = '') {
        const offset = (pageNum - 1) * pageSize;
        const limit = +pageSize;
        
        console.log('=== /article/ 统一查询接口 ===')
        console.log('pageNum:', pageNum)
        console.log('pageSize:', pageSize)
        console.log('分类筛选:', article_classification)
        console.log('搜索关键字:', key)
        
        // 构建查询条件
        let whereClause = {}
        
        // 1️⃣ 关键字搜索条件（标题模糊匹配）
        if (key && key.trim() !== '' && key !== 'all') {
            whereClause.article_title = {
                [Op.like]: `%${key}%`
            }
            console.log('添加标题搜索条件:', key)
        }
        
        // 2️⃣ 分类筛选条件（不区分大小写）
        if (article_classification && article_classification.trim() !== '') {
            const classificationValue = article_classification.trim().toLowerCase()
            
            // 使用不区分大小写的匹配
            const classificationCondition = {
                article_classification: {
                    [Op.or]: [
                        seq.where(
                            seq.fn('LOWER', seq.col('article_classification')),
                            'LIKE',
                            `%${classificationValue}%`
                        ),
                        {
                            [Op.like]: `%${classificationValue}%`
                        }
                    ]
                }
            }
            
            // 如果已经有其他条件，使用 AND 组合
            if (Object.keys(whereClause).length > 0) {
                whereClause[Op.and] = [whereClause, classificationCondition]
            } else {
                whereClause = classificationCondition
            }
            
            console.log('添加分类筛选条件:', classificationValue)
        }
        
        // 打印最终查询条件
        const hasConditions = Object.keys(whereClause).length > 0
        console.log('最终查询条件:', hasConditions ? '有筛选' : '无（查询全部）')
        if (hasConditions) {
            console.log('whereClause:', JSON.stringify(whereClause).substring(0, 200))
        }
        
        // 执行查询
        const { count, rows } = await Articles.findAndCountAll({ 
            where: hasConditions ? whereClause : undefined,  // 无条件时查全部
            offset, 
            limit,
            order: [['id', 'DESC']]
        })
        
        console.log('✅ 查询结果 - 总数:', count, '| 当前页数据量:', rows.length)
        
        // 调试：如果筛选后无结果，显示数据库中的实际数据
        if (hasConditions && count === 0) {
            console.log('\n⚠️ 筛选后无结果，检查数据库实际数据...')
            
            const sampleData = await Articles.findAll({
                attributes: ['id', 'article_title', 'article_classification'],
                limit: 5,
                order: [['id', 'DESC']]
            })
            
            console.log('最近5篇文章:')
            sampleData.forEach(article => {
                console.log(`  ID:${article.id} | 分类:"${article.article_classification}" | 标题:"${article.article_title?.substring(0, 30)}"`)
            })
        }
        
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }
    }

    async findArticleCategory(category, pageNum, pageSize) {
        const offset = (pageNum - 1) * pageSize;
        const limit = +pageSize;
        const { count, rows } = await Articles.findAndCountAll({ where: { article_classification: category }, offset, limit })
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }
    }

    async keywords(key, pageNum, pageSize, article_classification = '') {
        const offset = (pageNum - 1) * pageSize;
        const limit = +pageSize;
        let count;
        let res;
        
        console.log('=== keywords 搜索接口 ===')
        console.log('搜索关键字:', key)
        console.log('分类筛选:', article_classification)
        
        // 构建基础查询条件（标题模糊匹配）
        let whereClause = {}
        if (key && key !== 'all') {
            whereClause.article_title = {
                [Op.like]: `%${key}%`
            }
        }
        
        // 如果有分类筛选，添加 AND 条件
        if (article_classification && article_classification.trim() !== '') {
            const classificationValue = article_classification.trim().toLowerCase()
            
            // 使用不区分大小写的匹配
            whereClause[Op.and] = [
                whereClause,
                {
                    article_classification: {
                        [Op.or]: [
                            seq.where(
                                seq.fn('LOWER', seq.col('article_classification')),
                                'LIKE',
                                `%${classificationValue}%`
                            ),
                            {
                                [Op.like]: `%${classificationValue}%`
                            }
                        ]
                    }
                }
            ]
            
            console.log('添加分类筛选条件:', classificationValue)
        }
        
        console.log('最终查询条件:', JSON.stringify(whereClause, null, 2))
        
        if (key == 'all') {
            // 查询全部（可带分类筛选）
            const queryOptions = {
                offset,
                limit,
                attributes: ['id', 'article_title', 'article_classification', 'article_author', 'createdAt'],
                order: [['id', 'DESC']]
            }
            
            // 如果有分类条件
            if (whereClause[Op.and] || Object.keys(whereClause).length > 0) {
                queryOptions.where = whereClause
            }
            
            const result = await Articles.findAndCountAll(queryOptions)
            count = result.count;
            res = result.rows;
        } else {
            // 关键字搜索（+ 分类筛选）
            count = await Articles.count({
                where: whereClause
            });
            
            res = await Articles.findAll({
                raw: true,
                order: [['id', 'DESC']],
                where: whereClause,
                offset,
                limit,
                attributes: ['id', 'article_title', 'article_content', 'article_classification', 'article_author', 'createdAt', 'article_img']
            }); 
        }
        
        console.log('搜索结果 - 总数:', count, '当前页数据量:', res.length)
        
        return { list: res, total: count, pageNum, pageSize } || null;
    }


       

    // async keyWordsAll(pageNum, pageSize) {
    //     const offset = (pageNum - 1) * pageSize;
    //     const limit = +pageSize;
    //     const res = await Articles.findAll({ offset, limit, attributes: ['id', 'article_title'] })
    //     console.log(res)
    //     // console.log(count)
    //     // console.log(rows)
    //     // return {
    //     //     pageNum,
    //     //     pageSize,
    //     //     total: count,
    //     //     list: rows
    //     // }
    // }
}

module.exports = new ArticleService();
const Dictionary = require('../model/dictionary.model');

class DictionaryService {
    async createDictionary(data) {
        const res = await Dictionary.create(data);
        return res.dataValues;
    }

    async updateDictionary(id, data) {
        const res = await Dictionary.update(data, { where: { id: id } });
        return res[0] > 0 ? true : false
    }

    async deleteDictionary(id) {
        const res = await Dictionary.destroy({ where: { id: id } });
        return res > 0 ? true : false
    }

    async findOneDictionary(id) {
        const res = await Dictionary.findOne({ where: { id: id } });
        return res?.dataValues;
    }

    async findByType(dictType) {
        const res = await Dictionary.findAll({
            where: {
                dict_type: dictType,
                status: 1
            },
            order: [['sort_order', 'ASC'], ['id', 'ASC']]
        });
        return res.map(item => item.dataValues);
    }

    async findAllTypes() {
        const res = await Dictionary.findAll({
            attributes: ['dict_type'],
            group: ['dict_type'],
            where: { status: 1 }
        });
        return res.map(item => item.dict_type);
    }

    async findDictionaryList(dictType, pageNum, pageSize) {
        const offset = (pageNum - 1) * pageSize;
        const limit = +pageSize;
        
        const whereClause = {};
        if (dictType && dictType !== 'all') {
            whereClause.dict_type = dictType;
        }
        
        const { count, rows } = await Dictionary.findAndCountAll({
            where: whereClause,
            offset,
            limit,
            order: [['sort_order', 'ASC'], ['id', 'ASC']]
        });
        
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows.map(item => item.dataValues)
        }
    }

    async checkKeyExists(dictType, dictKey, excludeId = null) {
        const whereClause = {
            dict_type: dictType,
            dict_key: dictKey
        };
        
        if (excludeId) {
            whereClause.id = { [require('sequelize').Op.ne]: excludeId };
        }
        
        const count = await Dictionary.count({ where: whereClause });
        return count > 0;
    }

    async initDefaultData() {
        const defaultCategories = [
            { dict_type: 'article_category', dict_key: 'frontend', dict_value: '前端开发', sort_order: 1 },
            { dict_type: 'article_category', dict_key: 'backend', dict_value: '后端开发', sort_order: 2 },
            { dict_type: 'article_category', dict_key: 'devops', dict_value: 'DevOps', sort_order: 3 },
            { dict_type: 'article_category', dict_key: 'architecture', dict_value: '架构设计', sort_order: 4 },
            { dict_type: 'article_category', dict_key: 'rust', dict_value: 'Rust', sort_order: 5 },
            { dict_type: 'article_category', dict_key: 'design', dict_value: '设计', sort_order: 6 },
            { dict_type: 'article_category', dict_key: 'other', dict_value: '其他', sort_order: 7 }
        ];

        for (const cat of defaultCategories) {
            const exists = await this.checkKeyExists(cat.dict_type, cat.dict_key);
            if (!exists) {
                await Dictionary.create(cat);
            }
        }
        
        return true;
    }
}

module.exports = new DictionaryService();
const Widget = require('../model/widget.model');

class WidgetService {
    /**
     * 新增一个组件
     * @param {object} data - 组件字段
     * @returns {Promise<object>} 新增后的记录
     */
    async createWidget(data) {
        const res = await Widget.create(data);
        return res.dataValues;
    }

    /**
     * 按 ID 修改组件
     * @param {number} id - 组件 ID
     * @param {object} data - 要改的字段
     * @returns {Promise<boolean>} 改到了返回 true
     */
    async updateWidget(id, data) {
        const res = await Widget.update(data, { where: { id: id } });
        return res[0] > 0 ? true : false
    }

    /**
     * 按 ID 删除组件（软删除）
     * @param {number} id - 组件 ID
     * @returns {Promise<boolean>} 删掉了返回 true
     */
    async deleteWidget(id) {
        const res = await Widget.destroy({ where: { id: id } });
        return res > 0 ? true : false
    }

    /**
     * 按 ID 查一个组件
     * @param {number} id - 组件 ID
     * @returns {Promise<object|null>} 组件数据
     */
    async findOneWidget(id) {
        const res = await Widget.findOne({ where: { id: id } });
        return res?.dataValues;
    }

    /**
     * 按 widget_key 查一个组件
     * 说明：只返回启用状态的组件。
     *       后台禁用掉的组件，前台详情页也该显示「没有找到」，
     *       不能因为知道标识就能看到内容。
     * @param {string} widgetKey - 组件标识
     * @returns {Promise<object|null>} 组件数据
     */
    async findOneByKey(widgetKey) {
        const res = await Widget.findOne({ where: { widget_key: widgetKey, status: 1 } });
        return res?.dataValues;
    }

    /**
     * 前台用的列表：只要启用状态的
     * @param {string} category - 分类，传空表示全部
     * @returns {Promise<object[]>} 组件数组
     */
    async findPublicList(category) {
        const whereClause = { status: 1 };
        if (category && category !== 'all') {
            whereClause.category = category;
        }
        const res = await Widget.findAll({
            where: whereClause,
            order: [['sort_order', 'ASC'], ['id', 'ASC']]
        });
        return res.map(item => item.dataValues);
    }

    /**
     * 后台���的分页列表
     * @param {string} category - 分类，传空表示全部
     * @param {number} pageNum - 页码
     * @param {number} pageSize - 每页条数
     * @returns {Promise<object>} 分页结果
     */
    async findWidgetList(category, pageNum, pageSize) {
        const offset = (pageNum - 1) * pageSize;
        const limit = +pageSize;

        const whereClause = {};
        if (category && category !== 'all') {
            whereClause.category = category;
        }

        const { count, rows } = await Widget.findAndCountAll({
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

    /**
     * 查所有在用的分类
     * @returns {Promise<string[]>} 分类名数组
     */
    async findAllCategories() {
        const res = await Widget.findAll({
            attributes: ['category'],
            group: ['category'],
            where: { status: 1 },
            order: [['category', 'ASC']]
        });
        return res.map(item => item.category);
    }

    /**
     * 查某个标识的组件是不是已经存在
     * @param {string} widgetKey - 组件标识
     * @param {number|null} excludeId - 排除的 ID，修改时传自己的 ID
     * @returns {Promise<boolean>} 存在返回 true
     */
    async checkKeyExists(widgetKey, excludeId = null) {
        const whereClause = { widget_key: widgetKey };
        if (excludeId) {
            whereClause.id = { [require('sequelize').Op.ne]: excludeId };
        }
        const count = await Widget.count({ where: whereClause });
        return count > 0;
    }
}

module.exports = new WidgetService();

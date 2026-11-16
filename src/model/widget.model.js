const { DataTypes } = require('sequelize');

const seq = require('../db/seq')

/**
 * 组件表
 * 说明：存的是博客「组件展示」页面的组件元信息和可复制的代码，
 *      前端用 widget_key 找到对应的渲染组件来显示预览。
 */
const Widget = seq.define('widgets', {
    widget_key:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'组件标识，前端用它匹配渲染组件'
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'组件标题，例如「按钮组 Buttons」'
    },
    desc:{
        type:DataTypes.STRING,
        allowNull:true,
        comment:'一句话描述'
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'visual',
        comment:'分类：basics 基础元素 / interactive 交互反馈 / data 数据展示 / visual 视觉效果'
    },
    code_html:{
        type:DataTypes.TEXT,
        allowNull:true,
        comment:'可复制的 HTML 代码'
    },
    code_css:{
        type:DataTypes.TEXT,
        allowNull:true,
        comment:'可复制的 CSS 代码'
    },
    code_js:{
        type:DataTypes.TEXT,
        allowNull:true,
        comment:'可复制的 JS 代码'
    },
    sort_order:{
        type:DataTypes.INTEGER,
        defaultValue:0,
        comment:'排序顺序'
    },
    status:{
        type:DataTypes.INTEGER,
        defaultValue:1,
        comment:'状态（1启用 0禁用）'
    },
    remark:{
        type:DataTypes.STRING,
        allowNull:true,
        comment:'备注'
    }
},{
    paranoid:true,
    indexes: [
        {
            unique: true,
            fields: ['widget_key']
        }
    ]
})

Widget.sync({alter:false})

module.exports = Widget

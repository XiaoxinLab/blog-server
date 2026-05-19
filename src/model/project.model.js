const { DataTypes } = require('sequelize');

const seq = require('../db/seq')

const Projects = seq.define('blog_projects', {
    project_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '项目名称'
    },
    project_desc: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '项目描述'
    },
    project_type: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '项目类型'
    },
    project_year: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '项目年份'
    },
    project_techs: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: '技术栈'
    },
    project_image: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '项目图片'
    },
    project_demo: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '演示地址'
    },
    project_github: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'GitHub 地址'
    },
    show_demo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: '是否显示演示按钮'
    },
    show_github: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: '是否显示 GitHub 按钮'
    },
    guest_account: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: '游客账号信息'
    }
}, {
    paranoid: true
})

Projects.sync({alter: false})

module.exports = Projects
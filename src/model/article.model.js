const {DataTypes} = require('sequelize');

const seq = require('../db/seq')

const Articles = seq.define('blog_articles', {
    article_title:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'文章标题'
    },
    article_author:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'文章作者'
    },
    article_classification:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'文章分类'
    },
    article_content:{
        type:DataTypes.TEXT,
        allowNull:true,
        comment:'文章内容'
    },
    article_img:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'文章图片'
    },
    article_file_url:{
        type:DataTypes.STRING,
        allowNull:true,
        comment:'文章 Markdown 文件地址'
    },
},{
    paranoid:true
})

Articles.sync({alter: true})

module.exports = Articles
const {DataTypes} = require('sequelize');

const seq = require('../db/seq')

const PageVisit = seq.define('page_visits', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        comment:'主键ID'
    },
    page_path:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'页面路径'
    },
    page_title:{
        type:DataTypes.STRING,
        allowNull:true,
        comment:'页面标题'
    },
    ip_address:{
        type:DataTypes.STRING,
        allowNull:true,
        comment:'访问IP'
    },
    user_agent:{
        type:DataTypes.TEXT,
        allowNull:true,
        comment:'用户代理'
    },
    referrer:{
        type:DataTypes.STRING,
        allowNull:true,
        comment:'来源页面'
    }
},{
    paranoid:true,
    indexes: [
        {
            fields: ['page_path']
        },
        {
            fields: ['createdAt']
        }
    ]
})
// PageVisit.sync({force:false}) 
module.exports = PageVisit

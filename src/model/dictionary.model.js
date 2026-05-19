const {DataTypes} = require('sequelize');

const seq = require('../db/seq')

const Dictionary = seq.define('dictionaries', {
    dict_type:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'字典类型'
    },
    dict_key:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'字典键'
    },
    dict_value:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'字典值'
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
            fields: ['dict_type', 'dict_key']
        }
    ]
})

Dictionary.sync({alter:false})

module.exports = Dictionary
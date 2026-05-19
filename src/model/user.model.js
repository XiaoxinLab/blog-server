const {DataTypes} = require('sequelize')

const seq = require('../db/seq') 

// 创建模型 (Model blog_user -> blog_users)
const User = seq.define('blog_user',{
    // id 会被sequelize自动创建，管理
    user_name:{
        type:DataTypes.STRING, // 类型
        allowNull:false, // 是否允许为空
        unique:true, // 是否唯一
        commit:"用户名"
    },
    user_phone:{
        type:DataTypes.CHAR(64),
        allowNull:false,
        comment:"手机号"
    },
    user_password:{
        type:DataTypes.CHAR(64),
        allowNull:false,
        comment:"密码"
    },
    is_admin:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:0,
        comment:'是否为管理员, 0:false; 1:true'
    },
    user_invitationCode:{
        type:DataTypes.CHAR(64),
        allowNull:true,
        comment:'邀请码',
    },
    is_guest:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:0,
        comment:'是否为游客账号, 0:false; 1:true'
    }
},
{
    // timestamps:false, // 是否出现时间
})

// 同步数据 存在即删除重新创建 force:true
User.sync({alter:false})



module.exports = User 
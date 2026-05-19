const { Sequelize } = require('sequelize');

const { MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_DB } = require('../config/config.default')
/**
 * 1.数据库名
 * 2.用户名
 * 3.密码
 * 4.{
 *      host:'地址',
 *      dialect:'类型'
 *  }
 */
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST,
    dialect: 'mysql',
    timezone: '+08:00',
    define: {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

seq.authenticate().then(() => {
    console.log('数据库连接成功')
}).catch((err) => {
    console.log('数据库连接失败', err)
})

module.exports = seq
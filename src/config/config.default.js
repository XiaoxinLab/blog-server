const dotenv = require('dotenv');
const path = require('path');

// 明确指定.env文件路径，指向admin目录下的.env文件
const envPath = path.resolve(__dirname, '../../.env');
console.log('尝试加载环境变量文件:', envPath);

// 加载环境变量文件
const result = dotenv.config({ path: envPath });

// 检查环境变量是否正确加载
if (result.error) {
  console.error('环境变量加载失败:', result.error);
  console.error('请确保.env文件存在于admin目录下');
}

console.log('APP_PORT:', process.env.APP_PORT);
console.log('数据库配置:', {
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_PORT: process.env.MYSQL_PORT,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_DB: process.env.MYSQL_DB
});

// 导出具体的环境变量，而不是整个process.env对象
module.exports = {
  APP_PORT: process.env.APP_PORT,
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_PORT: process.env.MYSQL_PORT,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PWD: process.env.MYSQL_PWD,
  MYSQL_DB: process.env.MYSQL_DB,
  JWT_SECRET: process.env.JWT_SECRET
};
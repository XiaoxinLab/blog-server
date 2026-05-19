const User = require('../model/user.model');
const bcrypt = require('bcryptjs');

class UserService {
    async createUser(user_name, user_password, user_phone) {
        // 插入数据
        const res = await User.create({ user_name, user_phone, user_password })
        return res.dataValues
    }
    
    async initGuestAccount() {
        const guestName = 'tourist';
        let guest = await User.findOne({
            where: { user_name: guestName },
            attributes: ['id', 'user_name']
        });

        if (!guest) {
            const hashedPassword = bcrypt.hashSync('tourist', bcrypt.genSaltSync(10));
            guest = await User.create({
                user_name: guestName,
                user_phone: `guest_${Date.now()}`,
                user_password: hashedPassword,
                is_admin: 0,
                is_guest: 1
            });
            console.log('游客账号创建成功:', guestName);
        }

        return guest;
    }
    async getUserInfo({ id, user_name, user_phone, user_password, is_admin }) {
        const whereOpt = {}
        // 当数据存在 拷贝到条件中
        id && Object.assign(whereOpt, { id })
        user_name && Object.assign(whereOpt, { user_name })
        user_phone && Object.assign(whereOpt, { user_phone })
        user_password && Object.assign(whereOpt, { user_password })
        is_admin && Object.assign(whereOpt, { is_admin })
        console.log('is',is_admin)
        // 查询条件
        const res = await User.findOne({
            attributes: ['id', 'user_name', 'user_phone', 'user_password', "is_admin", "is_guest"],
            where: whereOpt
        })
        return res ? res.dataValues : null
    }
    async updateById({ id, user_name, user_password, is_admin }) {
        const whereOpt = { id }
        const newUser = {}

        user_name && Object.assign(newUser, { user_name })
        user_password && Object.assign(newUser, { user_password })
        is_admin && Object.assign(newUser, { is_admin })

        const res = await User.update(newUser, { where: whereOpt })
        // console.log(res)
        return res[0] > 0 ? true : false
    }

    async findOneUserPhone(phone) {
        const { id, user_name, user_phone } = await User.findOne({ where: { user_phone: phone } });
        return {
            id, user_name, user_phone
        };
    }
}

module.exports = new UserService();
const Projects = require('../model/project.model');
const { Op } = require('sequelize');

class ProjectService {
    async createProject(project) {
        const res = await Projects.create(project);
        return res.dataValues;
    }

    async updateProject(id, project) {
        const res = await Projects.update(project, { where: { id: id } });
        return res[0] > 0 ? true : false;
    }

    async findOneProject(id) {
        const res = await Projects.findOne({ where: { id: id } });
        return res ? res.dataValues : null;
    }

    async removeProject(id) {
        const res = await Projects.destroy({ where: { id: id } });
        return res > 0 ? true : false;
    }

    async restoreProject(id) {
        const res = await Projects.restore({ where: { id: id } });
        return res > 0 ? true : false;
    }

    async findProject(pageNum, pageSize, search = '') {
        const offset = (pageNum - 1) * pageSize;
        const limit = +pageSize;

        const where = {};

        if (search && search.trim()) {
            const keyword = search.trim();
            where[Op.or] = [
                { project_name: { [Op.like]: `%${keyword}%` } },
                { project_desc: { [Op.like]: `%${keyword}%` } },
                { project_type: { [Op.like]: `%${keyword}%` } }
            ];
        }

        const { count, rows } = await Projects.findAndCountAll({
            where,
            offset,
            limit,
            order: [
                ['id', 'DESC']
            ]
        })
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }
    }
}

module.exports = new ProjectService();
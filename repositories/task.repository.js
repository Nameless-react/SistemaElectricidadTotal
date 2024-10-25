export default class TaskRepository {
    constructor(taskModel, sequelize) {
        this.taskModel = taskModel;
        this.sequelize = sequelize;
    }

    async saveTask(task) {
        const result = await this.taskModel.create(task);
        return result;
    }

    async deleteTask(idTasks) {
        return await this.taskModel.destroy({
            where: {
                idTasks
            }
        })
    }

    async getTaskById(id) {
        const result = await this.taskModel.findByPk(id);
        return result ? result.dataValues : null;
    }

    async getTasks() {
        return await this.taskModel.findAll();
    }

    async getTask(task) {
        return await this.taskModel.findOne({
            where: {
                ...task
            }
        });
    }

    async updateTask({ idTasks, ...newTaskData }) {
        const result = await this.taskModel.update(newTaskData, {
            where: {
                idTasks
            },
            returning: true,
            plain: true
        });

        return result[1];
    }
}
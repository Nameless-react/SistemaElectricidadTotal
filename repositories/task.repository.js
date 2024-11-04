export default class TaskRepository {
    constructor(taskModel, sequelize) {
        this.taskModel = taskModel;
        this.sequelize = sequelize;
    }

    async saveTask(task) {
        const result = await this.taskModel.create(task);
        return result;
    }

    async deleteTask(idTask) {
        return await this.taskModel.destroy({
            where: {
                idTask
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

    async updateTask({ idTask, ...newTaskData }) {
        const result = await this.taskModel.update(newTaskData, {
            where: {
                idTask
            },
            returning: true,
            plain: true
        });

        return result[1];
    }
}
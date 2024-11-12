export default class TaskRepository {
    constructor(taskModel, sequelize) {
        this.taskModel = taskModel;
        this.sequelize = sequelize;
    }

    async saveTask(task) {
        const result = await this.sequelize.query("CALL create_task_with_assignments(:p_title, :p_deadline, :p_description, :p_id_projects, :p_id_status, ARRAY[:p_assign_employees])", {
            replacements: {
                p_deadline: task.deadline,
                p_title: task.title,
                p_description: task.description,
                p_id_projects: task.idProjects,
                p_id_status: task.idStatus,
                p_assign_employees: task.employees
            },
            logging: console.log,
            type: this.sequelize.QueryTypes.RAW
        });
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

    async getTasksByProject(idProjects) {
        return await this.taskModel.findAll({
            where: {
                idProjects
            }
        });
    }

    async getTask(task) {
        return await this.taskModel.findOne({
            where: {
                ...task
            }
        });
    }

    async updateTask({ idTasks, ...newTaskData }) {
        const result = await this.sequelize.query("CALL update_task_with_assignments(:p_id_tasks, :p_title, :p_deadline, :p_description, :p_id_projects, :p_id_status, ARRAY[:p_assign_employees])", {
            replacements: {
                p_id_tasks: idTasks,
                p_title: newTaskData.title,
                p_deadline: newTaskData.deadline,
                p_description: newTaskData.description,
                p_id_projects: newTaskData.idProjects,
                p_id_status: newTaskData.idStatus,
                p_assign_employees: newTaskData.employees
            },
            logging: console.log,
            type: this.sequelize.QueryTypes.RAW
        });
        return result;
    }
}
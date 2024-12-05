export default class NotificationRepository {
    constructor(notificationModel, sequelize) {
        this.notificationModel = notificationModel;
        this.sequelize = sequelize;
    }

    async saveNotification(notification) {
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

    async deleteNotification(idNotification) {
        return await this.notificationModel.destroy({
            where: {
                idNotification
            }
        })
    }

    async getNotificationById(id) {
        const result = await this.notificationModel.findByPk(id);
        return result ? result.dataValues : null;
    }

    async getNotifications() {
        return await this.notificationModel.findAll();
    }

    async getNotificationsByUser(idUsers) {
        return await this.notificationModel.findAll({
            where: {
                idUsers
            }
        });
    }

    async markAsRead(idNotifications) {
        const result = await this.notificationModel.update({ isRead: true }, {
            where: {
                idNotifications
            },
            returning: true,
            plain: true
        });

        return result[1];
    }
}
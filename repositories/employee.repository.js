export default class EmployeeRepository {
    constructor(employeeModel, userModel, sequelize) {
        this.employeeModel = employeeModel;
        this.userModel = userModel;
        this.sequelize = sequelize;
    }

    async saveEmployee(employee) {
        const result = await this.sequelize.query("CALL save_employee(:p_id_user_author, :p_message, :p_id_conversation)", {
            replacements: {
                p_id_user_author: message.idUserAuthor,
                p_message: message.message,
                p_id_conversation: message.idConversation
            },
            logging: console.log,
            type: this.sequelize.QueryTypes.RAW
        })

        return result;
    }

    async deleteEmployee(id) {
        return await this.employeeModel.destroy({
            where: {
                idMessage: id
            }
        })
    }

    async getEmployees() {
        const result = await this.employeeModel.findAll({
            include: [
                {
                    model: this.userModel,
                    attributes: ["name", "image", "email"]
                },
            ],
        });

        const employees = result.map(employee => {
            const { User, idEmployees, ...filterEmployee } = employee.get({ plain: true });
            return {
                ...filterEmployee,
                image: User.image,
                email: User.email,
                name: User.name,
                idEmployee: idEmployees
            }
        })
        return employees;
    
    }
}
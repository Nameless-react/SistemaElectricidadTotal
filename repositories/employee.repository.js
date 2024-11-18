export default class EmployeeRepository {
    constructor(employeeModel, userModel, sequelize) {
        this.employeeModel = employeeModel;
        this.userModel = userModel;
        this.sequelize = sequelize;
    }

    async createEmployee(formData) {
        try {
            const result = await this.sequelize.query(
                "CALL create_employee_withId(:p_id_users, :p_job, :p_join_at);",
                {
                    replacements: {
                        p_id_users: formData.userId,
                        p_job: formData.job,
                        p_join_at: formData.joinAt,
                    },
                    logging: console.log,
                    type: this.sequelize.QueryTypes.RAW,
                }
            );
            return result;
        } catch (error) {
            console.error("Error al crear empleado:", error);
            throw new Error("Error al crear empleado.");
        }
    }

    async getEmployeeById(idEmployees) {
        return await this.employeeModel.findOne({
            where: {
                idEmployees
            }
        })
    }


    async deleteEmployee(idEmployees) {
        return await this.employeeModel.destroy({
            where: {
                idEmployees
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

    async updateEmployee(formData) {
        try {
            const result = await this.sequelize.query("CALL update_employee_job_withId(:p_id_users, :p_job);",
                {
                    replacements: {
                        p_id_users: formData.userId,
                        p_job: formData.job,
                    },
                    logging: console.log, type: this.sequelize.QueryTypes.RAW,
                }); return result;
        } catch (error) {
            console.error("Error al actualizar el trabajo del empleado:", error);
            throw new Error("Error al actualizar el trabajo del empleado.");
        }
    }
}
export default class EmployeeRepository {
    constructor(employeeModel, userModel, sequelize) {
        this.employeeModel = employeeModel;
        this.userModel = userModel;
        this.sequelize = sequelize;
    }

    async createEmployee(employee) {
        const result = await this.sequelize.query("CALL create_employee_withEmail(:p_email, :p_job);", {
            replacements: {
                p_email: employee.email,
                p_job: employee.job
            },
            logging: console.log,
            type: this.sequelize.QueryTypes.RAW
        })
        return result ;
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

    async updateEmployee({idEmployees, ...newEmployeesData}){
        const result = await  this.employeeModel.update(newEmployeesData,{
            where: {
                idEmployees
            },
            returning: true,
            plain: true
        });

        return result;
    }
}
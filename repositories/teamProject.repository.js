export default class TeamProjectRepository {
    constructor(teamProjectModel, teamProjectEmployeeModel, sequelize) {
        this.teamProjectModel = teamProjectModel;
        this.teamProjectEmployeeModel = teamProjectEmployeeModel;
        this.sequelize = sequelize;
    }

    async addEmployee(teamProjectEmployees) {
        const result = await this.sequelize.query("CALL add_employees_team(:p_id_team_project, ARRAY[:p_employees])", {
            replacements: {
                p_id_team_project: teamProjectEmployees.idTeamProject,
                p_employees: teamProjectEmployees.employees
            },
            logging: console.log,
            type: this.sequelize.QueryTypes.RAW
        })

        return result;
    }

    async deleteEmployee(idTeamProjectEmployee) {
        return await this.teamProjectEmployeeModel.destroy({
            where: {
                idTeamProjectEmployee
            }
        })
    }

    async getTeamByProject(idProject) {
        return await this.sequelize.query("Select *from Users_By_Project_View where projectId = :p_id_project", {
            replacements: {
                p_id_project: idProject
            },
            type: this.sequelize.QueryTypes.SELECT
        });
    }

    // * In case of separate the query of getProject
    async getTeamProjectEmployees() {
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
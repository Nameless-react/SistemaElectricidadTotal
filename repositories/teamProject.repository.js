export default class TeamProjectRepository {
    constructor(teamProjectModel, teamProjectEmployeeModel, sequelize) {
        this.teamProjectModel = teamProjectModel;
        this.teamProjectEmployeeModel = teamProjectEmployeeModel;
        this.sequelize = sequelize;
    }


    async getTeams() {
        return await this.teamProjectModel.findAll();
    }

    async saveTeam(team) {
        const result = await this.sequelize.query("CALL save_team(:p_name, :p_employees)", {
            replacements: {
                p_name: team.name,
                p_employees: team.employees && team.employees.length > 0 ? team.employees : null
            },
            logging: console.log,
            type: this.sequelize.QueryTypes.RAW
        })

        return result;
    }

    async changeEmployees(teamProjectEmployees) {
        const result = await this.sequelize.query("CALL update_team_project(:p_id_team_project, NULL, ARRAY[:p_employees])", {
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
        const result = await this.sequelize.query("CALL delete_employee_from_team_project(:p_id_team_project_employee)", {
            replacements: {
                p_id_team_project_employee: idTeamProjectEmployee,
            },
            logging: console.log,
            type: this.sequelize.QueryTypes.RAW
        })

        return result;
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
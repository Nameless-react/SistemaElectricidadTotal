import { validateTeamProject, validatePartialTeamProject, validateIdTeamProjectEmployee } from "/functions/validations/teamProjectValidations";
import { ValidationFailureError, DeletionError } from "/errors/errors";


export default class TeamProjectService {
    constructor(teamProjectRepository) {
        this.teamProjectRepository = teamProjectRepository;
    }


    async getTeams() {
        return await this.teamProjectRepository.getTeams();
    }

    async saveTeam(team) {
        const validatedTeamProject = validateTeamProject(team);
        if (validatedTeamProject.error) throw new ValidationFailureError(validatedTeamProject.error.message);
        console.log(validatedTeamProject.data)
        return await this.teamProjectRepository.saveTeam({ ...validatedTeamProject.data, employees: [...validatedTeamProject.data.employees] });
    }
    
    async deleteEmployee(idTeamProjectEmployee) {
        const validatedTeamProjectEmployee = validateIdTeamProjectEmployee({ idTeamProjectEmployee });
        if (validatedTeamProjectEmployee.error) throw new ValidationFailureError(validatedTeamProjectEmployee.error);

        const deleted = await this.teamProjectRepository.deleteEmployee(validatedTeamProjectEmployee.data.idTeamProjectEmployee);
        if (!deleted) throw new DeletionError("No se pudo eliminar el empleado del equipo");
    }

    async changeEmployees(teamProjectEmployees) {
        const validatedTeamProjectEmployee = validatePartialTeamProject(teamProjectEmployees);
        if (validatedTeamProjectEmployee.error) throw new ValidationFailureError(validatedTeamProjectEmployee.error);
      
        await this.teamProjectRepository.changeEmployees({ ...validatedTeamProjectEmployee.data, employees: [...validatedTeamProjectEmployee.data.employees] });
    }
}
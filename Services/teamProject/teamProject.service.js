import { validateTeamProject, validatePartialTeamProject, validateIdTeamProjectEmployee } from "/functions/validations/teamProjectValidations";
import { ValidationFailureError, DeletionError } from "/errors/errors";


export default class TeamProjectService {
    constructor(teamProjectRepository) {
        this.teamProjectRepository = teamProjectRepository;
    }

    async saveTeam(task) {
        const validatedTask = validateTeamProject(task);
        if (validatedTask.error) throw new ValidationFailureError(validatedTask.error.message);

        return await this.teamProjectRepository.saveTask(validatedTask.data);
    }
    
    async deleteEmployee(idTeamProjectEmployee) {
        const validatedTeamProjectEmployee = validateIdTeamProjectEmployee({ idTeamProjectEmployee });
        if (validatedTeamProjectEmployee.error) throw new ValidationFailureError(validatedTeamProjectEmployee.error);

        const deleted = await this.teamProjectRepository.deleteEmployee(validatedTeamProjectEmployee.data.idTeamProjectEmployee);
        if (!deleted) throw new DeletionError("No se pudo eliminar el empleado del equipo");
    }

    async addEmployee(teamProjectEmployees) {
        const validatedTeamProjectEmployee = validatePartialTeamProject(teamProjectEmployees);
        if (validatedTeamProjectEmployee.error) throw new ValidationFailureError(validatedTeamProjectEmployee.error);
      
        await this.teamProjectRepository.addEmployee({ ...validatedTeamProjectEmployee.data, employees: [...validatedTeamProjectEmployee.data.employees] });
    }
}
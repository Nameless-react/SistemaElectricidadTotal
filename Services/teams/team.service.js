import { validateTeamProject, validatePartialTeamProject } from "/functions/validations/taskValidation";
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

    async getTeamByProject(id) {
        return await this.teamProjectRepository.getTeamByProject(id);
    }
    
    async deleteEmployee(id) {
        const validatedTask = validateIdTask({ idTasks: id });
        if (validatedTask.error) throw new ValidationFailureError(validatedTask.error);

        const deleted = await this.teamProjectRepository.deleteEmployee(validatedTask.data.idEmployee);
        if (!deleted) throw new DeletionError("No se pudo eliminar el empleado del equipo");
    }

    async addEmployee(teamProjectEmployees) {
        const validatedTask = validatePartialTeamProject(teamProjectEmployees);
        if (validatedTask.error) throw new ValidationFailureError(validatedTask.error);
      
        const added = await this.teamProjectRepository.addEmployee();
        
    }
}
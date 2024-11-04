import { validateTask, validatePartialTask, validateIdTask, validateIdProjects } from "/functions/validations/taskValidation";
import { ValidationFailureError, NotFoundError, DeletionError } from "/errors/errors";


export default class TeamProjectService {
    constructor(teamProjectRepository) {
        this.teamProjectRepository = teamProjectRepository;
    }

    async saveTask(task) {
        const validatedTask = validateTask(task);
        if (validatedTask.error) throw new ValidationFailureError(validatedTask.error.message);

        return await this.teamProjectRepository.saveTask(validatedTask.data);
    }
    
    async getEmployees() {
        return await this.teamProjectRepository.getEmployees();
    }

    async deleteTeamProjectEmployee(id) {
        const validatedTask = validateIdTask({ idTasks: id });
        if (validatedTask.error) throw new ValidationFailureError(validatedTask.error);

        const deleted = await this.teamProjectRepository.deleteTask(validatedTask.data.idTasks);
        if (!deleted) throw new DeletionError("No se pudo eliminar la tarea");
    }
}
import { validateTask, validatePartialTask, validateIdTask, validateIdProjects } from "/functions/validations/taskValidation";
import { ValidationFailureError, NotFoundError, DeletionError } from "/errors/errors";


export default class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    async saveTask(task) {
        const validatedTask = validateTask(task);
        if (validatedTask.error) throw new ValidationFailureError(validatedTask.error.message);

        return await this.employeeRepository.saveTask(validatedTask.data);
    }
    
    async getTasksByProject({ idProjects }) {
        const validIdProjects = validateIdProjects({ idProjects })
        if (validIdProjects.error) throw new ValidationFailureError(validIdProjects.error);

        return await this.employeeRepository.getTasksByProject(validIdProjects.data.idProjects);
    }


    async getEmployees() {
        return await this.employeeRepository.getEmployees();
    }

    async deleteTask(id) {
        const validatedTask = validateIdTask({ idTasks: id });
        if (validatedTask.error) throw new ValidationFailureError(validatedTask.error);

        const deleted = await this.employeeRepository.deleteTask(validatedTask.data.idTasks);
        if (!deleted) throw new DeletionError("No se pudo eliminar la tarea");
    }

    async updateTask(task) {
        const validatedTask = validatePartialTask(task);
        if (validatedTask.error) throw new ValidationFailureError(validatedTask.error.message);

        await this.getTaskById(validatedTask.data.idTasks);
        return await this.employeeRepository.updateTask(validatedTask.data);
    }
}
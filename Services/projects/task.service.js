import { validateTask, validatePartialTask, validateIdTask } from "/functions/validations/taskValidation";
import { ValidationFailureError, NotFoundError, DeletionError } from "/errors/errors";


export default class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async saveTask(task) {
        const validatedTask = validateTask(task);
        if (validatedTask.error) throw new ValidationFailureError(validatedTask.error.message);

        return await this.taskRepository.saveTask(validatedTask.data);
    }

    async getTaskById(id) {
        const validIdTask = validateIdTask({ idTasks: id });
        if (validIdTask.error) throw new ValidationFailureError(validIdTask.error);


        const task = await this.taskRepository.getTaskById(validIdTask.data.idTasks);
        if (!task) throw new NotFoundError("La tarea no fue encontrada")
        return task;
    }

    async getTask(taskFields) {
        const task = await this.taskRepository.getTask(taskFields);
        if (!task) throw new NotFoundError(`La tarea no fue encontrada`)
        return task;
    }

    async getTasks() {
        return await this.taskRepository.getTasks();
    }

    async deleteTask(id) {
        const validatedTask = validateIdTask({ idTasks: id });
        if (validatedTask.error) throw new ValidationFailureError(validatedTask.error);

        const deleted = await this.taskRepository.deleteTask(validatedTask.data.idTasks);
        if (!deleted) throw new DeletionError("No se pudo eliminar la tarea");
    }

    async updateTask(task) {
        const validatedTask = validatePartialTask(task);
        if (validatedTask.error) throw new ValidationFailureError(validatedTask.error.message);

        await this.getTaskById(validatedTask.data.idTasks);
        return await this.taskRepository.updateTask(validatedTask.data);
    }
}
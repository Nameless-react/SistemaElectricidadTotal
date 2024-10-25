import { NextResponse } from "next/server";
import sequelize from "/config/databaseConnection";
import apiErrorWrapper from "/errors/apiErrorWrapper";
import TaskService from "/services/projects/task.service";
import { Task } from "/models/index";
import { TaskRepository } from "/repositories/index";


const taskRepository = new TaskRepository(Task, sequelize);
const taskService = new TaskService(taskRepository);


class TaskController {
    constructor(taskService) {
        this.taskService = taskService
    }

    getTask = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        const task = await this.taskService.getTaskById(parseInt(id));
        return NextResponse.json(task, { status: 200 });
    })
    
    getTasks = apiErrorWrapper(async (req, res) => {
        const tasks = await this.taskService.getTasks();
        return NextResponse.json(tasks, { status: 200 });
    })
    
    getTasksByProject = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        const tasksByProject = await this.taskService.getTasksByProject({ idProjects: id });
        return NextResponse.json(tasksByProject, { status: 200 });
    })

    saveTask = apiErrorWrapper(async (req, res) => {
        const parseBody = await req.json();
        await this.taskService.saveTask(parseBody);
        return NextResponse.json({ message: "Tarea guardada con éxito" }, { status: 201 });
    })

    deleteTask = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        await this.taskService.deleteTask(parseInt(id));
        return NextResponse.json({ message: "La tarea se eliminó con éxito" }, { status: 200 });
    })

    updateTask = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        const parseBody = await req.json();

        const updatedTask = await this.taskService.updateTask({ 
            idTasks: parseInt(id),
            ...parseBody    
        });

        return NextResponse.json(updatedTask, { status: 200 })
    })
}

export default new TaskController(taskService);
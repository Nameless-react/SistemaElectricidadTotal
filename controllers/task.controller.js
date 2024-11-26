import { NextResponse } from "next/server";
import apiErrorWrapper from "/errors/apiErrorWrapper";
import IoCContainer from "/functions/others/IoCContainer"


const taskService = await IoCContainer.get('TaskService');
class TaskController {
    constructor(taskService) {
        this.taskService = taskService
    }

    getTask = apiErrorWrapper(async (req, params) => {
        const { id } = await params.params;
        const task = await this.taskService.getTaskById(parseInt(id));
        return NextResponse.json(task, { status: 200 });
    })
    
    getTasks = apiErrorWrapper(async (req, res) => {
        const tasks = await this.taskService.getTasks();
        return NextResponse.json(tasks, { status: 200 });
    })
    
    getTasksByProject = apiErrorWrapper(async (req, params) => {
        const { id } = await params.params;
        const tasksByProject = await this.taskService.getTasksByProject({ idProjects: id });
        return NextResponse.json(tasksByProject, { status: 200 });
    })

    saveTask = apiErrorWrapper(async (req, res) => {
        const parseBody = await req.json();
        
        await this.taskService.saveTask({ ...parseBody, employees: new Set(parseBody.employees) });
        return NextResponse.json({ message: "Tarea guardada con éxito" }, { status: 201 });
    })

    deleteTask = apiErrorWrapper(async (req, params) => {
        const { id } = await params.params;
        await this.taskService.deleteTask(parseInt(id));
        return NextResponse.json({ message: "La tarea se eliminó con éxito" }, { status: 200 });
    })

    updateTask = apiErrorWrapper(async (req, params) => {
        const { id } = await params.params;
        const parseBody = await req.json();

        const updatedTask = await this.taskService.updateTask({ 
            ...parseBody,
            idTasks: parseInt(id),
            employees: new Set(parseBody.employees)
        });

        return NextResponse.json(updatedTask, { status: 200 })
    })
}

export default new TaskController(taskService);
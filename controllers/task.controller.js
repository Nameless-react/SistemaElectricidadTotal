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

    getAppointment = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        const appointment = await this.taskService.getAppointmentById(parseInt(id));
        return NextResponse.json(appointment, { status: 200 })
    })

    getAppointments = apiErrorWrapper(async (req, res) => {
        const appointments = await this.taskService.getAppointments();
        return NextResponse.json(appointments, { status: 200 })
    })

    saveAppointment = apiErrorWrapper(async (req, res) => {
        const parseBody = await req.json();
        await this.taskService.saveAppointment(parseBody);
        return NextResponse.json({ message: "Su cita ha sido agendada con éxito. Por favor, revise su correo electrónico para confirmar la cita." }, { status: 201 });
    })

    cancelAppointment = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        await this.taskService.cancelAppointment(parseInt(id));
        return NextResponse.json({ message: "la cita ha sido cancelada exitosamente" }, { status: 200 });
    })
    updateTask = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        const parseBody = await req.json();

        const updatedAppointment = await this.taskService.updateAppointment({ 
            idTask: parseInt(id),
            ...parseBody    
        });

        return NextResponse.json(updatedAppointment, { status: 200 })
    })
}

export default new TaskController(taskService);
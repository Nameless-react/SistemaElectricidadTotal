import { NextResponse } from "next/server";
import apiErrorWrapper from "/errors/apiErrorWrapper";
import IoCContainer from "/functions/others/IoCContainer"


const notificationService = await IoCContainer.get('NotificationService');
class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService
    }

    getTask = apiErrorWrapper(async (req, params) => {
        const { id } = await params.params;
        const task = await this.notificationService.getTaskById(parseInt(id));
        return NextResponse.json(task, { status: 200 });
    })
    
    getTasks = apiErrorWrapper(async (req, res) => {
        const tasks = await this.notificationService.getTasks();
        return NextResponse.json(tasks, { status: 200 });
    })
    
    getNotificationsByUser = apiErrorWrapper(async (req, params) => {
        const { id } = await params.params;
        const notificationsByUser = await this.notificationService.getNotificationsByUser(parseInt(id));
        return NextResponse.json(notificationsByUser, { status: 200 });
    })

    saveTask = apiErrorWrapper(async (req, res) => {
        const parseBody = await req.json();
        
        await this.notificationService.saveTask({ ...parseBody, employees: new Set(parseBody.employees) });
        return NextResponse.json({ message: "Tarea guardada con éxito" }, { status: 201 });
    })

    deleteTask = apiErrorWrapper(async (req, params) => {
        const { id } = await params.params;
        await this.notificationService.deleteTask(parseInt(id));
        return NextResponse.json({ message: "La tarea se eliminó con éxito" }, { status: 200 });
    })

    markAsRead = apiErrorWrapper(async (req, params) => {
        const { id } = await params.params;
        await this.notificationService.markAsRead({ idNotifications: parseInt(id) });

        return NextResponse.json({ message: "Notificación vista" }, { status: 200 })
    })
}

export default new NotificationController(notificationService);
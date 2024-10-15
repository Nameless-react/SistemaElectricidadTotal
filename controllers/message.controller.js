import apiErrorWrapper from "/errors/apiErrorWrapper";
import { NextResponse } from "next/server";
import { MessageRepository } from "../repositories/message.repository";
import sequelize from "/config/databaseConnection";
import MessageService from "/services/message.service"
import MessageModel from "/models/message.model"


const messageRepository = new MessageRepository(MessageModel, sequelize);
const messageService = new MessageService(messageRepository);

class MessageController {
    constructor(messageService) {
        this.messageService = messageService
    }

    getMessage = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        const message = await this.messageService.getAppointmentById(parseInt(id));
        return NextResponse.json(appointment, { status: 200 })
    })

    getMessages = apiErrorWrapper(async (req, res) => {
        const messages = await this.messageService.getAppointments();
        return NextResponse.json(appointments, { status: 200 })
    })

    saveMessage = apiErrorWrapper(async (req, res) => {
        const parseBody = await req.json();
        await this.messageService.saveMessage(parseBody);
        return NextResponse.json({ message: "Su cita ha sido agendada con éxito. Por favor, revise su correo electrónico para confirmar la cita." }, { status: 201 });
    })

    deleteMessage = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        await this.messageService.deleteMessage(id);
        return NextResponse.json({ message: "la cita ha sido cancelada exitosamente" }, { status: 200 });
    })
}

export default new MessageController(messageService);
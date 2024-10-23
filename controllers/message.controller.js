import apiErrorWrapper from "/errors/apiErrorWrapper";
import { NextResponse } from "next/server";
import MessageRepository  from "/repositories/message.repository";
import sequelize from "/config/databaseConnection";
import MessageService from "/services/chat/message.service";
import { Message, User } from "/models";
import { getPusherInstance } from "/functions/others/pusher/pusherServer";

const pusherServer = getPusherInstance();
const messageRepository = new MessageRepository(Message, User, sequelize);
const messageService = new MessageService(messageRepository, pusherServer);

class MessageController {
    constructor(messageService) {
        this.messageService = messageService
    }

    getMessagesByConversationId = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        const messages = await this.messageService.getMessagesByConversationId(parseInt(id));
        return NextResponse.json(messages, { status: 200 })
    })

    saveMessage = apiErrorWrapper(async (req, res) => {
        const parseBody = await req.json();
        await this.messageService.saveMessage(parseBody);
        return NextResponse.json({ message: "Se creó correctamente el mensaje" }, { status: 201 });
    })

    deleteMessage = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        await this.messageService.deleteMessage(parseInt(id));
        return NextResponse.json({ message: "Mensaje eliminado" }, { status: 200 });
    })
}

export default new MessageController(messageService);
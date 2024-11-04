import ConversationService from "/services/chat/conversation.service";
import { ConversationRepository } from "../repositories";
import apiErrorWrapper from "/errors/apiErrorWrapper";
import { NextResponse } from "next/server";
import { ConversationParticipants, Conversation  } from "/models";
import sequelize from "/config/databaseConnection";

const conversationRepository = new ConversationRepository(Conversation, ConversationParticipants, sequelize)
const conversationService = new ConversationService(conversationRepository)


// *Modificar las rutas de la función que trae todas las conversaciones en las que está el usuario
class ConversationController {
    constructor(conversationService) {
        this.conversationService = conversationService
    }

    getConversation = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        const conversations = await this.conversationService.getConversation(parseInt(id));
        return NextResponse.json(conversations, { status: 200 })
    })
    
    getConversationsByUserId = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        const conversations = await this.conversationService.getConversationsByUserId(parseInt(id));
        return NextResponse.json(conversations, { status: 200 })
    })

    createConversation = apiErrorWrapper(async (req, res) => {
        const parseBody = await req.json();
        await this.conversationService.saveMessage(parseBody);
        return NextResponse.json({ message: "Su cita ha sido agendada con éxito. Por favor, revise su correo electrónico para confirmar la cita." }, { status: 201 });
    })

    deleteConversation = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        await this.conversationService.deleteMessage(id);
        return NextResponse.json({ message: "la cita ha sido cancelada exitosamente" }, { status: 200 });
    })
}

export default new ConversationController(conversationService);
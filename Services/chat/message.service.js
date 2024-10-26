import { validateIdMessage, validateMessage, validateIdConversation } from "/functions/validations/messageValidation";
import { ValidationFailureError, NotFoundError, DeletionError } from "/errors/errors";

export default class MessageService {
    constructor(messageRepository, pusherServer) {
        this.messageRepository = messageRepository;
        this.pusherServer = pusherServer;
    }

    async saveMessage(newMessage) {
        const validatedMessage = validateMessage(newMessage);
        if (validatedMessage.error) throw new ValidationFailureError(validatedMessage.error.message);

        const { message, idUser, idConversation, email, name, image } = validatedMessage.data;
        await this.messageRepository.saveMessage(validatedMessage.data);


        await this.pusherServer.trigger(
            idConversation.toString(),
            "message::new",
            {
                message,
                idUser: idUser,
                date: new Date(),
                User: {
                    email,
                    name,
                    image
                }
            }
        )
    }

    async getMessagesByConversationId(idConversation) {
        const validConversationId = validateIdConversation({ idConversation });
        if (validConversationId.error) throw new ValidationFailureError(validConversationId.error);

        const messages = await this.messageRepository.getMessagesByConversation(validConversationId.data.idConversation);
        if (!messages) throw new NotFoundError(`El chat no tiene mensajes`)
        return messages;
    }

    async deleteMessage(id) {
        const validIdMessage = validateIdMessage({ idMessage: id });
        if (validIdMessage.error) throw new ValidationFailureError(validIdMessage.error);

        const deleted = await this.messageRepository.cancelAppointment(validIdMessage.data.idMessages);
        if (!deleted) throw new DeletionError("No se pudo eliminar la cita");
    }
}
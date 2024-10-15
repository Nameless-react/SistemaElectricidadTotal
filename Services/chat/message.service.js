import { validateIdMessage, validateMessage, validateIdConversation } from "/functions/validations/messageValidation";

export default class MessageService {
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }

    async saveMessage(message) {
        const validatedMessage = validateMessage(message);
        if (validatedMessage.error) throw new ValidationFailureError(validatedMessage.error.message);
        return await this.messageRepository.saveMessage(validatedMessage.data);
    }

    async getMessageById(id) {
        const validIdMessage = validateIdMessage({ idMessage: id });
        if (validIdMessage.error) throw new ValidationFailureError(validIdMessage.error);


        const message = await this.messageRepository.getMessageById(validIdMessage.data.idMessages);
        if (!message) throw new NotFoundError("El mensaje no fue encontrado")
        return message;
    }

    async getMessagesByConversationId(message) {
        const validConversationId = validateIdConversation({ idConversation: message.idConversation });
        if (validConversationId.error) throw new ValidationFailureError(validConversationId.error);

        const message = await this.messageRepository.getMessagesByConversation(validConversationId.data.idConversation);
        if (!message) throw new NotFoundError(`El mensaje no fue encontrado`)
        return message;
    }

    async deleteMessage(id) {
        const validIdMessage = validateIdMessage({ idMessage: id });
        if (validIdMessage.error) throw new ValidationFailureError(validIdMessage.error);

        const deleted = await this.messageRepository.cancelAppointment(validIdMessage.data.idMessages);
        if (!deleted) throw new DeletionError("No se pudo eliminar la cita");
    }
}
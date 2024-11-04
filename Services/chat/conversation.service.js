import { validateIdConversation, validateConversation } from "/functions/validations/conversationValidations";
import { ValidationFailureError, NotFoundError, DeletionError } from "/errors/errors";

export default class ConversationService {
    constructor(conversationRepository) {
        this.conversationRepository = conversationRepository;
    }

    async createConversation(conversation) {
        const validatedConversation = validateConversation(conversation);
        if (validatedConversation.error) throw new ValidationFailureError(validatedConversation.error.message);

        return await this.conversationRepository.saveMessage(validatedMessage.data);
    }

    async getConversationsByUserId(idConversation) {
        const validConversationId = validateIdConversation({ idConversation });
        if (validConversationId.error) throw new ValidationFailureError(validConversationId.error);

        const conversations = await this.conversationRepository.getConversationsByUserId(validConversationId.data.idConversation);
        if (!conversations) throw new NotFoundError(`No se encontraron conversaciones`)
        return conversations;
    }

    async deleteConversation(id) {
        const validIdMessage = validateIdConversation({ idMessage: id });
        if (validIdMessage.error) throw new ValidationFailureError(validIdMessage.error);

        const deleted = await this.conversationRepository.cancelAppointment(validIdMessage.data.idMessages);
        if (!deleted) throw new DeletionError("No se pudo eliminar la cita");
    }
}
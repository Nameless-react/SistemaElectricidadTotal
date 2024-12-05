import { ValidationFailureError, NotFoundError, DeletionError } from "/errors/errors";
import { validateIdUser, validateIdNotification } from "/functions/validations/notificationValidation";

export default class NotificationService {
    constructor(notificationRepository, pusherServer) {
        this.notificationRepository = notificationRepository;
        this.pusherServer = pusherServer;
    }

    async saveMessage(newMessage) {
        const validatedMessage = validateMessage(newMessage);
        if (validatedMessage.error) throw new ValidationFailureError(validatedMessage.error.message);

        const { message, idUser, idUsers, email, name, image } = validatedMessage.data;
        await this.notificationRepository.saveMessage(validatedMessage.data);

        await this.pusherServer.trigger(
            idUsers.toString(),
            "notification",
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

    async getNotificationsByUser(idUsers) {
        const validIdUser = validateIdUser({ idUsers });
        if (validIdUser.error) throw new ValidationFailureError(validIdUser.error);

        const notifications = await this.notificationRepository.getNotificationsByUser(validIdUser.data.idUsers);
        if (!notifications) throw new NotFoundError(`El usuario no tiene notificaciones`)
        return notifications;
    }

    async deleteMessage(id) {
        const validIdMessage = validateIdMessage({ idMessage: id });
        if (validIdMessage.error) throw new ValidationFailureError(validIdMessage.error);

        const deleted = await this.notificationRepository.cancelAppointment(validIdMessage.data.idMessages);
        if (!deleted) throw new DeletionError("No se pudo eliminar la cita");
    }

    async markAsRead({ idNotifications }) {
        const validIdNotification = validateIdNotification({ idNotifications });
        if (validIdNotification.error) throw new ValidationFailureError(validIdNotification.error);

        await this.notificationRepository.markAsRead(validIdNotification.data.idNotifications);
    }
}
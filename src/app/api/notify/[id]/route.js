
import notificationController from "/controllers/notification.controller";

export const PATCH = (req, params) => notificationController.markAsRead(req, params);
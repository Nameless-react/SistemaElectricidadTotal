import notificationController from "/controllers/notification.controller";

export const GET = (req, params) => notificationController.getNotificationsByUser(req, params);
import notificationController from "/controllers/notification.controller";

export const POST = (req, res) => notificationController.saveNotification(req, res);
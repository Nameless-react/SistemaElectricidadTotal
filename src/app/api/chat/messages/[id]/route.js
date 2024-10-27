import messageController from "/controllers/message.controller";

// export const PATCH = (req, params) => messageController.updateAppointment(req, params);
export const GET = (req, params) => messageController.getMessagesByConversationId(req, params);
// export const DELETE = (req, params) => messageController.cancelAppointment(req, params);
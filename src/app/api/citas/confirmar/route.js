import appointmentController from "/controllers/appointment.controller";

export const GET = (req, params) => appointmentController.appointmentConfirmation(req, params);
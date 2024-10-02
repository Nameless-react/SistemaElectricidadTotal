import appointmentController from "/controllers/appointment.controller";

export const PATCH = (req, params) => appointmentController.updateAppointment(req, params);
export const GET = (req, params) => appointmentController.getAppointment(req, params);
export const DELETE = (req, params) => appointmentController.cancelAppointment(req, params);
import appointmentController from "/controllers/appointment.controller";

export const GET = (req, res) => appointmentController.getAppointments(req, res);
export const POST = (req, res) => appointmentController.saveAppointment(req, res);
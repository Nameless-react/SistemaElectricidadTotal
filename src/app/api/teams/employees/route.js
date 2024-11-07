import teamController from "/controllers/team.controller";

export const POST = (req, params) => teamController.addEmployee(req, params);
// export const GET = (req, params) => teamController.getTask(req, params);
export const DELETE = (req, params) => teamController.deleteEmploye(req, params);

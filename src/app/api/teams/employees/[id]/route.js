import teamProjectController from "/controllers/teamProject.controller";

export const DELETE = (req, params) => teamProjectController.deleteEmployee(req, params);
export const PATCH = (req, params) => teamProjectController.changeEmployees(req, params);
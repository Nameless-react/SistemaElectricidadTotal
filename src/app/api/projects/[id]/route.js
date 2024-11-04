import projectController from "/controllers/project.controller";

export const PATCH = (req, params) => projectController.updateProject(req, params);
export const GET = (req, params) => projectController.getProject(req, params);
export const DELETE = (req, params) => projectController.deleteProject(req, params);

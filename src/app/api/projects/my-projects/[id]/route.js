import projectController from "/controllers/project.controller";


export const GET = (req, params) => projectController.getMyProjects(req, params);
import projectController from "/controllers/project.controller";

export const GET = (req, res) => projectController.getProjects(req, res)
export const POST = (req, res) => projectController.createProject(req, res)
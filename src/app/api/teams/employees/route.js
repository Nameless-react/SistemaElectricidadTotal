import teamProjectController from "/controllers/teamProject.controller";

export const POST = (req, res) => teamProjectController.addEmployee(req, res);
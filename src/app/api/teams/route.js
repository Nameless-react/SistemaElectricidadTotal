import teamProjectController from "/controllers/teamProject.controller"

export const GET = (req, res) => teamProjectController.getTeams(req, res);
export const POST = (req, res) => teamProjectController.saveTeam(req, res);
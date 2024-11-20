import teamProjectController from "../../../../../../controllers/teamProject.controller";
export const GET = (req, params) => teamProjectController.getTeamByProject(req, params);

import logController from "../../../../controllers/log.controller";

export const GET = (req, res) => logController.getLogs(req, res);

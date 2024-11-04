import { taskController } from "/controllers";

export const GET = (req, params) => taskController.getTasksByProject(req, params);
import taskController from "/controllers/task.controller";

export const PATCH = (req, params) => taskController.updateTask(req, params);
export const GET = (req, params) => taskController.getTask(req, params);
export const DELETE = (req, params) => taskController.deleteTask(req, params);

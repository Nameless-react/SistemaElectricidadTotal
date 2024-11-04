import taskController from "/controllers/task.controller";

export const GET = (req, res) => taskController.getTasks(req, res);
export const POST = (req, res) => taskController.saveTask(req, res);
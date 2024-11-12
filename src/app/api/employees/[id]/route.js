import employeeController from "/controllers/employee.controller";

export const PATCH = (req, params) => employeeController.updateEmployee(req, params);
export const GET = (req, params) => employeeController.getEmployee(req, params);
export const DELETE = (req, params) => employeeController.deleteEmployee(req, params);

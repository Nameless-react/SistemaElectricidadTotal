import employeeController from "/controllers/employee.controller";

export const GET = (req, res) => employeeController.getEmployees(req, res);
export const POST = (req, res) => employeeController.createEmployee(req, res)
export const PUT = (req , res) => employeeController.updateEmployee(req,res)

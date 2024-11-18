import { NextResponse } from "next/server";
import sequelize from "/config/databaseConnection";
import apiErrorWrapper from "/errors/apiErrorWrapper";
import EmployeeModel from "/models/employees.model";
import EmployeeService from "/services/employees/employees.service";
import EmployeeRepository from "/repositories/employee.repository";
import UserModel from "/models/user.model";
import { ErrorHandler } from "../errors/errors";
import { ValidationEmployeeFormService, UserService } from "../Services";
import { validateEmployeeForm } from "../functions/validations/employeeValidation2";
import { UserRepository } from "../repositories";
import { Sequelize } from "sequelize";
import { fromDate } from "@internationalized/date";

const employeeRepository = new EmployeeRepository(EmployeeModel, UserModel, sequelize);
const employeeService = new EmployeeService(employeeRepository);
const errorHandler = new ErrorHandler();
const validationEmployeeFormService = new ValidationEmployeeFormService(validateEmployeeForm);
const userRepository = new UserRepository(UserModel, sequelize);
const userService = new UserService(userRepository);

class EmployeeController {
    constructor(employeeService, errorHandler, validationEmployeeFormService, userService) {
        this.errorHandler = errorHandler
        this.employeeService = employeeService
        this.validationEmployeeFormService = validationEmployeeFormService
        this.userService = userService
    }

    getEmployee = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        const employee = await this.employeeService.getEmployeeById(parseInt(id));
        return NextResponse.json(employee, { status: 200 });
    });

    getEmployees = apiErrorWrapper(async (req, res) => {
        const employees = await this.employeeService.getEmployees();
        return NextResponse.json(employees, { status: 200 })
    })

    createEmployee = apiErrorWrapper(async (req, res) => {
        const formData = await req.json();
        const { success, error, data } = await this.validationEmployeeFormService.validateEmployeeForm(formData);
        if (!success) {
            return this.errorHandler.sendError(res, error, 'validation_error', 400);
        }
        const userExists = await this.userService.getUserById(data.userId);
        if (!userExists) {
            return this.errorHandler.sendError(res, 'El usuario no existe', 'userId', 400);
        }
        const result = await this.employeeService.createEmployee(data);
        if (!result) {
            return this.errorHandler.sendError(res, 'Error al crear Usuario', 'internal_server_error', 500);
        }
        return NextResponse.json({ message: "El empleado se ha creado exitosamente " }, { status: 200 })


    });

    deleteEmployee = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        await this.employeeService.deleteEmployee(parseInt(id));
        return NextResponse.json({ message: "El empleado ha sido eliminado de manera exitosa" }, { status: 200 });
    });

    updateEmployee = apiErrorWrapper(async (req, params) => {
        const url = new URL(req.url);
        const id = parseInt(url.searchParams.get("id"));
        const formData = await req.json();
        const { success, error, data } = await this.validationEmployeeFormService.validateEmployeeForm(formData);
        if (!success) {
            return this.errorHandler.sendError(res, error, 'validation_error', 400);
        }
        const userExists = await this.userService.getUserById(data.userId);
        if (!userExists) {
            return this.errorHandler.sendError(res, 'El usuario no existe', 'userId', 400);
        }
        const result = await this.employeeService.updateEmployee(data);
        if(!result){
            return this.errorHandler.sendError(res, 'Error al editar Usuario', 'internal_server_error', 500);
        }
        return NextResponse.json({ message: "El empleado se ha editado de manera exitosa " }, { status: 200 })
        
    });
}

export default new EmployeeController(employeeService, errorHandler, validationEmployeeFormService, userService);
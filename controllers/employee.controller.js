import { NextResponse } from "next/server";
import sequelize from "/config/databaseConnection";
import apiErrorWrapper from "/errors/apiErrorWrapper";
import EmployeeModel from "/models/employees.model";
import EmployeeService from "/services/employees/employees.service";
import EmployeeRepository from "/repositories/employee.repository";
import UserModel from "/models/user.model";

const employeeRepository = new EmployeeRepository(EmployeeModel, UserModel, sequelize);
const employeeService = new EmployeeService(employeeRepository);


class EmployeeController {
    constructor(employeeService) {
        this.employeeService = employeeService
    }
    
    getEmployee = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        console.log(id)
        const employee = await this.employeeService.getEmployeeById(parseInt(id));
        return NextResponse.json(employee, { status: 200 });
    });
    
    getEmployees = apiErrorWrapper(async (req, res) => {
        const employees = await this.employeeService.getEmployees();
        return NextResponse.json(employees, { status: 200 })
    })

    createEmployee = apiErrorWrapper(async (req, res) => {
        const parseBody = await req.json();
        await this.employeeService.createEmployee(parseBody);
        return NextResponse.json({ message: "El empleado ha sido agregado con éxito." }, { status: 201 });
    });
    
    deleteEmployee = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        await this.employeeService.deleteEmployee(parseInt(id));
        return NextResponse.json({ message: "El empleado ha sido eliminado de manera exitosa" }, { status: 200 });
    });
    
    updateEmployee = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        const parseBody = await req.json();
    
        const updatedEmployee = await this.employeeService.updateEmployee({ 
            idEmployees: parseInt(id),
            ...parseBody    
        });
    
        return NextResponse.json(updatedEmployee, { status: 200 });
    });
}

export default new EmployeeController(employeeService);
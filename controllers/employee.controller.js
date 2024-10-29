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
        const appointment = await this.employeeService.getAppointmentById(parseInt(id));
        return NextResponse.json(appointment, { status: 200 })
    })

    getEmployees = apiErrorWrapper(async (req, res) => {
        const employees = await this.employeeService.getEmployees();
        return NextResponse.json(employees, { status: 200 })
    })

    saveAppointment = apiErrorWrapper(async (req, res) => {
        const parseBody = await req.json();
        await this.employeeService.saveAppointment(parseBody);
        return NextResponse.json({ message: "Su cita ha sido agendada con éxito. Por favor, revise su correo electrónico para confirmar la cita." }, { status: 201 });
    })

    deleteEmployee = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        await this.employeeService.cancelAppointment(parseInt(id));
        return NextResponse.json({ message: "la cita ha sido cancelada exitosamente" }, { status: 200 });
    })
    updateAppointment = apiErrorWrapper(async (req, params) => {
        const { id } = params.params;
        const parseBody = await req.json();

        const updatedAppointment = await this.employeeService.updateAppointment({ 
            idAppointment: parseInt(id),
            ...parseBody    
        });

        return NextResponse.json(updatedAppointment, { status: 200 })
    })
    
 
}

export default new EmployeeController(employeeService);
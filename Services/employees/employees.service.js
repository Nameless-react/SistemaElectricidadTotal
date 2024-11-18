import { validateEmployee,validateIdEmployee,validatePartialEmployee } from "/functions/validations/employeeValidation";
import { ValidationFailureError, NotFoundError, DeletionError } from "/errors/errors";


export default class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    async getEmployees() {
        return await this.employeeRepository.getEmployees();
    }

    async getEmployeeById(id) {
        const validIdEmployee = validateIdEmployee({ idEmployees: id });
        if (validIdEmployee.error) throw new ValidationFailureError(validIdEmployee.error);


        const employee = await this.employeeRepository.getEmployeeById(id);
        if (!employee) throw new NotFoundError("El empleado no fue encontrado")

        return employee
       
    }

    async updateEmployee(employeeData) {
        return await this.employeeRepository.updateEmployee(employeeData);
    }
    
    async deleteEmployee(id) {
        const validIdEmployee = validateIdEmployee({ idEmployees: id });
        if (validIdEmployee.error) throw new ValidationFailureError(validIdEmployee.error);
    
        const deleted = await this.employeeRepository.deleteEmployee(validIdEmployee.data.idEmployees);
        if (!deleted) throw new DeletionError("No se pudo eliminar el empleado");
    }
    
    async createEmployee(employeeData) {
        return await this.employeeRepository.createEmployee(employeeData);
    }
    

}
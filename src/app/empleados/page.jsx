import { ExpensesManagmentTable } from "../../../components/finances/expensesManagmentTable";
import employeeController from "../../../controllers/employee.controller";

export default async function Page() {
    const employeeService = employeeController.employeeService;
    const employees = await employeeService.getEmployees();
    console.log(employees);


    const employeesData = employees.map((employee) => ({
        id: employee.idEmployee,
        name: employee.name,
        job: employee.job,
        email: employee.email,
        joinAt: new Date(employee.joinAt).toLocaleDateString()
    }));

    const columnHeaders = [
        { key: 'name', label: 'Nombre' },
        { key: 'job', label: 'Puesto' },
        { key: 'email', label: 'Correo' },
        { key: 'joinAt', label: 'Fecha de Ingreso' },
    ];


    return (
        <div className='flex-grow mx-auto max-w-7xl pt-16 px-6'>
            <h1 className="text-3xl text-center mb-8 font-semibold mt-10 text-white">Gestión de Empleados</h1>

            <ExpensesManagmentTable
                rows={employeesData}
                columnHeaders={
                    columnHeaders
                }
                actionConfig={{ link: "/empleados/gestionar", action: "Agregar Empleado" }}
            />
        </div>
    );
}
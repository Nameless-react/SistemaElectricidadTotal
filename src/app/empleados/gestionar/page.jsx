import { EmployeeForm } from "../../../../components/employee/employeeForm"
import { createUserController } from "../../../../controllers/factory"
import employeeController from "../../../../controllers/employee.controller";
import { ActionPathnameNormalizer } from "next/dist/server/future/normalizers/request/action";

export default async function Page({ searchParams }) {
    const { id } = searchParams;
    let employee = null;
    const userService = createUserController().userService;
    const employeeService = employeeController.employeeService;
    const users = await userService.getAllUsers();
    let parseEmployee = null;
    try {
        if(id){
            employee = await employeeService.getEmployeeById(id);
            parseEmployee = {
                job: employee.dataValues.job,
                joinAt : employee.dataValues.joinAt,
                userId: employee.dataValues.idUsers
            }
        }
    } catch (error) {
        console.error(error)
        return <p>No se logró obtener los datos</p>
    }
    const usersData = users.map((user) => user.dataValues);
    return (<div>
        <h1 className="text-2xl md:text-4xl font-bold text-slate-200 text-center mb-8 p-5" >
            {id? "Editar Empleado" : "Agregar Empleado"}
        </h1>
        <EmployeeForm users={usersData}employee={parseEmployee} />
    </div>);
}



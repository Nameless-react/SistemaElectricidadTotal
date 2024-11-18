"use server"
import ProviderProjectContext from '/components/project/context/ProviderProjectContext';
import ChangeProjectInformation from '/components/project/ChangeProjectInformation';
import { getEmployeesAction } from '/functions/fetches/employees/employeeActions';

export default async function CreateProject() {
    const responseEmployees = await getEmployeesAction();


    return (
        <ProviderProjectContext initialEmployees={responseEmployees}>
            <div className="w-4/6 mx-auto my-12 mb-22">
                <ChangeProjectInformation />
            </div>
        </ProviderProjectContext>
    )
}
"use server"
import ProviderProjectContext from "/components/project/context/ProviderProjectContext";
import ProjectInformation from "/components/project/ProjectInformation";
import { getEmployeesAction } from "/functions/fetches/employees/employeeActions";
import { getProjectAction } from '/functions/fetches/projects/projectActions';
import { getUsersAction } from "/functions/fetches/users/userActions";
import SkeletonProjectDashboard from "/components/skeletons/SkeletonProjectDashboard";
import { Suspense } from "react";


export default async function Project({ params }) {
    const { id } = await params;
    let project;
    if (id && !isNaN(parseInt(id))) project = await getProjectAction(parseInt(id)); 
    const responseEmployees = await getEmployeesAction();
    const responseUsers = await getUsersAction();

    return (
        <Suspense fallback={<SkeletonProjectDashboard />}>
            <ProviderProjectContext initialProject={project} initialEmployees={responseEmployees} initialUsers={responseUsers}>
                <ProjectInformation />
            </ProviderProjectContext>
        </Suspense>
    )
}
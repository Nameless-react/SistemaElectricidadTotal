"use server";
import ProjectDashboard from "/components/project/ProjectDashboard";
import { getProjectAction } from "/functions/fetches/projects/projectActions";

export default async function Project({ params }) {
    const { id } = params;
    let project;
    if (id) project = await getProjectAction(parseInt(id)); 

    return (
        <>
            <ProjectDashboard 
                {...project}
                budget={project.budget}
                //RECORDAR CAMBIAR EXPENSES
                expenses={project.budget}
            />
        </>
    )
}
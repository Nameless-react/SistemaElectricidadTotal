"use server";
import ProjectDashboard from "/components/project/ProjectDashboard";

export default async function Project({ params }) {
    const { id } = params;
    let project;
    if (id) project = await getProjectAction(parseInt(id)); 

    return (
        <>
            <ProjectDashboard 
                budget={200000}
                expenses={100000}
            />
        </>
    )
}
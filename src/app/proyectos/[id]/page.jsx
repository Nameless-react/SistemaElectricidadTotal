"use server";
import { getProjectAction } from "/functions/fetches/projects/projectActions";
import ProjectInformation from "/components/project/ProjectInformation";


export default async function Project({ params }) {
    const { id } = params;
    let project;
    if (id) project = await getProjectAction(parseInt(id)); 


    return (
       <ProjectInformation project={project}/>
    )
}
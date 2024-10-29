"use client"
import ProjectInformation from "/components/project/ProjectInformation";
import { ProjectProvider } from "/components/project/context/ProjectContext";


export default function Project() {

    return (
        <ProjectProvider>
            <ProjectInformation />
        </ProjectProvider>
    )
}
"use client"

import { ProjectProvider } from "/components/project/context/ProjectContext";


export default function ProviderProjectContext({ initialProject, initialEmployees, children }) {
    
    return (
        <ProjectProvider initialProject={initialProject} initialEmployees={initialEmployees}>
            {children}
        </ProjectProvider>
    )
}
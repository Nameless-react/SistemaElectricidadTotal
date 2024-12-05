"use client"

import { ProjectProvider } from "/components/project/context/ProjectContext";


export default function ProviderProjectContext({ initialProject, initialEmployees, initialUsers, children }) {
    
    return (
        <ProjectProvider initialProject={initialProject} initialEmployees={initialEmployees} initialUsers={initialUsers}>
            {children}
        </ProjectProvider>
    )
}
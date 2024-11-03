"use client"

import { ProjectProvider } from "/components/project/context/ProjectContext";


export default function ProviderProjectContext({ initialData, children }) {
    
    return (
        <ProjectProvider initialData={initialData}>
            {children}
        </ProjectProvider>
    )
}
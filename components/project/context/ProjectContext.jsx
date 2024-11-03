"use client"
import { createContext, useState } from 'react';


export const ProjectContext = createContext(null);

export const ProjectProvider = ({ children, initialData }) => {
    const [project, setProject] = useState(initialData.project);
    const [employees, setEmployees] = useState(initialData.employees);


    return (
        <ProjectContext.Provider value={{ project, setProject, employees, setEmployees }}>
            {children}
        </ProjectContext.Provider>
    );
};
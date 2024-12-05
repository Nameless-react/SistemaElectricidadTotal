"use client"
import { createContext, useCallback } from 'react';
import useProjectData from '/functions/hooks/useProjectData';

export const ProjectContext = createContext(null);

export const ProjectProvider = ({ children, initialProject, initialEmployees, initialUsers }) => {
    const { project, employees, users, loading, loadProjectData } = useProjectData(initialProject, initialEmployees, initialUsers);



    return (
        <ProjectContext.Provider value={{ project, employees, users, loading, loadProjectData }}>
            {children}
        </ProjectContext.Provider>
    );
};
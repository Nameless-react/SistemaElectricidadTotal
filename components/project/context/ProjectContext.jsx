"use client"
import { createContext, useCallback } from 'react';
import useProjectData from '/functions/hooks/useProjectData';

export const ProjectContext = createContext(null);

export const ProjectProvider = ({ children, initialProject, initialEmployees }) => {
    const { project, employees, loading, loadProjectData } = useProjectData(initialProject, initialEmployees);



    return (
        <ProjectContext.Provider value={{ project, employees, loading, loadProjectData }}>
            {children}
        </ProjectContext.Provider>
    );
};
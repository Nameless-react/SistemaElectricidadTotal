"use client"
import { createContext, useState, useEffect } from 'react';
import { getProjectAction } from '/functions/fetches/projects/projectActions';
import { useParams } from 'next/navigation';
import { getEmployeesAction } from "/functions/fetches/employees/employeeActions"


export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [project, setProject] = useState(null);
    const [employees, setEmployees] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (!parseInt(id)) return;

        const fetchProject = async (id) => {
            const response = await getProjectAction(id);
            setProject(response);

            const responseEmployees = await getEmployeesAction();
            setEmployees(responseEmployees);
        }

        fetchProject(id)
    }, [id])


    return (
        <ProjectContext.Provider value={{ project, setProject, employees, setEmployees }}>
            {children}
        </ProjectContext.Provider>
    );
};
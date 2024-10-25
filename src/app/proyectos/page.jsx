"use server";

import styles from '/css/projects.module.css';
import Project from '/components/project/project';
import { getProjectsAction } from "/functions/fetches/projects/projectActions"


export default async function Projects() {
    const projects = await getProjectsAction(); 

    return (
        <div className={styles.projectsContainer}>
            {projects.length === 0 ? (
                <p>No hay proyectos disponibles.</p>
            ) : (
                projects.map(project => (
                    <Project
                        key={project.idProjects} 
                        idProjects={project.idProjects} 
                        status={project.idStatus} 
                        name={project.name}
                        description={project.description}
                        progressValue={project.percentage}
                        employees={[1, 2, 3]}
                    />
                ))
            )}
        </div>
    );
}

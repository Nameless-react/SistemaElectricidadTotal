'use client';
import { useEffect, useState } from 'react';
import styles from '/css/projects.module.css';
import Project from '/components/project/project';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects'); 
                const data = await response.json();

                if (data.success) {
                    setProjects(data.data); 
                } else {
                    console.error('Error al cargar los proyectos');
                }
            } catch (error) {
                console.error('Error al hacer la petición a la API:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return <div>Cargando proyectos...</div>; 
    }

    return (
        <div className={styles.projectsContainer}>
            {projects.length === 0 ? (
                <p>No hay proyectos disponibles.</p>
            ) : (
                projects.map((project) => (
                    <Project
                        key={project.ID_PROJECTS} 
                        status={project.ID_STATUS} 
                        name={project.NAME}
                        description={project.DESCRIPTION}
                        progressValue={project.PERCENTAGE}
                    />
                ))
            )}
        </div>
    );
}

"use server";
import styles from '/css/projects.module.css';
import Project from '/components/project/project';
import { getMyProjectsAction } from "/functions/fetches/projects/projectActions"
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { options } from '../../api/auth/[...nextauth]/options';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';



export default async function MyProjects() {
    const session = await getServerSession(options)
    const projects = await getMyProjectsAction(session?.user?.id);


    return (
        <>
            <div className={styles.myProjectsHeader}>
                <Link href="/portal-clientes"><FontAwesomeIcon icon={faArrowLeft} /></Link>
                <h1>Mis Proyectos</h1>
            </div>
            <div className={styles.projectsContainer}>
                {projects.length === 0 ? (
                    <p className='text-center font-bold col-span-3'>No hay proyectos disponibles</p>
                ) : (
                    projects.map(project => (
                        <Project
                            key={project.idProjects} 
                            idProjects={project.idProjects} 
                            status={project.status} 
                            name={project.name}
                            description={project.description}
                            progressValue={project.percentage}
                            employees={project.employees}
                        />
                    ))
                )}
            </div>
        </>
    );
}

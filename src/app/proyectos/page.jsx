"use server";
import styles from '/css/projects.module.css';
import Project from '/components/project/project';
import { getProjectsAction } from "/functions/fetches/projects/projectActions"
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';


export default async function Projects() {
    const projects = await getProjectsAction();
    const session = await getServerSession(options)
    return (
        <>
            {session && <div className="w-1/2 ml-auto flex justify-end px-11">
                <Link href="/proyectos/crear" className="bg-green-600 rounded-2xl text-white font-bold py-2 px-8 mt-4 text-xl">+</Link>
            </div>}
            <div className={styles.projectsContainer}>
                {projects.length === 0 ? (
                    <p>No hay proyectos disponibles</p>
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

"use client";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faCog } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
export default function MyProjects() {
    // Información de proyectos estática para demostración
    const projects = [
        { id: 1, name: 'Proyecto Alpha', progress: '50%' },
        { id: 2, name: 'Proyecto Beta', progress: '75%' },
        { id: 3, name: 'Proyecto Gamma', progress: '30%' }
    ];

    return (
        <div className="flex flex-col w-3/4 mx-auto mt-28 p-8 bg-main-color rounded-lg shadow-lg mb-52">
            <h1 className="text-4xl font-bold text-slate-200 mb-6">Mis Proyectos</h1>
            <div className="space-y-4">
                {projects.map(project => (
                    <div key={project.id} className="">
                        <Link hr className="bg-gray-700 hover:bg-gray-600 transition duration-300 ease-in-out text-white p-4 rounded-lg shadow-md flex justify-between items-center" href={`/portal-clientes/mis-proyectos/proyecto`} key={project.id}>
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faProjectDiagram} className="text-blue-400 text-2xl mr-4" />
                                <h2 className="text-xl font-semibold">{project.name}</h2>
                            </div>
                            <div className="flex items-center">
                                <p className="text-lg">{project.progress}</p>
                                <FontAwesomeIcon icon={faCog} className="text-gray-400 text-lg ml-4" />
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

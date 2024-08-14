"use client";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faImage, faChartLine, faDollarSign, faTasks, faCogs, faClock, faUserCheck } from "@fortawesome/free-solid-svg-icons";

export default function ProjectDetail() {

    const project = {
        name: 'Proyecto Alpha',
        progress: '50%',
        budget: '$10,000',
        estimatedDuration: '6 meses',
        documents: ['Plan de Proyecto', 'Requisitos Técnicos', 'Acta de Reunión'],
        images: ['imagen1.jpg', 'imagen2.jpg'],
        newImplementations: ['Iluminacion del frente del lote- 27/09/2024', 'Levantamiento de lote- 28/09/2024', 'Limpieza de lote- 29/09/2024'],
        teamMembers: ['Juan Pérez - Jefe de Cuadrilla', 'Ana Gómez - Electricista', 'Luis Rodríguez -Topografo']
    };

    return (
        <div className="flex flex-col w-3/4 mx-auto mt-28 p-8 bg-main-color rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-slate-200 mb-8 border-b border-gray-600 pb-4">{project.name}</h1>
            
            <div className="space-y-8">
        
                <section className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-600">
                    <h2 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center">
                        <FontAwesomeIcon icon={faChartLine} className="text-green-400 text-2xl mr-3" />
                        Progreso
                    </h2>
                    <p className="text-white text-xl">{project.progress}</p>
                </section>


                <section className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-600">
                    <h2 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center">
                        <FontAwesomeIcon icon={faDollarSign} className="text-yellow-400 text-2xl mr-3" />
                        Presupuesto
                    </h2>
                    <p className="text-white text-xl">{project.budget}</p>
                </section>

         
                <section className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-600">
                    <h2 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center">
                        <FontAwesomeIcon icon={faClock} className="text-teal-400 text-2xl mr-3" />
                        Duración Estimada
                    </h2>
                    <p className="text-white text-xl">{project.estimatedDuration}</p>
                </section>


                <section className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-600">
                    <h2 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center">
                        <FontAwesomeIcon icon={faFileAlt} className="text-blue-400 text-2xl mr-3" />
                        Documentos
                    </h2>
                    <ul className="list-disc pl-6 text-white">
                        {project.documents.map((doc, index) => (
                            <li key={index} className="mb-2 flex items-center">
                                <FontAwesomeIcon icon={faFileAlt} className="text-blue-400 mr-2" />
                                {doc}
                            </li>
                        ))}
                    </ul>
                </section>

      
                <section className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-600">
                    <h2 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center">
                        <FontAwesomeIcon icon={faImage} className="text-pink-400 text-2xl mr-3" />
                        Imágenes
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                        {project.images.map((image, index) => (
                            <img 
                                key={index}
                                src={image} 
                                alt={`Imagen del proyecto ${index + 1}`} 
                                className="w-full h-48 object-cover rounded-lg shadow-md border border-gray-600"
                            />
                        ))}
                    </div>
                </section>

         
                <section className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-600">
                    <h2 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center">
                        <FontAwesomeIcon icon={faCogs} className="text-gray-400 text-2xl mr-3" />
                        Ultimas tareas implementadas
                    </h2>
                    <ul className="list-disc pl-6 text-white">
                        {project.newImplementations.map((impl, index) => (
                            <li key={index} className="mb-2 flex items-center">
                                <FontAwesomeIcon icon={faCogs} className="text-gray-400 mr-2" />
                                {impl}
                            </li>
                        ))}
                    </ul>
                </section>


                <section className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-600">
                    <h2 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center">
                        <FontAwesomeIcon icon={faTasks} className="text-purple-400 text-2xl mr-3" />
                        Miembros del Equipo
                    </h2>
                    <ul className="list-disc pl-6 text-white">
                        {project.teamMembers.map((member, index) => (
                            <li key={index} className="mb-2 flex items-center">
                                <FontAwesomeIcon icon={faUserCheck} className="text-purple-400 mr-2" />
                                {member}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
}

"use client";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faMapMarkerAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "@nextui-org/avatar";
export default function UserProfile() {

    const user = {
        name: 'Carlos Martínez',
        email: 'carlos.martinez@example.com',
        phone: '+1234567890',
        address: '123 Calle Principal, Ciudad, País',
        profileImage: 'profile.jpg' 
    };

    return (
        <div className="flex flex-col w-3/4 mx-auto mt-28 p-8 bg-main-color rounded-lg shadow-lg">
            <div className="flex items-center mb-8">
          
                <Avatar
                    bordered
                    color="warning"
                    size="xl"
                    className="w-[100px] h-[100px] mr-4"
                    src = "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
                <div className="ml-6">
                    <h1 className="text-4xl font-bold text-slate-200">{user.name}</h1>
                    <p className="text-white text-lg mt-2">{user.bio}</p>
                </div>
            </div>

            <div className="space-y-6">
           
                <section className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-600">
                    <h2 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center">
                        <FontAwesomeIcon icon={faEnvelope} className="text-blue-400 text-2xl mr-3" />
                        Correo Electrónico
                    </h2>
                    <p className="text-white text-xl">{user.email}</p>
                </section>

                <section className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-600">
                    <h2 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center">
                        <FontAwesomeIcon icon={faPhone} className="text-green-400 text-2xl mr-3" />
                        Teléfono
                    </h2>
                    <p className="text-white text-xl">{user.phone}</p>
                </section>

                <section className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-600">
                    <h2 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-yellow-400 text-2xl mr-3" />
                        Dirección
                    </h2>
                    <p className="text-white text-xl">{user.address}</p>
                </section>

              
                <section className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-600">
                    <h2 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center">
                        <FontAwesomeIcon icon={faEdit} className="text-purple-400 text-2xl mr-3" />
                        Editar Perfil
                    </h2>
                    <p className="text-white text-lg">Puedes actualizar tu información personal y ajustar tus preferencias desde aquí.</p>
                    <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                        Editar
                    </button>
                </section>
            </div>
        </div>
    );
}

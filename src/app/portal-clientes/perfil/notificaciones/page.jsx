"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCheckCircle, faTimesCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/button";

export default function Notifications() {
    
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'success', message: 'Cita confirmada exitosamente.', date: '2024-08-01', time: '10:00 AM' },
        { id: 2, type: 'error', message: 'Error al confirmar la cita, por favor intente de nuevo.', date: '2024-08-02', time: '02:15 PM' },
        { id: 3, type: 'info', message: 'Recuerde verificar su correo para más detalles.', date: '2024-08-03', time: '08:30 AM' }
    ]);

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return faCheckCircle;
            case 'error':
                return faTimesCircle;
            case 'info':
                return faBell;
            default:
                return faBell;
        }
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    return (
        <div className="flex flex-col w-1/3 items-center gap-8 p-8 mx-auto mt-28 w-3/4 bg-main-color rounded-lg shadow-lg">
            <div className="flex justify-between items-center w-full">
                <h1 className="text-4xl font-bold text-slate-200">Notificaciones</h1>
                <Button 
                    onClick={clearNotifications}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center"
                >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Limpiar
                </Button>
            </div>

            <div className="w-full mt-4">
                {notifications.length === 0 ? (
                    <p className="text-white text-lg text-center">No hay notificaciones.</p>
                ) : (
                    notifications.map(notification => (
                        <div key={notification.id} className={`flex items-center justify-between p-4 mb-4 rounded-lg shadow-md bg-gray-700 text-white`}>
                            <div className="flex items-center flex-grow">
                                <FontAwesomeIcon icon={getIcon(notification.type)} className="text-white text-2xl mr-4" />
                                <p className="text-white flex-grow">{notification.message}</p>
                            </div>
                            <div className="text-white text-sm ml-4 flex-shrink-0">
                                <p>{notification.date}</p>
                                <p>{notification.time}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

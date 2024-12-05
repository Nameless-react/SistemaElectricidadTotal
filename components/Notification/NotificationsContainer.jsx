"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "@nextui-org/button"
import { faBroom } from "@fortawesome/free-solid-svg-icons"
import { useContext } from "react"
import { NotificationContext } from "./context/NotificationContext"
import Notification from "./Notification"



export default function NotificationsContainer() {
    const { notifications, notReadNotifications } = useContext(NotificationContext);

    return (
        <div className="flex flex-col w-2/3 items-center gap-8 p-8 mx-auto mt-22 bg-main-color rounded-lg shadow-lg">
            <div className="flex justify-between items-center w-full">
                <h1 className="text-4xl font-bold text-slate-200">Notificaciones</h1>
                <Button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg flex items-center">
                    <FontAwesomeIcon icon={faBroom} className="mr-2" />
                    Marcar como leídas
                </Button>
            </div>

            <div className="w-full mt-4">
                {notifications.length === 0 || notifications === null ? (
                    <p className="text-white text-lg text-center">No hay notificaciones.</p>
                ) : (notifications?.map((notification, index) => (<Notification key={index} {...notification} />)))}
            </div>
        </div>
    )
}
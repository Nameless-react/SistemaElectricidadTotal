"use client"
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useContext } from "react";
import { NotificationContext } from "../Notification/context/NotificationContext";


/**
 * Component to show the notifications
 *
 * @returns {JSX.Element}
 */
export default function NotificationsBell() {
    const { notifications, notReadNotifications } = useContext(NotificationContext);
    console.log(notReadNotifications)
 

    return (
        <Link className="relative" href="/perfil/notificaciones">
            <FontAwesomeIcon icon={faBell} className="ml-2 w-auto h-4" />
            {notReadNotifications.length !== 0 && <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 transition duration-300 ease-in-out text-white px-1.5 mt-1  rounded-full shadow-md hover:shadow-lg flex items-center justify-center">
                <p className="text-xs font-semibold">{notReadNotifications.length}</p>
            </div>}
        </Link>
)
}
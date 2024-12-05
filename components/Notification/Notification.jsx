"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useContext } from "react";
import { NotificationContext } from "./context/NotificationContext";


export default function Notification({ idNotifications, title, shippingDateTime, type, isRead  }) {
    const { markAsRead } = useContext(NotificationContext)
    
    dayjs.extend(relativeTime)
    const getIcon = {
        "success": faCheckCircle,
        "error": faTimesCircle,
        "info": faBell
    };



    return (
        <div  {...(!isRead && { onMouseEnter: (e) => markAsRead(idNotifications) })} className={`flex items-center justify-between min-h-20 p-4 mb-4 rounded-lg shadow-md text-white cursor-pointer`} style={{backgroundColor: !isRead ? "#1f2c47" : "#182237"}}>
        <div className="flex items-center flex-grow">
            <FontAwesomeIcon icon={getIcon[type] || faBell} className="text-white text-2xl mr-4" />
            <p className="text-white flex-grow">{title}</p>
        </div>
        <div className="text-white text-sm ml-4 flex-shrink-0">
            <p>{dayjs(shippingDateTime).fromNow()}</p>
        </div>
    </div>
    )
}
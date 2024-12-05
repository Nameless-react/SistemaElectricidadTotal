"use client"
import { useEffect, useState, useCallback } from "react";
import { getNotificationsByUserAction } from "../fetches/notifications/notificationAction";
import pusherClient from "/functions/others/pusher/pusherClient";
import { useSession } from "next-auth/react";
import { markAsReadAction } from "../fetches/notifications/notificationAction";

export default function useNotification() {
    const [notifications, setNotifications] = useState([]);
    const { data: session } = useSession();
    
    const loadNotifications = async (userId) => {
        const fetchNotifications = await getNotificationsByUserAction(userId)
        setNotifications(fetchNotifications || []);
    };

    useEffect(() => {
        if (!session) return;
        loadNotifications(session?.user?.id)
    }, [session])

    // useEffect(() => {
    //     if (!session) return;
    //     loadNotifications(session?.user?.id) 

    //     const channel = pusherClient
    //         .subscribe("")
    //         .bind("notification::new", (data) => {
    //             setNotifications(prevValues => [...prevValues, data])
    //         });

    //     return () => channel.unbind();
    // }, [])

    
    
  

    const sendNotification = useCallback(async (notification) => {
        try {
            await fetch('/api/notifications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(notification),
            });
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    }, []);

    const markAsRead = async (id) => {
        setNotifications(prev => prev.map(notification => notification.idNotifications === id ? {...notification, isRead: true} : notification))
        await markAsReadAction(id);
    };



    const notReadNotifications = notifications.filter(notification => !notification.isRead)

    return { notifications, setNotifications, loadNotifications, notReadNotifications, markAsRead }
}
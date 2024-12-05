"use client"
import { createContext } from 'react';
import useNotification from '/functions/hooks/useNotification';

export const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
    const { notifications, setNotifications, notReadNotifications, markAsRead } = useNotification();


    return (
        <NotificationContext.Provider value={{ notifications, setNotifications, notReadNotifications, markAsRead }}>
            {children}
        </NotificationContext.Provider>
    );
};
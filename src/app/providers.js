"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { SessionProvider } from "next-auth/react";
import { NotificationProvider } from "/components/Notification/context/NotificationContext";

export default function Providers({ children }) {
    return (
        <SessionProvider>
            <NotificationProvider>
                <NextUIProvider>
                    {children}
                </NextUIProvider>
            </NotificationProvider>
        </SessionProvider>
    );
}
"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { SessionProvider } from "next-auth/react"; 

export default function Providers({ children }) {    
    return (
        <SessionProvider>
            <NextUIProvider>
                <main className="dark text-foreground">
                    {children}
                </main>
            </NextUIProvider>
        </SessionProvider>
    );
}
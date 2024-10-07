"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { SessionProvider } from "next-auth/react"; 
import { useRouter } from 'next/navigation';

export default function Providers({ children }) {
    const router = useRouter();
    
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
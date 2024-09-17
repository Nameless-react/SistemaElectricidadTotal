"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from 'next/navigation';

export default function Providers({ children }) {
    const router = useRouter();
    return (
        <NextUIProvider>
            <main className="dark text-foreground">

                {children}
            </main>
        </NextUIProvider>
    );
}
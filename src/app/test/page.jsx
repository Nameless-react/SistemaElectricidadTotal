"use client"; // Make sure this component is a client component
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


function Page() {

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") {
            // Optionally, handle loading state
            return;
        }

        if (!session) {
            // If not authenticated, redirect to login page
            router.push("/login"); // Adjust the path based on your routing
        }
    }, [session, status, router]);

    return (
        <div>
            Hola
        </div>
    );
}

export default MyApp;
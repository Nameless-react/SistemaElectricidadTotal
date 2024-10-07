"use client"
import { signOut } from "next-auth/react"; // Import signOut for client-side logout
export const Logout = () => {
    return (
        <label
            onClick={() => signOut({ callbackUrl: "/login" })} // Call signOut with a redirect to login page
            className="mt-4 p-2 cursor-pointer  text-white rounded">
            Logout
        </label>
    )
}
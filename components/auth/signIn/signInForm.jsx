"use client"
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { SignInProvider } from "./compound_components/context/signInContext";
import { SignInEmail, SignInPassword, SignInFormContainer } from "./compound_components/signInForm";

export const ManageSignInForm = () => {
    return (
        <SignInProvider>
            <SignInFormContainer>
                <SignInEmail className="w-2/3" />
                <SignInPassword className="w-2/3" />
                <Link href="#">¿Olvidó su contraseña?</Link>
                <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-xl ease-in-out text-white font-bold py-4 h-16 px-8 mt-8">
                    Iniciar Sesión
                </Button>
            </SignInFormContainer>
        </SignInProvider >
    )
}
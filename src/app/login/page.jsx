'use client'
import { Input } from "@nextui-org/input"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import Script from "next/script";
import Link from "next/link";
import "/css/globals.css";

export default function Login() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <>
            <div className="outer-container">
                <div className="formsContainer">
                    <div className="signInSignUp">
                        <form action="" className="signInForm">
                            <h2 className="text-5xl font-bold">Iniciar Sesión</h2>
                            <div className="w-2/3">
                                <Input isClearable type="email" label="Correo" className="dark w-full"/>
                            </div>
                            <div className="w-2/3">
                                <Input
                                    label="Password"
                                    endContent={
                                        <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                        {isVisible ? (
                                            <FontAwesomeIcon icon={faEye} className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <FontAwesomeIcon icon={faEyeSlash} className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                        </button>
                                    }
                                    type={isVisible ? "text" : "password"}
                                    className="w-full dark"
                                />
                            </div>
                            <Link href="#">¿Olvidó su contraseña?</Link>
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-xl ease-in-out text-white font-bold py-4 h-16 px-8 mt-8">
                                Iniciar Sesión
                            </Button> 
                        </form>
                        <form action="" className="signUpForm">
                            <h1 className="text-5xl font-bold">Registrarse</h1>
                            <div className="w-2/3">
                                <Input isClearable type="email" label="Correo" className="dark w-full"/>
                            </div>
                            <div className="w-2/3">
                                <Input
                                    label="Contraseña"
                                    endContent={
                                        <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                        {isVisible ? (
                                            <FontAwesomeIcon icon={faEye} className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <FontAwesomeIcon icon={faEyeSlash} className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                        </button>
                                    }
                                    type={isVisible ? "text" : "password"}
                                    className="w-full dark"
                                />
                            </div>
                            <div className="w-2/3">
                                <Input
                                    label="Confirmar Contraseña"
                                    endContent={
                                        <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                        {isVisible ? (
                                            <FontAwesomeIcon icon={faEye} className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <FontAwesomeIcon icon={faEyeSlash} className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                        </button>
                                    }
                                    type={isVisible ? "text" : "password"}
                                    className="w-full dark"
                                />
                            </div>
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-xl ease-in-out text-white font-bold py-4 h-16 px-8 mt-8">
                                Registrarse
                            </Button> 
                        </form>
                    </div>
                </div>

                <div className="panelsContainer">
                    <div className="panel leftPanel">
                        <div className="content">
                            <h3>¿No tienes cuenta?</h3>
                            
                            <button id="sign-up-btn" className="transparent">Crear Cuenta</button>
                        </div>
                    </div>
                    <div className="panel rightPanel">
                        <div className="content">
                            <h3>¿Ya tienes cuenta?</h3>
                            <button id="sign-in-btn" className="transparent">Iniciar Sesión</button>
                        </div>
                    </div>
                </div>
            </div>
            <Script src="scripts.js" strategy="lazyOnload" /> 
        </>
    )
}
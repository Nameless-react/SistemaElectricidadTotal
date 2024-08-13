"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faEnvelope, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {  Input, Textarea} from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Image from "next/image";

export default function SupportPage() {

    const [faq, setFaq] = useState([
        { id: 1, question: '¿Cómo puedo recuperar mi contraseña?', answer: 'Puede recuperar su contraseña haciendo clic en "Olvidé mi contraseña" en la pantalla de inicio de sesión.' },
        { id: 2, question: '¿Cómo puedo contactar con el soporte?', answer: 'Puede contactar con nuestro soporte a través del formulario de contacto en esta página.' },
        { id: 3, question: '¿Qué hacer si encuentro un error?', answer: 'Por favor, infórmenos del error a través del formulario de contacto para que podamos investigarlo.' }
    ]);

    return (
        <div className="flex flex-col w-3/4 mx-auto mt-28 p-8 bg-main-color rounded-lg shadow-lg  mb-8">
            <Image width={200} height={200} src="/logo2.png" />
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-slate-200">Centro de Soporte</h1>
                <div className="mt-6">
                    <h2 className="text-2xl font-bold text-slate-200 mb-4">Preguntas Frecuentes</h2>
                    <div className="space-y-4">
                        {faq.map(item => (
                            <div key={item.id} className="bg-gray-700 text-white p-4 rounded-lg shadow-md">
                                <div className="flex items-center mb-2">
                                    <FontAwesomeIcon icon={faQuestionCircle} className="text-main-orange text-xl mr-2" />
                                    <h3 className="text-xl font-semibold">{item.question}</h3>
                                </div>
                                <p>{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        
            <div>
                <h2 className="text-2xl font-bold text-slate-200 mb-4">Contáctenos</h2>
                <form className="flex flex-col gap-6">
                    <div className="w-full max-w-md">
                        <Input 
                            type="text" 
                            label="Asunto" 
                            placeholder="Asunto de su mensaje"
                            className="w-full dark text-white rounded-lg"
                        />
                    </div>
                    <div className="w-full max-w-md">
                        <Textarea 
                            label="Mensaje" 
                            placeholder="Escriba su mensaje aquí..."
                            className="w-full dark text-white rounded-lg"
                        />
                    </div>
                    <Button 
                        type="submit" 
                        size="lg"
                        className="bg-blue-600 w-[450px]  hover:bg-blue-700 transition duration-300 text-white font-bold py-4 px-8 rounded-lg flex items-center"
                    >
                        Enviar <FontAwesomeIcon icon={faPaperPlane} className="ml-2" />
                    </Button>
                </form>
            </div>
        </div>
    );
}

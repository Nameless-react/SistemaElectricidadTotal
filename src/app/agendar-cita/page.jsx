"use client"
import React from "react";
import DateAppointment from "/components/appointment/DateAppointment";
import { Input, Textarea } from "@nextui-org/input"
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"; 

export default function Appointments() {
   
    return (
        <form className="flex justify-center gap-10 items-center flex-col w-2/3 mx-auto mt-28 rounded-2xl bg-opacity-40 py-12 px-8 mb-44 bg-neutral-950">
            <h1 className="text-5xl font-bold">Reservar Cita</h1>

            {/* Implementation to show the email when the user is not login */}
            <Input  isClearable type="email" label="Correo" className="dark w-2/3"/>
            <DateAppointment />
            <Textarea label="Dirección" className="dark w-2/3" />
            <div className="flex items-center mt-4">
                <p className="text-sm">¿Desea agendar la cita en las oficinas de Electricidad Total?</p>
                <input type="checkbox" className="dark ml-2 h-4 w-4" />
            </div>

            <Button size="lg" className="bg-green-700 hover:bg-green-800 transition duration-300 text-xl ease-in-out text-white font-bold py-4 h-16 px-8 rounded-2xl mt-8">
                Confirmar Cita <FontAwesomeIcon className="text-xl" icon={faCircleCheck} />
            </Button>  
        </form>
    )
}
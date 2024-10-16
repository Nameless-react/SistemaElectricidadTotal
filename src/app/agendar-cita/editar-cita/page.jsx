"use client"
import React from "react";
import DateAppointment from "/components/appointment/DateAppointment";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"; 

export default function EditAppointment({ appointmentNumber, address }) {


    return (
        <form className="flex justify-center gap-10 items-center flex-col w-5/6 mx-auto mt-28 bg-neutral-950 py-12 px-8 mb-1">
            <div className="flex items-center justify-content w-2/3 flex-col">
                <h1 className="text-5xl font-bold">Editar Cita</h1>
                <p className="font-light">Número: {appointmentNumber}</p>
            </div>
            <DateAppointment />
            <Textarea label="Dirección" className="dark w-2/3" defaultValue={address}/>
           

            <Button size="lg" className="bg-green-700 hover:bg-green-800 transition duration-300 text-xl ease-in-out text-white font-bold py-4 h-16 px-8 rounded-2xl mt-8">Confirmar Cambios <FontAwesomeIcon className="text-xl" icon={faCircleCheck} /></Button> 
        </form>
    )
}
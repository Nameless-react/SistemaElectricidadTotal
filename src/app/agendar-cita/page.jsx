"use client"
import React from "react";
import DateAppointment from "/components/DateAppointment";
import { Input, Textarea } from "@nextui-org/input"
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"; 
import Message from "/components/Message";
import SendMessage from "/components/SendMessage";

export default function Appointments() {
   
    return (
        <>
            <form action="" className="flex justify-center gap-10 items-center flex-col w-5/6 mx-auto mt-28 bg-neutral-950 py-12 px-8 mb-1">
                <h1 className="text-5xl font-bold">Reservar Cita</h1>
                <div className="w-2/3">
                    <Input isClearable type="email" label="Correo" className="dark w-full"/>
                </div>
                <DateAppointment />
                <div className="w-2/3">
                    <Textarea label="Dirección" className="dark" />
                </div>

                <Button size="lg" className="bg-green-700 hover:bg-green-800 transition duration-300 text-xl ease-in-out text-white font-bold py-4 h-16 px-8 rounded-2xl mt-8">
                    Confirmar Cita <FontAwesomeIcon className="text-xl" icon={faCircleCheck} />
                </Button>  
            </form>
            <Message 
                message={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias distinctio adipisci vel quisquam, a mollitia suscipit iusto harum fugiat voluptate maiores omnis ipsam dolorum eligendi in saepe exercitationem, numquam nihil, ab repellendus nam sint! Libero iste sint illo accusantium! Suscipit, neque. Quo a inventore cum debitis expedita recusandae, sapiente veritatis ea aut eos, aliquam ex excepturi quis, necessitatibus totam voluptates?"}
                author={"Joel García Rojas"}
            />

            <SendMessage />
        </>
    )
}
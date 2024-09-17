"use client";
import React from "react";
import DateAppointment from "/components/DateAppointment";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";




export default function Appointments() {
    return (
        <>
            <form className="flex flex-col w-1/2  items-center gap-8 p-8 mx-auto mt-28  rounded-2xl   bg-main-color rounded-lg shadow-lg"
             style={{
                backgroundColor: '#182237'
            }}
            >
                <h1 className="text-4xl font-bold text-slate-200">Reservar Cita</h1>

                <div className="w-[650px] flex justify-center items-center">
                    <DateAppointment label="Fecha" />
                </div>

                <div className="w-full max-w-md">
                    <Input
                        isClearable
                        type="text"
                        label="Descripción"
                        placeholder="Reunión con cliente A"
                        className="w-full  text-white dark  rounded-lg"
                    />
                </div>



                <div className="w-full max-w-md">
                    <Textarea
                        label="Dirección"
                        placeholder="Dirección A"
                        className="  text-white dark rounded-lg"
                    />
                    <div className="flex items-center mt-4">
                        <p className="text-sm">¿Desea Agendar Cita en la oficina de Electricidad Total?</p>
                        <input type="checkbox" className=" dark ml-2 h-4 w-4" />
                    </div>

                </div>

                <Button
                    size="lg"
                    className="bg-green-700 hover:bg-green-800 transition duration-300 text-xl text-white font-bold py-4 px-8 rounded-lg mt-8 flex items-center"
                >
                    Confirmar Cita <FontAwesomeIcon className="ml-2" icon={faCircleCheck} />
                </Button>
            </form>

        </>
    );
}

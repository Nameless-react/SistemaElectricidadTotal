"use client"
import { useState } from "react";
import DateAppointment from "/components/appointment/DateAppointment";
import { Input, Textarea } from "@nextui-org/input"
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"; 
import { getLocalTimeZone, today } from "@internationalized/date";
import { format } from "@react-aria/i18n";

export default function Appointments() {
   const [formData, setFormData] = useState({
        email: "",
        address: "",
        isInOffice: false,
        appointmentDate: today(getLocalTimeZone()),
        appointmentTime: ""
   });


   function handleChange(e) {
    const { name, value, type, checked } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }))
   }


   const handleClearEmail = () =>  setFormData(prevFormData => ({ ...prevFormData, email: "" }))


   function handleSubmit(e) {
        e.preventDefault();
        fetch("/api/citas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...formData, appointmentDate: formData.appointmentDate.toString(), appointmentTime: formData.appointmentTime.toString() })
        })
   }

    return (
        <form onSubmit={handleSubmit} className="flex justify-center gap-10 items-center flex-col w-2/3 mx-auto mt-28 rounded-2xl bg-opacity-40 py-12 px-8 mb-44 bg-neutral-950">
            <h1 className="text-5xl font-bold">Reservar Cita</h1>

            {/* Implementation to show the email when the user is not login */}
            <Input  isClearable type="email" label="Correo" className="dark w-2/3" onChange={handleChange} onClear={handleClearEmail} name="email" value={formData.email}/>
            <DateAppointment appointmentDate={formData.appointmentDate} appointmentTime={formData.appointmentTime} setDateTime={setFormData}/>
            <Textarea label="Dirección" className="dark w-2/3" name="address" onChange={handleChange} value={formData.address}/>
            <div className="flex items-center mt-4">
                <p className="text-sm">¿Desea agendar la cita en las oficinas de Electricidad Total?</p>
                <input type="checkbox" className="dark ml-2 h-4 w-4" onChange={handleChange} name="isInOffice" checked={formData.inisInOfficeOffice}/>
            </div>

            <Button size="lg" className="bg-green-700 hover:bg-green-800 transition duration-300 text-xl ease-in-out text-white font-bold py-4 h-16 px-8 rounded-2xl mt-8" type="submit">Confirmar Cita <FontAwesomeIcon className="text-xl" icon={faCircleCheck} /></Button>  
        </form>
    )
}
"use client"
import React from "react";
import DateAppointment from "/components/appointment/DateAppointment";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"; 
import Appointments from "@/app/citas/agendar/page"

export default Appointments;
// export default function EditAppointment({ idAppointment, address }) {

//     const [formData, setFormData] = useState({
//         address: "",
//         isInOffice: false,
//         appointmentDate: today(getLocalTimeZone()),
//         appointmentTime: ""
//    });


//    function handleChange(e) {
//     const { name, value, type, checked } = e.target;
//         setFormData(prevFormData => ({
//             ...prevFormData,
//             [name]: type === "checkbox" ? checked : value
//         }))
//    }


//    function handleSubmit(e) {
//         e.preventDefault();
//         fetch("/api/citas", {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({...formData, appointmentDate: formData.appointmentDate.toString(), appointmentTime: formData.appointmentTime.toString() })
//         })
//     }

//     return (
//         <form onSubmit={handleSubmit}  className="flex justify-center gap-10 items-center flex-col w-5/6 mx-auto mt-28 bg-neutral-950 py-12 px-8 mb-1">
//             <div className="flex items-center justify-content w-2/3 flex-col">
//                 <h1 className="text-5xl font-bold">Editar Cita</h1>
//                 <p className="font-light">Número: {idAppointment}</p>
//             </div>
//             <DateAppointment appointmentDate={formData.appointmentDate} appointmentTime={formData.appointmentTime} setDateTime={setFormData}/>
//             <Textarea label="Dirección" className="dark w-2/3" defaultValue={address}/>
//             <div className="flex items-center mt-4">
//                 <p className="text-sm">¿Desea agendar la cita en las oficinas de Electricidad Total?</p>
//                 <input type="checkbox" className="dark ml-2 h-4 w-4" onChange={handleChange} name="isInOffice" checked={formData.inisInOfficeOffice}/>
//             </div>

//             <Button size="lg" className="bg-green-700 hover:bg-green-800 transition duration-300 text-xl ease-in-out text-white font-bold py-4 h-16 px-8 rounded-2xl mt-8" type="submit">Confirmar Cambios <FontAwesomeIcon className="text-xl" icon={faCircleCheck} /></Button> 
//         </form>
//     )
// }
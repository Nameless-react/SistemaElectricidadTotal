"use client";
import style from "/css/appointmentsPage.module.css"


export default function Appointment({ idAppointment, email, appointmentDate, appointmentTime, address, isInOffice, confirmed }) {
    return (
        <div className={style.appointment}>
            <h4>Número de cita: {idAppointment}</h4>
            <p>{email}</p>
            <p>{appointmentDate} {appointmentTime}</p>
            <p>{address}</p>

            <div className="flex align-center justify-center gap-4">
                <p>{isInOffice ? "En la oficina" : "Afuera"}</p>
                <p>{confirmed ? "Confirmado" : "No Confirmado"}</p>
            </div>
        </div>
    )
}
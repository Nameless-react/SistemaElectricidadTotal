"use server"
import Appointment from "/components/appointment/Appointment";
import { getAppointmentsAction } from "/functions/fetches/appointments/appointmentActions";
import style from "/css/appointmentsPage.module.css"

export default async function AdministrarCitas() {
    const appointments = await getAppointmentsAction();

    return (
        <div className={style.appointmentsContainer}>
            {appointments.map((appointment, index) => (
                <Appointment key={index} {...appointment}/>
            ))}
        </div>
    )
}
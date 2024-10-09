import { getAppointmentAction } from "/functions/fetches/appointments/appointmentActions";
import AppointmentForm from "/components/appointment/AppointmentForm";


export default async function Appointments({ params }) {
    let appointment;
    const { id } = params;
    if (parseInt(id)) appointment = await getAppointmentAction(parseInt(id));

    return (
        <AppointmentForm appointment={appointment}/>
    )
}
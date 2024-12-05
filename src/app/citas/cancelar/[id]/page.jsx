import CancelAppointment from "/components/appointment/CancelAppointment";
import { getAppointmentAction } from "../../../../../functions/fetches/appointments/appointmentActions";
import { format, parse } from "@formkit/tempo";


export default async function Cancelar({ params }) {
    let appointment;
    const { id } = await params;
    if (parseInt(id)) appointment = await getAppointmentAction(parseInt(id));


    const time = parse({
        date: appointment.appointmentTime,
        format: "HH:mm"
    })

    const timeFormat = format({
        date: time,
        format: "HH:mm",
        tz: "America/Costa_Rica"
    })

    appointment = { ...appointment, appointmentTime: timeFormat }
    
    return (
        <CancelAppointment appointment={appointment} />
    );
}

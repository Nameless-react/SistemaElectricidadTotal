import config from "/config/config";
import { parse, format } from "@formkit/tempo"

export default function VerificationAppointment({ appointmentDate, appointmentTime, token, idAppointment }) {
    const confirmationUrl = `http://${config.host}:3000/api/appointments/confirm?token=${token}`;
    const cancellationUrl = `http://${config.host}:3000/citas/cancelar/${idAppointment}`;
    const editUrl = `http://${config.host}:3000/citas/editar/${idAppointment}`;

    const appointmentDateFormatted = format(appointmentDate, "full")
    const appointmentTimeFormatted = format(parse(appointmentTime, "HH:mm"), "HH:mm")


    return (
        <>
            <h1 style={{ fontSize: '24px', color: '#333', marginBottom: '20px' }}>Confirmación de su Cita</h1>
            <p style={{ fontSize: '14px', color: '#555' }}>Estimado/a cliente,</p>
            <p style={{ fontSize: '14px', color: '#555', marginBottom: '20px' }}>
                Le agradecemos por elegir nuestros servicios. Su cita ha sido programada para el <strong>{appointmentDateFormatted}</strong> a las <strong>{appointmentTimeFormatted}</strong>.
            </p>
            <p style={{ fontSize: '14px', color: '#555' }}>Para confirmar su asistencia, por favor haga clic en el siguiente enlace:
                <a style={{
                        padding: '.8em 2em',
                        fontSize: '.8rem',
                        fontWeight: 'bold',
                        backgroundColor: '#15803d',
                        borderRadius: '5px',
                        textDecoration: 'none',
                        color: '#ffffff',
                    }} href={confirmationUrl}>
                        Confirmar mi cita
                </a>
            </p>
                
            <p style={{ fontSize: '14px', color: '#555', marginBottom: '20px' }}>
                Si desea editar su cita, puede hacerlo haciendo clic en el siguiente enlace: 
                <a style={{
                    padding: '.8em 2em',
                    fontSize: '.8rem',
                    fontWeight: 'bold',
                    backgroundColor: '#235BD7',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    color: '#ffffff',
                    marginLeft: '10px'
                }} href={editUrl}>
                    Editar mi cita
                </a>
            </p>
            <p style={{ fontSize: '14px', color: '#555', marginBottom: '20px' }}>
                Si no puede asistir, le agradecemos que nos lo informe a la mayor brevedad posible, haciendo clic en el siguiente enlace:
                <a style={{
                    padding: '.8em 2em',
                    fontSize: '.8rem',
                    fontWeight: 'bold',
                    backgroundColor: '#FF4500',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    color: '#ffffff',
                    marginLeft: '10px'
                }} href={cancellationUrl}>
                    Cancelar mi cita
                </a>
            </p>
            <p style={{ fontSize: '14px', color: '#555', marginBottom: '20px' }}>
                Gracias por confiar en nosotros. Quedamos a su disposición para cualquier duda o consulta.
            </p>
            <p style={{ fontSize: '14px', color: '#555' }}>Atentamente,</p>
            <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Equipo de Soporte</p>
        </>
    );                             
}
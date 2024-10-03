import config from "/config/config";

export default function VerificationAppointment({ appointmentDate, appointmentTime, token, idAppointment }) {
    const confirmationUrl = `http://${config.host}:3000/api/citas/confirmar?token=${token}`;
    const cancellationUrl = `http://${config.host}:3000/citas/cancelar/${idAppointment}`;
    const editUrl = `http://${config.host}:3000/citas/editar/${idAppointment}`;


    return (
        <>
            <h1>Confirmación de su Cita</h1>
            <p>Estimado/a cliente,</p>
            <p>Le agradecemos por elegir nuestros servicios. Su cita ha sido programada para el <strong>{appointmentDate}</strong> a las <strong>{appointmentTime}</strong>.</p>
            <p>Para confirmar su asistencia, por favor haga clic en el siguiente enlace:</p>
            <p>
                <a href={confirmationUrl}>Confirmar mi cita</a>
            </p>
            <p>Si desea editar su cita lo puede hacer haciendo clic en el siguiente enlace: <a href={editUrl}>Editar mi cita</a></p>
            <p>Si no puede asistir, le agradecemos que nos lo informe a la mayor brevedad posible, dando clic en el siguiente enlace:  <a href={cancellationUrl}>Cancelar mi cita</a></p>
            <p>Gracias por confiar en nosotros. Quedamos a su disposición para cualquier duda o consulta.</p>
            <p>Atentamente,</p>
            <p><strong>Equipo de Soporte</strong></p>
        </>
    );
}

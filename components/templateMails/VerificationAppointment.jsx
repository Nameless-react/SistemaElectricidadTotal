import config from "/config/config";

export default function VerificationAppointment({ appointmentDate, appointmentTime, token, idAppointment }) {
    const confirmationUrl = `http://${config.host}:3000/api/citas/confirmar-cita?token=${token}`;
    const cancellationUrl = `http://${config.host}:3000/api/citas/${idAppointment}`;



    return (
        <>
            <h1>Confirmación de su Cita</h1>
            <p>Estimado/a cliente,</p>
            <p>Le agradecemos por elegir nuestros servicios. Su cita ha sido programada para el <strong>{appointmentDate}</strong> a las <strong>{appointmentTime}</strong>.</p>
            <p>Para confirmar su asistencia, por favor haga clic en el siguiente enlace:</p>
            <p>
                <a href={confirmationUrl}>Confirmar mi cita</a>
            </p>
            <p>
                <button onClick={handleCancelAppointment}>Cancelar mi cita</button>
            </p>
            <p>Si no puede asistir, le agradecemos que nos lo informe a la mayor brevedad posible respondiendo a este correo o contactándonos a través de nuestros canales de atención.</p>
            <p>Gracias por confiar en nosotros. Quedamos a su disposición para cualquier duda o consulta.</p>
            <p>Atentamente,</p>
            <p><strong>Equipo de Soporte</strong></p>
        </>
    );
}

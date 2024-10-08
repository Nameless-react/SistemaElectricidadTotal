import React from 'react';

const AppointmentReminderEmail = ({ appointmentDate, appointmentTime, clientName, serviceType, appointmentLink }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.5', color: '#333' }}>
      <table
        width="100%"
        cellPadding="0"
        cellSpacing="0"
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '5px'
        }}
      >
        <tr>
          <td style={{ textAlign: 'center', paddingBottom: '20px' }}>
            <h1 style={{ color: '#004085' }}>Recordatorio de Cita</h1>
          </td>
        </tr>
        <tr>
          <td>
            <p>Estimado/a {clientName},</p>
            <p>
              Este es un recordatorio de su próxima cita
            </p>
            <p>
              <strong>Fecha:</strong> {appointmentDate}
              <br />
              <strong>Hora:</strong> {appointmentTime}
            </p>
            
            <p>
              Si tiene alguna duda o necesita reprogramar su cita, no dude en ponerse en contacto con nosotros.
            </p>
            <p>Gracias,</p>
            <p>El equipo de Electricidad Total</p>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid #ddd' }}>
            <p style={{ fontSize: '12px', color: '#888888' }}>
              Este es un correo automático. Por favor, no responda a este mensaje.
            </p>
            <p style={{ fontSize: '12px', color: '#888888' }}>Electricidad Total | contacto@electricidadtotal.com</p>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default AppointmentReminderEmail;

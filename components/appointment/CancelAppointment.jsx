"use client"
import Link from "next/link";
import styles from "/css/cancelAppointment.module.css"
import { useState } from "react";
import { cancelAppointmentAction } from "../../functions/fetches/appointments/appointmentActions";
import { useRouter } from "next/navigation";

export default function CancelAppointment({ appointment }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    

    const handleCanceling = async () => {
        setError(null)
        setLoading(true)
        try {
            const response = await cancelAppointmentAction();

            router.push("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.cancelContainer}>
            <h1>Cancelar cita</h1>
            <h3>¿Desea cancelar su cita para el día {appointment.appointmentDate} a las {appointment.appointmentTime}?</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className={styles.buttonsCancel}>
                <button onClick={handleCanceling} disabled={loading}>
                    {loading ? "Cargando..." : "Confirmar"}
                </button>
                <Link href="/">Cancelar</Link>
            </div>
        </div>   
    );
}
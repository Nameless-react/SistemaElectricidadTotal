"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "/css/appointment.module.css"
import { format, parse } from "@formkit/tempo"

export default function Cancelar({ params }) {
    const router = useRouter();
    const { id } = params;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dateTime, setDateTime] = useState({
        appointmentDate: "",
        appointmentTime: ""
    })

    useEffect(() => {
        const getAppointment = async () => {
            try {
                const response = await fetch(`/api/appointments/${id}`);
                const appointment = await response.json();
                setDateTime({
                    appointmentDate: format(appointment.appointmentDate, "full"),
                    appointmentTime: format({
                        date: parse(appointment.appointmentTime, "HH:mm"),
                        format: { time: "short" }
                    })
                })
            } catch (error) {
                //Add logic to call a notification to show the error
                console.error(error)
            }
        }

        if (id) getAppointment();
    }, [])


    const handleCanceling = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/appointments/${id}`, {
                method: "DELETE"
            });

            // Use or create personalized error
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);

            const result = await response.json();

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
            <h3>¿Desea cancelar su cita para el día {dateTime.appointmentDate} a las {dateTime.appointmentTime}?</h3>
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

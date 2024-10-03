"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Cancelar({ params }) {
    const router = useRouter();
    const { id } = params;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCanceling = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/citas/${id}`, {
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
        <div>
            <h1>¿Desea cancelar la cita para el día [fecha] a la hora [hora]?</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleCanceling} disabled={loading}>
                {loading ? "Cargando..." : "Confirmar"}
            </button>
            <Link href="/">Cancelar</Link>
        </div>   
    );
}

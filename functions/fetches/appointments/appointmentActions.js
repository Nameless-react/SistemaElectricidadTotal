"use server";
import config from "/config/config";

export const getAppointmentAction = async (id) => {
    const response = await fetch(`http://${config.host}:3000/api/appointments/${id}`);
    const result = await response.json();
    return result;
}

export const getAppointmentsAction = async () => {
    const response = await fetch(`http://${config.host}:3000/api/appointments/`);
    const result = await response.json();
    return result;
}


export const createAppointmentAction = async (appointment) => {
    try {
        const response = await fetch(`http://${config.host}:3000/api/appointments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(appointment)
        });



        const result = await response.json();
        if (result.error) return {errors: result.error}

        return { successMessage: "Cita agendada con éxito", data: {} }
    } catch (e) {
        return { errors: e }
    }
}

export const updateAppointmentAction = async (appointment) => {
    try {
        const response = await fetch(`http://${config.host}:3000/api/appointments/${appointment.idAppointment}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(appointment)
        });


        const result = await response.json();
        if (result.error) return {errors: result.error}

        return { successMessage: "Cita editada con éxito", data: {} }
    } catch (e) {
        return { errors: e }
    }
}

export const cancelAppointmentAction = async (appointment) => {
    try {
        const response = await fetch(`http://${config.host}:3000/api/appointments/${appointment.idAppointment}`, {
            method: "DELETE"
        });


        const result = await response.json();
        return { successMessage: "Su cita ha sido cancelada con éxito", data: {} }
    } catch (e) {
        return { errors: e }
    }
}
"use server";
import config from "/config/config";
import { validateAppointment } from "../../validations/appointmentValidation";
import convertedZodErrors from "/errors/convertedZodErrors";


export const getAppointmentAction = async (id) => {
    const response = await fetch(`http://${config.host}:3000/api/appointments/${id}`);
    const result = await response.json();
    return result;
}


export const createAppointmentAction = async (appointment) => {
    // const rawAppointment = {
    //     email: formData.get("email"),
    //     appointmentDate: formData.get("appointmentDate"),
    //     appointmentTime: formData.get("appointmentTime"),
    //     address: formData.get("address"),
    //     isInOffice: formData.get("isInOffice") === "on"
    // }
    
    const validatedAppointment = validateAppointment(appointment);
    console.log(validateAppointment.data)
    if (validatedAppointment.error) {
        const errors = convertedZodErrors(validatedAppointment.error);
        return { errors };
    }

    return { successMessage: "Todo salio bien", data: {} }

    // const response = await fetch(`http://${config.host}:3000/api/appointments`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(validatedAppointment.data)
    // })
    // return await response.json();
}

export const updateAppointmentAction = async (formData) => {
    console.log(formData)
    // const appointment = {
    //     appointmentDate: formData.get("appointmentDate"),
    //     appointmentTime: formData.get("appointmentTime"),
    //     address: formData.get("address"),
    //     isInOffice: formData.get("isInOffice") === "on"
    // }

    // const response = await fetch(`/api/appointments/${formData.id}`, {
    //     method: "PATCH",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(appointment)
    // })
    // return await response.json();
}
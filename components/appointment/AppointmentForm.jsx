"use client";
import DateAppointment from "/components/appointment/DateAppointment";
import { Input, Textarea } from "@nextui-org/input"
import { useForm } from "react-hook-form";
import { validateAppointmentClientSide, validateAppointmentParialClientSide } from "../../functions/validations/appointmentValidation";
import { zodResolver } from "@hookform/resolvers/zod"
import { getDateTimeForms } from "../../functions/others/dateTime";
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { updateAppointmentAction, createAppointmentAction } from "../../functions/fetches/appointments/appointmentActions";

export default function AppointmentForm({ appointment }) {
    const inputBackground = {
        inputWrapper: "bg-[#1f2c47]"
    }
    const { date, time } = getDateTimeForms(appointment?.appointmentDate, appointment?.appointmentTime);

    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting }, watch, unregister, getValues, clearErrors } = useForm({
        resolver: zodResolver(appointment?.email ? validateAppointmentParialClientSide : validateAppointmentClientSide),
        defaultValues: {
            email: appointment?.email || "",
            appointmentDate: date,
            appointmentTime: time,
            address: appointment?.address || "",
            isInOffice: appointment?.isInOffice || false
        },
        mode: "onBlur"
    })
    const isInOfficeWatch = watch("isInOffice")

    useEffect(() => {
        if (appointment?.email) unregister("email");


        if (isInOfficeWatch) {
            clearErrors("address");
            unregister("address");
        } 
        else {
            register("address");
        } 
    }, [register, unregister, isInOfficeWatch]);


    const onSubmit = async (appointmentFormData) => {
        const response = appointment?.email ?
            updateAppointmentAction({ ...appointmentFormData, email: appointment.email, idAppointment: appointment.idAppointment })
            : createAppointmentAction(appointmentFormData);

        const { successMessage } = await response;
        if (successMessage) {
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center gap-10 items-center flex-col w-2/3 mx-auto mt-28 rounded-2xl bg-opacity-40 py-12 px-8 mb-44 bg-[#182237]">
            <h1 className="text-5xl font-bold">{appointment?.email ? "Editar Cita" : "Agendar Cita"}</h1>
            {/* Implementation to show the email when the user is not login */}
            {!appointment?.email && <Input isClearable type="email" label="Correo" className="dark w-2/3" classNames={inputBackground} {...register("email")} isInvalid={errors?.email} errorMessage={errors?.email?.message} />}
            <DateAppointment errors={errors} control={control} />
            {!isInOfficeWatch && <Textarea label="Dirección" className="dark w-2/3" classNames={inputBackground} {...register("address")} isInvalid={errors?.address} errorMessage={errors?.address?.message} />}
            <div className="flex items-center mt-4">
                <p className="text-sm">¿Desea agendar la cita en las oficinas de Electricidad Total?</p>
                <input type="checkbox" className="dark ml-2 h-4 w-4" {...register("isInOffice")} />
            </div>

            <Button size="lg" className="bg-green-700 hover:bg-green-800 transition duration-300 text-xl ease-in-out text-white font-bold py-4 h-16 px-8 rounded-2xl mt-8" type="submit">
                {isSubmitting ? "Enviando..." : "Confirmar Cita"}
                <FontAwesomeIcon className="text-xl" icon={faCircleCheck} />
            </Button>
        </form>
    )
}
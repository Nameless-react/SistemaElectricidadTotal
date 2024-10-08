"use client";
import DateAppointment from "/components/appointment/DateAppointment";
import { Input, Textarea } from "@nextui-org/input"
import { createAppointmentAction } from "/functions/fetches/appointments/appointmentActions";
import { useForm } from "react-hook-form";
import { validateAppointmentClientSide } from "../../functions/validations/appointmentValidation";
import { zodResolver } from "@hookform/resolvers/zod"
import getDateTimeForms from "../../functions/others/dateTime";
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export default function AppointmentForm({ appointment }) {
    const { date, time } = getDateTimeForms(appointment?.appointmentDate, appointment?.appointmentTime);

    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting }, getValues, watch, unregister } = useForm({
        resolver: zodResolver(validateAppointmentClientSide),
        defaultValues: {
            email: "",
            appointmentDate: date,
            appointmentTime: time,
            address: "",
            isInOffice: false
        },
        mode: "onBlur"
    })
    const isInOfficeWatch = watch("isInOffice")

    useEffect(() => {
        if (isInOfficeWatch) register("isInOffice");
        else unregister("isInOffice");
      }, [register, unregister, isInOfficeWatch]);


    const onSubmit = async (appointment) => {
        console.log(appointment)
        const { successMessage } = await createAppointmentAction(appointment);
        if (successMessage) {
            console.log("Todo bien")
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center gap-10 items-center flex-col w-2/3 mx-auto mt-28 rounded-2xl bg-opacity-40 py-12 px-8 mb-44 bg-neutral-950">
            <h1 className="text-5xl font-bold">{appointment?.id ? "Editar Cita" : "Agendar Cita"}</h1>
            {/* Implementation to show the email when the user is not login */}
            {!appointment?.id && <Input isClearable type="email" label="Correo" className="dark w-2/3" {...register("email")} isInvalid={errors?.email} errorMessage={errors?.email?.message} />}
            <DateAppointment errors={errors} control={control} />
            {/* Move this to a component to manage a state to hide or show the address */}
            {!getValues().isInOffice && <Textarea label="Dirección" className="dark w-2/3"{...register("address")} isInvalid={errors?.address} errorMessage={errors?.address?.message}/>}
            <div className="flex items-center mt-4">
                <p className="text-sm">¿Desea agendar la cita en las oficinas de Electricidad Total?</p>
                <input type="checkbox" className="dark ml-2 h-4 w-4" {...register("isInOffice")}/>
            </div>

            <Button 
                size="lg"
                className="bg-green-700 hover:bg-green-800 transition duration-300 text-xl ease-in-out text-white font-bold py-4 h-16 px-8 rounded-2xl mt-8"
                type="submit">
                    {isSubmitting ? "Enviando..." : "Confirmar Cita"}
                    <FontAwesomeIcon className="text-xl" icon={faCircleCheck} />
            </Button>
        </form>
    )
}
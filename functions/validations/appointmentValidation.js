import { z } from "zod";
import { format, isAfter, isEqual } from "@formkit/tempo"
import { parseDate } from "@internationalized/date";

export const appointmentValidations = z.object({
    idAppointment: z.number({
        invalid_type_error: "El id de la cita tiene que ser un número"
    }).positive({
        message: "El número tiene que ser mayor a 0"
    }),
    email: z.string({
        invalid_type_error: "El correo tiene que se un texto",
        required_error: "El correo es necesario para agendar la cita"
    }).email({
        message: "Dirección de correo invalida"
    }),
    assignEmployee: z.number({
        invalid_type_error: "El id del empleado asignado tiene que ser un número"
    }).positive({
        message: "El id del empleado tien que ser un número positivo"
    }).or(z.null()),
    isInOffice: z.boolean({
        invalid_type_error: "El valor donde específica si es en las oficinas tiene que ser verdadero o falso",
        required_error: "El valor de si la cita es en las oficinas es requerido para agendar una cita"
    }),
    address: z.string({
        invalid_type_error: "La dirección tiene que ser un texto",
        required_error: "La dirección es necesaria para agendar una cita"
    }),
    appointmentDate: z.preprocess(
        value => value.toString(),
        z.string({
            invalid_type_error: "La fecha de la cita tiene que ser valida",
            required_error: "El campo de la fecha es necesario"
        }).date({
            message: "La fecha no es valida"
        }).refine(value => {
            const currentDate = format(new Date(), "YYYY-MM-DD");
            return (isAfter(value, currentDate) || isEqual(value, currentDate)); 
        }, {
            message: "La fecha tiene que ser de igual o posterior a la fecha actual"
        })
    ),
    appointmentTime: z.preprocess(
        value => value.toString(),
        z.string({
            invalid_type_error: "La hora tiene que ser escrita en formato de texto hh:mm",
            required_error: "El campo de la hora es necesario"
        }).time({
            message: "Hora invalida"
        })
    )
})





export const validateAppointment = (object) =>  (
    appointmentValidations
        .omit({ idAppointment: true, assignEmployee: true })
        .refine(modelValidation => !(modelValidation.address.length < 5 && !modelValidation.isInOffice),
        {
            message: "La dirección tiene que ser mayor a 5 palabras en caso de no ser una cita en las oficinas",
            path: ["address"]
        })
        .safeParse(object)
    )


export const validateAppointmentClientSide =  appointmentValidations
        .omit({ idAppointment: true, assignEmployee: true })
        .refine(modelValidation => !(modelValidation.address.length < 5 && !modelValidation.isInOffice),
        {
            message: "La dirección tiene que ser mayor a 5 palabras en caso de no ser una cita en las oficinas",
            path: ["address"]
        })



export const validatePartialAppointment = (object) =>  (
    appointmentValidations
        .partial()
        .refine(modelValidation => !(modelValidation.address.length < 5 && !modelValidation.isInOffice),
        {
            message: "La dirección tiene que ser mayor a 5 palabras en caso de no ser una cita en las oficinas",
            path: ["address"]
        })
        .safeParse(object)
    )
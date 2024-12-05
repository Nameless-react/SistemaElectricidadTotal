import { z } from "zod";


export const notificationValidations = z.object({
    idNotifications: z.coerce.number({
        invalid_type_error: "El id de las notificaciones tiene que ser un número"
    }).positive({
        message: "El número del id tiene que ser mayor a 0"
    }),
    typeNotification: z.string({
        invalid_type_error: "El tipo de notificación tiene que ser un texto",
        required_error: "El tipo de notificación es necesario para enviarlo"
    }),
    idUsers: z.coerce.number({
        invalid_type_error: "El id del usuario tiene que ser un número"
    }).positive({
        message: "El id del usuario tiene que ser un número positivo"
    }),
    shippingDateTime: z.string({
        invalid_type_error: "La fecha de entrega tiene que ser una fecha con día y hora",
        required_error: "La fecha de entrega es necesaria"
    }).datetime({
        invalid_type_error: "No está en el formato correcto la fecha y la hora"
    }),
    isRead: z.boolean({
        invalid_type_error: "Tiene que ser verdadero o falso"
    }),
    title: z.string({
        invalid_type_error: "El título tiene que ser un texto"
    })
})



export const validateNotification = (object) =>  notificationValidations.omit({ idNotifications: true }).safeParse(object)
export const validatePartiaNotification = (object) =>  notificationValidations.partial().safeParse(object)
export const validateIdNotification = (object) => notificationValidations.pick({ idNotifications: true }).safeParse(object);
export const validateIdUser = (object) => notificationValidations.pick({ idUsers: true }).safeParse(object);





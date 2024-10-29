import { z } from "zod";

export const messageValidations = z.object({
    idMessages: z.coerce.number({
        invalid_type_error: "El id de los mensajes tiene que ser un número"
    }).positive({
        message: "El número del id tiene que ser mayor a 0"
    }),
    message: z.string({
        invalid_type_error: "El mensaje tiene que ser un texto",
        required_error: "El mensaje es necesario para enviarlo"
    }),
    idUserAuthor: z.number({
        invalid_type_error: "El id del usuario tiene que ser un número"
    }).positive({
        message: "El id del usuario tiene que ser un número positivo"
    }).or(z.null()),
    idConversation: z.coerce.number({
        invalid_type_error: "El número del id de la conversación tiene que ser un número",
        required_error: "El número del id de la conversación es necesario"
    }).positive({
        message: "El número del id tiene que ser mayor a 0"
    }),
    email: z.string({
        invalid_type_error: "El correo tiene que ser un texto"
    }).email({
         message: "Dirección de correo invalida"
    }),
    name: z.string({
        invalid_type_error: "El nombre tiene que ser un texto"
    }),
    image: z.string({
        invalid_type_error: "La imagen tiene que ser un texto"
    }).url()
})



export const validateMessage = (object) =>  messageValidations.omit({ idMessages: true }).safeParse(object)
export const validatePartiaMessage = (object) =>  messageValidations.partial().safeParse(object)
export const validateIdMessage = (object) => messageValidations.pick({ idMessages: true }).safeParse(object);
export const validateIdConversation = (object) => messageValidations.pick({ idConversation: true }).safeParse(object);
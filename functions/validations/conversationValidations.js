import { z } from "zod";

export const conversationValidations = z.object({
    idConversation: z.coerce.number({
        invalid_type_error: "El id de las conversaciones tiene que ser un número"
    }).positive({
        message: "El número del id tiene que ser mayor a 0"
    }),
    name: z.string({
        invalid_type_error: "El nombre tiene que ser un texto",
        required_error: "El nombre es necesario para enviarlo"
    })   
})


export const validateConversation = (object) =>  conversationValidations.omit({ idConversation: true }).safeParse(object)
export const validatePartiaConversation = (object) =>  conversationValidations.partial().safeParse(object)
export const validateIdConversation = (object) => conversationValidations.pick({ idConversation: true }).safeParse(object)
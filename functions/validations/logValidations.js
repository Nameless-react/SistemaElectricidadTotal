import { z } from "zod";

export const logValidations = z.object({
    idLog: z.coerce.number({
        invalid_type_error: "El id debe ser un numero"
    }).positive({
        message: "El número del id tiene que ser mayor a 0"
    }),
    table_name: z.string({
        invalid_type_error: "El nombre de la tabla tiene que ser un texto",
    }),
    action: z.string({
        invalid_type_error: "La accion tiene que ser un texto"
    }),
    action_date_time: z.string({
        invalid_type_error: "",
    })
    .date({
        invalid_type_error: "La fecha tien que estar en un formato valido DD/MM/AAAA"
    })
    .optional()
   
})

export const validateLog = (object) =>  logValidations.omit({ idLog: true }).safeParse(object)
export const validatePartialLog = (object) =>  logValidations.partial().safeParse(object)
export const validateIdLog = (object) => logValidations.pick({ idLog: true }).safeParse(object);

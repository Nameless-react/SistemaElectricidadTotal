import { z } from "zod";

export const employeeValidations = z.object({
    idEmployees: z.coerce.number({
        invalid_type_error: "El id de los empleados tiene que ser un número"
    }).positive({
        message: "El número del id tiene que ser mayor a 0"
    }),
    job: z.string({
        invalid_type_error: "El puesto de trabajo tiene que ser un texto",
        required_error: "El puesto de trabajo es necesario crear un empleado"
    }),
    email: z.string({
        invalid_type_error: "El correo tiene que ser un texto"
    }).email({
         message: "Dirección de correo invalida"
    }),
    joinAt: z.string({
        invalid_type_error: "La Fecha tiene que ser en un formato de texto valido"
        
    })
    .date({
        invalid_type_error: "La fecha tien que estar en un formato valido DD/MM/AAAA"
    })
    .optional()
})



export const validateEmployee = (object) =>  employeeValidations.omit({ idEmployees: true }).safeParse(object)
export const validatePartialEmployee = (object) =>  employeeValidations.partial().safeParse(object)
export const validateIdEmployee = (object) => employeeValidations.pick({ idEmployees: true }).safeParse(object);

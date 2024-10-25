import { z } from "zod";
import { format, isAfter } from "@formkit/tempo"


export const taskValidations = z.object({
    idTasks: z.coerce.number({
        invalid_type_error: "El id de las tareas tiene que ser un número"
    }).positive({
        message: "El número del id  de las tareas tiene que ser mayor a 0"
    }),
    title: z.string({
        invalid_type_error: "El título de la tarea tiene que ser un texto",
        required_error: "El título es necesario para la tarea"
    }),
    deadline: z.string({
        invalid_type_error: "El tiempo límite para hacer la tarea tiene que ser un texto"
    }).datetime({
        message: "El formato de la fecha y la hora no es valido"
    }).refine(value => {
        const currentDate = format(new Date(), "YYYY-MM-DD HH:mm");
        return (isAfter(value, currentDate) || isEqual(value, currentDate)); 
    }, {
        message: "La fecha y hora tiene que ser de igual o posterior a la fecha y hora actual"
    }),
    idProjects: z.coerce.number({
        invalid_type_error: "El número del id del proyecto tiene que ser un número",
        required_error: "El número del id del proyecto es necesario para una tarea"
    }).positive({
        message: "El id del proyecto tiene que ser un número positivo"
    }),
    idStatus: z.coerce.number({
        invalid_type_error: "El correo tiene que ser un texto"
    }).positive({
        message: "El id de estatus tiene que ser un número positivo"
    })
})



export const validateTask = (object) =>  taskValidations.omit({ idTasks: true }).safeParse(object)
export const validatePartialTask = (object) =>  taskValidations.partial().safeParse(object)
export const validateIdTask = (object) => taskValidations.pick({ idTasks: true }).safeParse(object);
export const validateIdProjects = (object) => taskValidations.pick({ idProjects: true }).safeParse(object);
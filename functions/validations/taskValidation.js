import { z } from "zod";
import { format, isAfter, isEqual } from "@formkit/tempo"


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
    description: z.string({
        invalid_type_error: "La descripción tiene que ser un texto"
    }).min(10, {
        message: "La descripción tiene que ser de más de 10 caracteres"
    }),
    deadline: z.preprocess(
        value => value.toString(),
        z.string({
            invalid_type_error: "El tiempo límite para hacer la tarea tiene que ser un texto"
        }).date({
            message: "El formato de la fecha no es valido"
        }).refine(value => {
            const currentDate = format(new Date(), "YYYY-MM-DD");
            return (isAfter(value, currentDate) || isEqual(value, currentDate)); 
        }, {
            message: "La fecha y hora tiene que ser de igual o posterior a la fecha y hora actual"
        })
    ),
    idProjects: z.coerce.number({
        invalid_type_error: "El número del id del proyecto tiene que ser un número",
        required_error: "El número del id del proyecto es necesario para una tarea"
    }).positive({
        message: "El id del proyecto tiene que ser un número positivo"
    }),
    idStatus: z.preprocess(
        value => value instanceof Set ?  [...value][0] : value,
        z.coerce.number({
        invalid_type_error: "El estado tiene que ser un número",
    }).positive({
        message: "El número tiene que ser mayor a 0"
    })),
    employees: z.set(
        z.coerce.number({
            invalid_type_error: "El id del empleado tiene que ser un número"
        }).positive({
            message: "El id de los empleados tiene que ser mayor a 0"
        })
    )
})



export const validateTask = (object) =>  taskValidations.omit({ idTasks: true }).safeParse(object)
export const validatePartialTask = (object) =>  taskValidations.partial().safeParse(object)
export const validateIdTask = (object) => taskValidations.pick({ idTasks: true }).safeParse(object);
export const validateIdProjects = (object) => taskValidations.pick({ idProjects: true }).safeParse(object);

export const validateTaskClient = taskValidations.omit({ idTasks: true });
export const validatePartialTaskClient = taskValidations.omit({ idTasks: true }).partial();
export const validateTaskEmployees = taskValidations.pick({ employees: true });
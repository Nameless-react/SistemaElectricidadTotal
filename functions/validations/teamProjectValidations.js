import { z } from "zod";



export const teamProjectValidation = z.object({
    idTeamProject: z.coerce.number({
        invalid_type_error: "El id del equipo del proyecto tiene que ser un número"
    }).positive({
        message: "El número del id del equipo del proyecto tiene que ser mayor a 0"
    }),
    name: z.string({
        invalid_type_error: "El nombre del equipo del proyecto tiene que ser un texto",
        required_error: "El nombre del equipo del proyecto es necesario"
    }),
    idProjects: z.coerce.number({
        invalid_type_error: "El número del id del proyecto tiene que ser un número",
        required_error: "El número del id del proyecto es necesario para una tarea"
    }).positive({
        message: "El id del proyecto tiene que ser un número positivo"
    }),
    
    employees: z.set(
        z.coerce.number({
            invalid_type_error: "El id del empleado tiene que ser un número"
        }).positive({
            message: "El id de los empleados tiene que ser mayor a 0"
        })
    )
})



export const validateTeamProject = (object) =>  teamProjectValidation.omit({ idTeamProject: true }).safeParse(object)
export const validatePartialTeamProject = (object) =>  teamProjectValidation.partial().safeParse(object)
export const validateIdTeamProject = (object) => teamProjectValidation.pick({ idTeamProject: true }).safeParse(object);
export const validateIdProjects = (object) => teamProjectValidation.pick({ idProjects: true }).safeParse(object);

export const validateTeamProjectClient = teamProjectValidation.omit({ name: true, idProjects: true });
export const validateidTeamProjectEmployees = teamProjectValidation.pick({ employees: true });
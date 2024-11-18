import { z } from "zod";



export const teamProjectValidation = z.object({
    idTeamProject: z.coerce.number({
        invalid_type_error: "El id del equipo del proyecto tiene que ser un número"
    }).positive({
        message: "El número del id del equipo del proyecto tiene que ser mayor a 0"
    }),
    idTeamProjectEmployee: z.coerce.number({
        invalid_type_error: "El id del empleado en el equipo del proyecto tiene que ser un número"
    }).positive({
        message: "El número del id del equipo empleado en el equipo del proyecto tiene que ser mayor a 0"
    }),
    name: z.string({
        invalid_type_error: "El nombre del equipo del proyecto tiene que ser un texto",
        required_error: "El nombre del equipo del proyecto es necesario"
    }),
    idProjects: z.coerce.number({
        invalid_type_error: "El número del id del proyecto tiene que ser un número",
        required_error: "El número del id del proyecto es necesario"
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



export const validateTeamProject = (object) =>  teamProjectValidation.omit({ idTeamProject: true, idTeamProjectEmployee: true, idProjects: true }).safeParse(object)
export const validatePartialTeamProject = (object) =>  teamProjectValidation.partial().safeParse(object)
export const validateIdTeamProject = (object) => teamProjectValidation.pick({ idTeamProject: true }).safeParse(object);
export const validateIdTeamProjectEmployee = (object) => teamProjectValidation.pick({ idTeamProjectEmployee: true }).safeParse(object);


export const validateTeamProjectClient = teamProjectValidation.omit({ name: true, idProjects: true, idTeamProjectEmployee: true });
export const validateNewTeamProjectClient = teamProjectValidation.omit({ idTeamProjectEmployee: true, idProjects: true, idTeamProject: true }).partial({ employees: true });
import { z } from "zod";

export const projectValidations = z.object({
    idProjects: z.coerce.number({
        invalid_type_error: "El id del proyecto tiene que ser un número"
    }).positive({
        message: "El número tiene que ser mayor a 0"
    }),
    idStatus: z.preprocess(
        value => value instanceof Set ?  [...value][0] : value,
        z.coerce.number({
        invalid_type_error: "El estado tiene que ser un número",
    }).positive({
        message: "El número tiene que ser mayor a 0"
    })),
    description: z.string({
        invalid_type_error: "La descripción tiene que ser un texto",
        required_error: "La descripción es necesaria para un proyecto"
    }),
    name: z.string({
        invalid_type_error: " El nombre del proyecto tiene que ser un texto",
        required_error: "El nombre del proyecto es necesario para un proyecto"
    }),
    images: z.string({
        invalid_type_error: "El url de la imagen tiene que ser un texto"
    }).array({
        invalid_type_error: "Tiene que ser una lista"
    })
})


export const validateProject = (object) =>  projectValidations.omit({ idProjects: true }).safeParse(object)
export const validatePartiaProject = (object) =>  projectValidations.partial().safeParse(object);
export const validateIdProject = (object) => projectValidations.pick({ idProjects: true }).safeParse(object);
export const validatePartialProjectClient = projectValidations.omit({ images: true, idProjects: true });
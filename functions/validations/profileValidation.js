import z, { optional } from "zod";


export const validateProfileUpdate = (formData) => {

    const validationSchema = z.object({
        name: z.string()
            .trim()
            .min(3, "El nombre debe tener al menos 3 caracteres")
            .max(255, "El nombre debe tener como máximo 255 caracteres")
            .regex(/^[a-zA-Z\s]+$/, { message: "El nombre solo puede contener letras y espacios" })
            .refine((value) => value !== '', { message: "El nombre es requerido." }),
        firstsurname: z.string()
            .trim()
            .min(3, "El primer apellido debe tener al menos 3 caracteres")
            .max(255, "El primer apellido debe tener como máximo 255 caracteres")
            .regex(/^[a-zA-Z\s]+$/, { message: "El primer apellido solo puede contener letras y espacios" })
            .refine((value) => value !== '', { message: "El primer apellido es requerido." }),
        secondsurname: z.string()
            .trim()
            .min(3, "El segundo apellido debe tener al menos 3 caracteres")
            .max(255, "El segundo apellido debe tener comoickestimo 255 caracteres")
            .regex(/^[a-zA-Z\s]+$/, { message: "El segundo apellido solo puede contener letras y espacios" })
            .refine((value) => value !== '', { message: "El segundo apellido es requerido." }),
        phone: z.string()
            .trim()
            .regex(/^\d{8}$/, { message: "El teléfono debe ser un número de 8 dígitos" })
            .refine((value) => value !== '', { message: "El teléfono es requerido." }),
        address: z.string()
            .trim()
            .max(500, { message: "La dirección debe tener como máximo 500 caracteres" })
            .regex(/^[a-zA-Z\s]*$/, { message: "La dirección solo puede contener letras y espacios" }) // El * permite cadenas vacías
            .optional()
            .transform((val) => val?.trim() === "" ? "Direccion no Disponible" : val)
    });

    const result = validationSchema.safeParse(formData);
    console.log(result);

    if (result.success) {
        return {
            success: true,
            data: result.data
        }
    } else {
        return {
            success: false,
            error: result.error.format()
        }
    }

}
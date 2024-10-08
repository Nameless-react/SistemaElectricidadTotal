import z from "zod";

/**
 * Validates the user registration form.
 *
 * @param {object} formData - Information of the user registration form.
 * @returns {object} - An object with the following structure:
 *  {
 *      success: boolean,
 *      data: object | string
 *  }
 *  - success: indicates if the form was validated correctly.
 *  - data: if success is true, data is the object with the form information.
 *          if success is false, data is the string with the error message.
 */
export const validateUser = (formData) => {
    const validationSchema = z.object({
        name: z.string()
            .trim()
            .min(3, "El nombre debe tener al menos 3 caracteres")
            .max(255, "El nombre debe tener como máximo 255 caracteres")
            .regex(/^[a-zA-Z\s]+$/, { message: "El nombre solo puede contener letras y espacios" })
            .refine((value) => value !== '', { message: "El nombre es requerido." }),
        firstSurName: z.string()
            .trim()
            .min(3, "El primer apellido debe tener al menos 3 caracteres")
            .max(255, "El primer apellido debe tener como máximo 255 caracteres")
            .regex(/^[a-zA-Z\s]+$/, { message: "El primer apellido solo puede contener letras y espacios" })
            .refine((value) => value !== '', { message: "El primer apellido es requerido." }),
        secondSurName: z.string()
            .trim()
            .min(3, "El segundo apellido debe tener al menos 3 caracteres")
            .max(255, "El segundo apellido debe tener como máximo 255 caracteres")
            .regex(/^[a-zA-Z\s]+$/, { message: "El segundo apellido solo puede contener letras y espacios" })
            .refine((value) => value !== '', { message: "El segundo apellido es requerido." }),
        identification: z.string()
            .trim()
            .length(9, "La identificación debe tener exactamente 9 dígitos")
            .regex(/^\d{9}$/, { message: "La identificación debe ser un número de 9 dígitos" })
            .refine((value) => value !== '', { message: "La identificación es requerida." }),
        email: z.string()
            .trim()
            .email("El correo debe ser un correo válido")
            .refine((value) => value !== '', { message: "El correo es requerido." }),
        password: z.string()
            .trim()
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .refine((value) => value !== '', { message: "La contraseña es requerida." }),
        confirmPassword: z.string()
            .trim()
            .min(8, "La confirmación de la contraseña debe tener al menos 8 caracteres")
            .refine((value) => value !== '', { message: "La confirmación de la contraseña es requerida." }),
        number: z.string()
            .trim()
            .length(8, "El teléfono debe tener exactamente 8 dígitos")
            .regex(/^\d{8}$/, { message: "El teléfono debe ser un número de 8 dígitos" })
            .refine((value) => value !== '', { message: "El teléfono es requerido." }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden.",
        path: ["confirmPassword"], 
    });

    const result = validationSchema.safeParse(formData);

    if (result.success) {
        return {
            success: true,
            data: result.data
        };
    } else {
        return {
            success: false,
            error: result.error.format()
        };
    }
};
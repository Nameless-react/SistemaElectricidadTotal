import z from 'zod'

export const validateEmployeeForm = (formData) => {
    const parsedData = {
        ...formData,
        userId: parseInt(formData.userId || 0),
        joinAt: new Date(formData.joinAt).toISOString()
    }

    const validationSchema = z.object({
        job: z.string()
            .trim()
            .min(3, "El puesto debe de tener al menos 3 caracteres ")
            .regex(/^[a-zA-ZÀ-ÿ0-9\s]+$/, { message: "El puesto solo puede contener letras, números, tildes y espacios" })
            .refine((value) => value !== '', { message: "El puesto es requerido" }),
        userId: z.number()
            .refine((value) => !isNaN(value), { message: "El usuario debe ser un número" })
            .refine((value) => value > 0, { message: "Este campo es requerido" }),
        joinAt: z.string()
            .refine((value) => !isNaN(new Date(value).getTime()), {
                message: "La fecha es incorrecta"
            }),
    })

    const result = validationSchema.safeParse(parsedData);
    if (!result.success) {
        return {
            success: false,
            error: result.error.format()
        }
    }
 
    return {
        success: true,
        data: result.data
    }
}
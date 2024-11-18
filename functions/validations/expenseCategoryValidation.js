import { z } from 'zod';

export const validateExpenseCategoryForm = (formData) => {

    const validationSchema = z.object({
        name: z.string()
            .trim()
            .min(3, "El nombre debe tener al menos 3 caracteres")
            .max(100, "El nombre debe tener como máximo 100 caracteres")
            .regex(/^[a-zA-ZÀ-ÿ0-9\s]+$/, { message: "El nombre solo puede contener letras, números, tildes y espacios" })
            .refine((value) => value !== '', { message: "El nombre es requerido." }),
        description: z.string()
            .trim()
            .min(10, "La descripción debe tener al menos 10 caracteres")
            .regex(/^[a-zA-ZÀ-ÿ0-9\s]+$/, { message: "La descripción solo puede contener letras, números, tildes y espacios" })
            .refine((value) => value !== '', { message: "La descripción es requerida." }),
        status: z.string()
            .trim()
            .refine((value) => value !== '', { message: "El estado es requerido." }),
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
}
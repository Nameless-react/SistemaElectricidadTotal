import z from 'zod';

export const validateIncomeForm = (formData) => {
    const parsedData = {
        ...formData,
        user: parseInt(formData.user) || 0,
        project: parseInt(formData.project) || 0,
        amount: parseFloat(formData.amount) || 0,
        category: parseInt(formData.category) || 0,
        date: new Date().toISOString()
    };

    const validationSchema = z.object({
        amount: z.number()
            .max(1000000000, "El monto debe ser menor a 1.000.000.000₡")
            .refine((value) => !isNaN(value), { message: "El monto debe ser un número" })
            .refine((value) => value > 0, { message: "Este campo es requerido" }),
        date: z.string()
            .refine((value) => !isNaN(new Date(value).getTime()), {
                message: "La fecha es incorrecta"
            }),
        description: z.string()
            .trim()
            .min(10, "La descripción debe tener al menos 10 caracteres")
            .regex(/^[a-zA-ZÀ-ÿ0-9\s]+$/, { message: "La descripción solo puede contener letras, números, tildes y espacios" })
            .refine((value) => value !== '', { message: "La descripción es requerida." }),
        status: z.string()
            .trim()
            .refine((value) => value !== '', { message: "El estado es requerido." }),
        paymentMethod: z.string()
            .trim()
            .refine((value) => value !== '', { message: "El método de pago es requerido." }),
        user: z.number()
            .refine((value) => !isNaN(value), { message: "El usuario debe ser un número" })
            .refine((value) => value > 0, { message: "Este campo es requerido" }),
        project: z.number()
            .refine((value) => !isNaN(value), { message: "El proyecto debe ser un número" })
            .refine((value) => value > 0, { message: "Este campo es requerido" }),
        category: z.number()
            .refine((value) => !isNaN(value), { message: "La categoria debe ser un número" })
            .refine((value) => value > 0, { message: "Este campo es requerido" })
    });

    const result = validationSchema.safeParse(parsedData);
    if (!result.success) {
        return {
            success: false,
            error: result.error.format()
        };
    }
    
    return {
        success: true,
        data: result.data
    };
};

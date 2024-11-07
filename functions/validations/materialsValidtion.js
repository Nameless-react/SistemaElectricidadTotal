import { z } from "zod";

export const validateMaterialsForm = (formData) => {
    console.log(formData);
    const parsedData = {
        ...formData,
        cost: parseFloat(formData.cost) || 0,
        stock: parseInt(formData.stock) || 0,
        expiration: new Date(formData.expiration),
        date: new Date(formData.date)
    }

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

        cost: z.number()
            .max(1000000000, "El costo debe ser menor a 1.000.000.000")
            .refine((value) => !isNaN(value), { message: "El costo debe ser un número" })
            .refine((value) => value > 0, { message: "El costo debe ser mayor a 0" }),

        stock: z.number()
            .max(1000000000, "El stock debe ser menor a 1.000.000.000")
            .refine((value) => !isNaN(value), { message: "El stock debe ser un número" })
            .refine((value) => value > 0, { message: "El stock debe ser mayor a 0" }),

        expiration: z.date()
            .refine((value) => !isNaN(value.getTime()), {
                message: "La fecha de expiración es incorrecta"
            }).optional(),
        
        date: z.date()
            .refine((value) => !isNaN(value.getTime()), {
                message: "La fecha de compra es incorrecta"
            }),

        category: z.string()
            .trim()
            .refine((value) => value !== '', { message: "La categoria es requerida." }),
        
        provider: z.string()
            .trim()
            .refine((value) => value !== '', { message: "El proveedor es requerido." }),
        
        status: z.string()
            .trim()
            .refine((value) => value !== '', { message: "El estado es requerido." }),
        
    }).superRefine((data, ctx) => {
        if (data.expiration && data.date && data.expiration < data.date) {
            ctx.addIssue({
                path: ["expiration"],
                message: "La fecha de expiración no puede ser menor que la fecha de compra"
            });
        }
    });

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

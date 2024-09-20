import { z } from "zod";

export const validateFormTools = (formData) => {
    // Crear una nueva estructura de datos con los valores convertidos
    const parsedData = {
        ...formData,
        cost: parseFloat(formData.cost),
        date: new Date(formData.date)
    };

    const validationSchema = z.object({
        name: z.string()
            .trim()
            .nonempty("El nombre es requerido")
            .min(3, "El nombre debe tener al menos 3 caracteres")
            .max(20, "El nombre debe tener como máximo 20 caracteres")
            .regex(/^[a-zA-Z\s]+$/, { message: "El nombre solo puede contener letras y espacios" }),

        model: z.string()
            .trim()
            .nonempty("El modelo es requerido")
            .min(4, "El modelo debe tener al menos 4 caracteres")
            .max(255, "El modelo debe tener como máximo 255 caracteres")
            .regex(/^[a-zA-Z0-9\s]+$/, { message: "El serial solo puede contener letras, números y espacios" }),

        description: z.string()
            .trim()
            .nonempty("La descripción es requerida")
            .min(10, "La descripción debe tener al menos 10 caracteres")
            .max(255, "La descripción debe tener como máximo 255 caracteres")
            .regex(/^[a-zA-Z0-9\s]+$/, { message: "El serial solo puede contener letras, números y espacios" }),

        cost: z.number()
            .nonnegative("El costo debe ser un valor positivo")
            .max(999999999, "El costo debe ser como máximo 9.999.999.999")
            .min(0.01, "El costo debe ser como mínimo 0.01")
            .refine((value) => !isNaN(value), {
                message: "El costo debe ser un número válido",
            }),

        date: z.date()
            .refine((value) => !isNaN(value.getTime()), {
                message: "La fecha debe ser válida",
            }),

        serial: z.string()
            .trim()
            .nonempty("El serial es requerido")
            .min(4, "El serial debe tener al menos 4 caracteres")
            .max(255, "El serial debe tener como máximo 255 caracteres")
            .regex(/^[a-zA-Z0-9\s]+$/, { message: "El serial solo puede contener letras, números y espacios" }),

        status: z.string()
            .nonempty("El estado es requerido"),

        category: z.string()
            .nonempty("La categoría es requerida"),

        provider: z.string()
            .nonempty("El proveedor es requerido"),
    });

    const result = validationSchema.safeParse(parsedData);

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
export const validateFormToolsMaintenance = (formData) => {
    const parsedData = {
        ...formData,
        recoveryDate: new Date(formData.recoveryDate),
        startMaintenanceDate: new Date(formData.startMaintenanceDate),
    };

    const validatonSchema = z.object({
        notes: z.string()
            .trim()
            .nonempty("Las notas de mantenimiento son requeridas")
            .min(10, "Las notas de mantenimiento deben tener al menos 10 caracteres")
            .max(255, "Las notas de mantenimiento deben tener como máximo 255 caracteres")
            .regex(/^[a-zA-Z0-9\s]+$/, { message: "El serial solo puede contener letras, números y espacios" }),

        recoveryDate: z.date()
            .refine((value) => !isNaN(value.getTime()), {
                message: "La fecha de recuperación debe ser válida",
            }),

        startMaintenanceDate: z.date()
            .refine((value) => !isNaN(value.getTime()), {
                message: "La fecha de inicio de mantenimiento debe ser válida",
            }),
    })
    .refine((data) => data.recoveryDate >= data.startMaintenanceDate, {
        message: "La fecha de recuperación no puede ser anterior a la fecha de inicio de mantenimiento",
        path: ['recoveryDate'],
    });

    const result = validatonSchema.safeParse(parsedData);

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
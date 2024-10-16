import { image } from "@nextui-org/theme";
import { z } from "zod";

export const validateFormTools = (formData) => {
    // Crear una nueva estructura de datos con los valores convertidos
    const urlPattern = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    const parsedData = {
        ...formData,
        cost: parseFloat(formData.cost) || 0,
        date: new Date(formData.date)
    };



    const validationSchema = z.object({
        name: z.string()
            .trim()
            .min(3, "El nombre debe tener al menos 3 caracteres")
            .max(255, "El nombre debe tener como máximo 20 caracteres")
            .regex(/^[a-zA-Z\s]+$/, { message: "El nombre solo puede contener letras y espacios" })
            .refine((value) => value !== '', { message: "El nombre es requerido." }),

        model: z.string()
            .trim()
            .min(4, "El modelo debe tener al menos 4 caracteres")
            .max(255, "El modelo debe tener como máximo 255 caracteres")
            .regex(/^[a-zA-Z0-9\s]+$/, { message: "El modelo solo puede contener letras, números y espacios" }),

        description: z.string()
            .trim()
            .min(10, "La descripción debe tener al menos 10 caracteres")
            .max(255, "La descripción debe tener como máximo 255 caracteres")
            .regex(/^[a-zA-Z0-9\s]+$/, { message: "La descripción solo puede contener letras, números y espacios" }),

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
            .min(4, "El serial debe tener al menos 4 caracteres")
            .max(255, "El serial debe tener como máximo 255 caracteres")
            .regex(/^[a-zA-Z0-9\s]+$/, { message: "El serial solo puede contener letras, números y espacios" }),

        status: z.string().min(1, "El estado es requerido"),

        category: z.string().min(1, "La categoría es requerida"),

        provider: z.string().min(1, "El proveedor es requerido"),

        image: z.custom((value) => {
            if (value === null) return false;
            if (value instanceof File) {
                const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
                return validMimeTypes.includes(value.type) && value.size > 0;
            }
            if (typeof value === 'string') {
                return true;
            }
            return false;
        }, {
            message: "La imagen debe ser un archivo JPEG, PNG, GIF, o una cadena de texto.",
        })
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
            .regex(/^[a-zA-Z0-9\s]+$/, { message: "Las notas de mantenimiento solo pueden contener letras, números y espacios" }),

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
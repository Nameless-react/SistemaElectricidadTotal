


class ValidationToolsService {
    constructor(zod) {
        this.zod = zod;
    }

    async validateTool(formData) {
        const parsedData = Object.fromEntries(formData.entries());

        const formattedData = {
            ...parsedData,
            cost: parseFloat(parsedData.cost),
            date: new Date(parsedData.date),
            image: parsedData.image.name
        };

        const validationSchema = this.zod.object({
            name: this.zod.string()
                .trim()
                .nonempty("El nombre es requerido")
                .min(3, "El nombre debe tener al menos 3 caracteres")
                .max(20, "El nombre debe tener como máximo 20 caracteres")
                .regex(/^[a-zA-Z\s]+$/, { message: "El nombre solo puede contener letras y espacios" }),

            model: this.zod.string()
                .trim()
                .nonempty("El modelo es requerido")
                .min(4, "El modelo debe tener al menos 4 caracteres")
                .max(255, "El modelo debe tener como máximo 255 caracteres")
                .regex(/^[a-zA-Z0-9\s]+$/, { message: "El modelo solo puede contener letras, números y espacios" }),

            description: this.zod.string()
                .trim()
                .nonempty("La descripción es requerida")
                .min(10, "La descripción debe tener al menos 10 caracteres")
                .max(255, "La descripción debe tener como máximo 255 caracteres")
                .regex(/^[a-zA-Z0-9\s]+$/, { message: "La descripción solo puede contener letras, números y espacios" }),

            cost: this.zod.number()
                .nonnegative("El costo debe ser un valor positivo")
                .max(999999999, "El costo debe ser como máximo 9.999.999.999")
                .min(0.01, "El costo debe ser como mínimo 0.01")
                .refine((value) => !isNaN(value), {
                    message: "El costo debe ser un número válido",
                }),

            date: this.zod.date()
                .refine((value) => !isNaN(value.getTime()), {
                    message: "La fecha debe ser válida",
                }),

            serial: this.zod.string()
                .trim()
                .nonempty("El serial es requerido")
                .min(4, "El serial debe tener al menos 4 caracteres")
                .max(255, "El serial debe tener como máximo 255 caracteres")
                .regex(/^[a-zA-Z0-9\s]+$/, { message: "El serial solo puede contener letras, números y espacios" }),

            status: this.zod.string()
                .nonempty("El estado es requerido"),

            category: this.zod.string()
                .nonempty("La categoría es requerida"),

            provider: this.zod.string()
                .nonempty("El proveedor es requerido"),
            image: this.zod.string().optional()
        });

        const result = validationSchema.safeParse(formattedData);

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
}

export default ValidationToolsService;
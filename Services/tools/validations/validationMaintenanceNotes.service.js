class ValidationMaintenanceNotesService {
    constructor(zod) {
        this.zod = zod;
    }

/**
 * Validates the maintenance notes form data.
 * 
 * @param {FormData} formData The form data to be validated.
 * @returns {Object} The validation result containing success status and data/error details.
 */
    async validateToolsMaintenance(formData) {

        const parsedData = Object.fromEntries(formData.entries());

        parsedData.recoveryDate = new Date(parsedData.recoveryDate);
        parsedData.startMaintenanceDate = new Date(parsedData.startMaintenanceDate);

        const validatonSchema = this.zod.object({
            notes: this.zod.string()
                .trim()
                .nonempty("Las notas de mantenimiento son requeridas")
                .min(10, "Las notas de mantenimiento deben tener al menos 10 caracteres")
                .max(255, "Las notas de mantenimiento deben tener como máximo 255 caracteres")
                .regex(/^[a-zA-Z0-9\s]+$/, { message: "El serial solo puede contener letras, números y espacios" }),

            recoveryDate: this.zod.date()
                .refine((value) => !isNaN(value.getTime()), {
                    message: "La fecha de recuperación debe ser válida",
                }),

            startMaintenanceDate: this.zod.date()
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
}

export default ValidationMaintenanceNotesService;
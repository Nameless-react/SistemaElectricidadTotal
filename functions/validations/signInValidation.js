import z from "zod";

/**
 * Validates the sign in form.
 *
 * @param {object} formData - Information of the sign in form.
 * @returns {object} - An object with the following structure:
 *  {
 *      success: boolean,
 *      data: object | string
 *  }
 *  - success: indicates if the form was validated correctly.
 *  - data: if success is true, data is the object with the form information.
 *          if success is false, data is the string with the error message.
 */
export const validateSignIn = (formData) => {

    const validationSchema = z.object({
        email: z.string()
            .trim()
            .min(1, "El correo es requerido")
            .email("El correo no es valido"),
        password: z.string()
            .trim()
            .min(1, "La contraseña es requerida")
    })
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
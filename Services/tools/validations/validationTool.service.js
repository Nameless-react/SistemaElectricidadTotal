


class ValidationToolsService {
    constructor(validationToolForm) {
        this.validationToolForm = validationToolForm;
    }

    /**
     * Valida el formulario de creación o edición de herramienta.
     * @param {FormData} formData - El formulario con los datos de la herramienta.
     * @returns {Promise<{success: boolean, data: Tool; error: z.ZodError}>} - Un objeto con la propiedad `success` que indica si la validación fue exitosa o no.
     *  Si la validación es exitosa, el objeto contiene la propiedad `data` con los datos de la herramienta.
     *  Si la validación falla, el objeto contiene la propiedad `error` con el error de validación.
     */
    async validateTool(formData) {
        return await this.validationToolForm(formData);
    }
}

export default ValidationToolsService;
class IncomeCategoryController {
    constructor(incomeCategoryService, validationIncomeCategoryService, errorHandler) {
        this.incomeCategoryService = incomeCategoryService;
        this.validationIncomeCategoryService = validationIncomeCategoryService;
        this.errorHandler = errorHandler
    }

    async getIncomeCategories(req, res) {
        try {
            const incomeCategories = await this.incomeCategoryService.getIncomeCategories();

            if (!incomeCategories) {
                return this.errorHandler.sendError(res, 'No se encontraron categorías de ingresos.', 'internal_server_error', 500);
            }

            return res.status(200).json(incomeCategories);

        } catch (error) {
            console.error('An error occurred while getting income categories:', error);
            return this.errorHandler.sendError(res, 'Error al obtener las categorías de ingresos.', 'internal_server_error', 500);
        }
    }

    async saveIncomeCategory(req, res) {
        try {
            const formData = await req.json();
            const { success, error, data } = await this.validationIncomeCategoryService.validateIncomeCategory(formData);
            if (!success) {
                return this.errorHandler.sendError(res, error, 'validation_error', 400);
            }

            //validate if the income category already exists
            const incomeCategoryExists = await this.incomeCategoryService.getIncomeCategoryByName(data.name);
            if (incomeCategoryExists) {
                return this.errorHandler.sendError(res, 'La categoría de ingreso ya existe.', 'income_category', 400);
            }

            //save the income category
            const result = await this.incomeCategoryService.save(data);
            if (!result) {
                return this.errorHandler.sendError(res, 'Error al guardar la categoría de ingreso.', 'internal_server_error', 500);
            }

            return res.json({ message: 'Categoría de ingreso guardada exitosamente' }, { status: 200 });

        } catch (error) {
            console.error('An error occurred while saving income category:', error);
            return this.errorHandler.sendError(res, 'Error al guardar la categoría de ingreso.', 'internal_server_error', 500);
        }
    }


    async updateIncomeCategory(req, res) {
        try {
            const url = new URL(req.url);
            const id = parseInt(url.searchParams.get("id"));

            const formData = await req.json();
            const { success, error, data } = await this.validationIncomeCategoryService.validateIncomeCategory(formData);
            if (!success) {
                return this.errorHandler.sendError(res, error, 'validation_error', 400);
            }

            //validate if the income category already exists
            const incomeCategoryExists = await this.incomeCategoryService.getIncomeCategoryById(id);
            if (!incomeCategoryExists) {
                return this.errorHandler.sendError(res, 'La categoría de ingreso no existe.', 'income_category', 400);
            }

            //update the income category
            const result = await this.incomeCategoryService.update(data, id);
            if (!result) {
                return this.errorHandler.sendError(res, 'Error al actualizar la categoría de ingreso.', 'internal_server_error', 500);
            }

            return res.json({ message: 'Categoría de ingreso actualizada exitosamente' }, { status: 200 });

        } catch (error) {
            console.error('An error occurred while updating income category:', error);
            return this.errorHandler.sendError(res, 'Error al actualizar la categoría de ingreso.', 'internal_server_error', 500);
        }
    }

    async inactivateIncomeCategory(id, res) {
        try {
            const incomeCategoryExists = await this.incomeCategoryService.getIncomeCategoryById(id);
            if (!incomeCategoryExists) {
                return this.errorHandler.sendError(res, 'La categoría de ingreso no existe.', 'income_category', 400);
            }

            //inactivate the income category
            const result = await this.incomeCategoryService.inactivate(id);
            if (!result) {
                return this.errorHandler.sendError(res, 'Error al inactivar la categoría de ingreso.', 'internal_server_error', 500);
            }

            return res.json({ message: 'Categoría de ingreso inactivada exitosamente' }, { status: 200 });
        } catch (error) {
            console.error('An error occurred while inactivating income category:', error);
            return this.errorHandler.sendError(res, 'Error al inactivar la categoría de ingreso.', 'internal_server_error', 500);
        }
    }

}

export default IncomeCategoryController;
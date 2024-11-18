class ExpenseCategoryController {
    constructor(expenseCategoryService, validationExpenseCategoryService, errorHandler) {
        this.expenseCategoryService = expenseCategoryService;
        this.validationExpenseCategoryService = validationExpenseCategoryService;
        this.errorHandler = errorHandler;
    }

    getExpensesCategories = async (req, res) => {
        try {
            const expensesCategories = await this.expensesCategoryService.getExpensesCategories();
            if (!expensesCategories) {
                return this.errorHandler.sendError(res, 'No se encontraron categorias de gastos', 'not_found', 404);
            }
            return res.json({ message: 'Categorias de gastos encontradas', data: expensesCategories }, { status: 200 });
        } catch (error) {
            console.error(error);
            return this.errorHandler.sendError(res, 'Error al obtener las categorias de gastos', 'internal_server_error', 500);
        }
    }

    getExpenseCategoryById = async (id, res) => {
        try {

            const expenseCategory = await this.expenseCategoryService.getExpenseCategoryById(id);
            if (!expenseCategory) {
                return this.errorHandler.sendError(res, 'No se encontró la categoria de gasto', 'not_found', 404);
            }
            return res.json({ message: 'Categoria de gasto encontrada', data: expenseCategory }, { status: 200 });
        } catch (error) {
            console.error(error);
            return this.errorHandler.sendError(res, 'Error al obtener la categoria de gasto', 'internal_server_error', 500);
        }
    }

    saveExpenseCategory = async (req, res) => {
        try {
            const formData = await req.json();
            const { success, error, data } = await this.validationExpenseCategoryService.validateExpenseCategory(formData);
            if (!success) {
                return this.errorHandler.sendError(res, error, 'validation_error', 400);
            }

            //validate if the expense category already exists
            const expenseCategoryExists = await this.expenseCategoryService.getExpenseCategoryByName(data.name);


            if (expenseCategoryExists) {
                return this.errorHandler.sendError(res, 'La categoria de gasto ya existe', 'expense_category', 400);
            }

            //save the expense category
            const result = await this.expenseCategoryService.save(data);

            if (!result) {
                return this.errorHandler.sendError(res, 'Error al guardar la categoria de gasto', 'internal_server_error', 500);
            }
            return res.json({ message: 'Categoria de gasto guardada exitosamente' }, { status: 200 });
        } catch (error) {
            console.error(error);
            return this.errorHandler.sendError(res, 'Error al guardar la categoria de gasto', 'internal_server_error', 500);
        }
    }

    updateExpenseCategory = async (req, res) => {
        try {
            const url = new URL(req.url);
            const id = parseInt(url.searchParams.get("id"));

            const formData = await req.json();
            const { success, error, data } = await this.validationExpenseCategoryService.validateExpenseCategory(formData);
            if (!success) {
                return this.errorHandler.sendError(res, error, 'validation_error', 400);
            }

            const expenseCategoryData = await this.expenseCategoryService.prepareExpenseCategoryData(data, id);

            const result = await this.expenseCategoryService.update(expenseCategoryData);
            if (!result) {
                return this.errorHandler.sendError(res, 'Error al actualizar la categoria de gasto', 'internal_server_error', 500);
            }

            return res.json({ message: 'Categoria de gasto actualizada exitosamente' }, { status: 200 });
        } catch (error) {
            console.error(error);
            return this.errorHandler.sendError(res, 'Error al actualizar la categoria de gasto', 'internal_server_error', 500);
        }
    }

    inactivateExpenseCategory = async (id, res) => {
        try {

            const expenseCategoryExists = await this.expenseCategoryService.getExpenseCategoryById(id);

            if (!expenseCategoryExists) {
                return this.errorHandler.sendError(res, 'La categoria de gasto no existe', 'expense_category', 400);
            }

            const result = await this.expenseCategoryService.inactivate(id);
            if (!result) {
                return this.errorHandler.sendError(res, 'Error al inactivar la categoria de gasto', 'internal_server_error', 500);
            }

            return res.json({ message: 'Categoria de gasto inactivada exitosamente' }, { status: 200 });
        } catch (error) {
            console.error(error);
            return this.errorHandler.sendError(res, 'Error al inactivar la categoria de gasto', 'internal_server_error', 500);
        }
    }
}

export default ExpenseCategoryController;
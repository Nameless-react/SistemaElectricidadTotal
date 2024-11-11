class ExpenseCategoryController {
    constructor(expenseCategoryService, errorHandler) {
        this.expenseCategoryService = expenseCategoryService;
        this.errorHandler = errorHandler;
    }

    getExpensesCategories = async (req, res) => {
        try {
            const expensesCategories = await this.expensesCategoryService.getExpensesCategories();
            if (!expensesCategories) {
                return this.errorHandler.sendError(res, 'No se encontraron categorias de gastos', 'not_found', 404);
            }
            return res.json({ message: 'Categorias de gastos encontradas', data: expensesCategories}, { status: 200 });
        } catch (error) {
            console.error(error);
            return this.errorHandler.sendError(res, 'Error al obtener las categorias de gastos', 'internal_server_error', 500);
        }
    }
}

export default ExpenseCategoryController;
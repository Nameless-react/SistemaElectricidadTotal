class IncomeController {
    constructor(incomeService, errorHandler) {
        this.incomeService = incomeService;
        this.errorHandler = errorHandler
    }

    getIncomes = async (req, res) => {
        try {
            const incomes = await this.incomeService.getIncomes();

            if (!incomes) {
                return this.errorHandler.sendError(res, 'No se encontraron ingresos.', 'internal_server_error', 500);
            }

            return res.status(200).json(incomes);

        } catch (error) {
            console.error('An error occurred while getting incomes:', error);
            return this.errorHandler.sendError(res, 'Error al obtener los ingresos.', 'internal_server_error', 500);
        }
    }
}

export default IncomeController;
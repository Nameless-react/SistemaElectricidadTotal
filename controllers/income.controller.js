class IncomeController {
    constructor(incomeService, validationIncomeService, incomeCategoryService, userService, errorHandler) {
        this.incomeService = incomeService;
        this.errorHandler = errorHandler;
        this.incomeCategoryService = incomeCategoryService;
        this.validationIncomeService = validationIncomeService;
        this.userService = userService;
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

    getIncomeById = async (req, res) => {
        try {
            const url = new URL(req.url);
            const id = url.searchParams.get('id');
            const income = await this.incomeService.getIncomeById(id);

            if (!income) {
                return this.errorHandler.sendError(res, 'No se encontró el ingreso.', 'not_found', 404);
            }

            return res.status(200).json(income);
        } catch (error) {

        }
    }

    saveIncome = async (req, res) => {
        try {

            const formData = await req.json();
            const { success, error, data } = await this.validationIncomeService.validateIncome(formData);

            if (!success) {
                return this.errorHandler.sendError(res, error, 'validation_error', 400);
            }

            //veff if the income category exists
            const incomeCategoryExists = await this.incomeCategoryService.getIncomeCategoryById(data.category);
            if (!incomeCategoryExists) {
                return this.errorHandler.sendError(res, 'La categoría de ingreso no existe.', 'income_category', 400);
            }



            //vef if the user exists
            const userExists = await this.userService.getUserById(data.user);
            if (!userExists) {
                return this.errorHandler.sendError(res, 'El usuario no existe.', 'user', 400);
            }


            //save the income
            const result = await this.incomeService.save(data);
            if (!result) {
                return this.errorHandler.sendError(res, 'Error al guardar el ingreso.', 'internal_server_error', 500);
            }

            return res.json({ message: 'Ingreso guardado exitosamente' }, { status: 200 });

        } catch (error) {
            console.error('An error occurred while saving income:', error);
            return this.errorHandler.sendError(res, 'Error al guardar el ingreso.', 'internal_server_error', 500);
        }
    }

    updateIncome = async (req, res) => {
        try {
            const url = new URL(req.url);
            const id = url.searchParams.get('id');
            const formData = await req.json();
            const { success, error, data } = await this.validationIncomeService.validateIncome(formData);

            if (!success) {
                return this.errorHandler.sendError(res, error, 'validation_error', 400);
            }

            //vef if the income exists
            const incomeExists = await this.incomeService.getIncomeById(id);
            if (!incomeExists) {
                return this.errorHandler.sendError(res, 'El ingreso no existe.', 'income', 400);
            }

            //veff if the income category exists
            const incomeCategoryExists = await this.incomeCategoryService.getIncomeCategoryById(data.category);
            if (!incomeCategoryExists) {
                return this.errorHandler.sendError(res, 'La categoría de ingreso no existe.', 'income_category', 400);
            }

            //vef if the user exists
            const userExists = await this.userService.getUserById(data.user);
            if (!userExists) {
                return this.errorHandler.sendError(res, 'El usuario no existe.', 'user', 400);
            }

            //update the income
            const result = await this.incomeService.update(data, id);
            if (!result) {
                return this.errorHandler.sendError(res, 'Error al actualizar el ingreso.', 'internal_server_error', 500);
            }

            return res.json({ message: 'Ingreso actualizado exitosamente' }, { status: 200 });

        } catch (error) {
            console.error('An error occurred while updating income:', error);
            return this.errorHandler.sendError(res, 'Error al actualizar el ingreso.', 'internal_server_error', 500);
        }
    }

    async inactivateIncome(id, res) {
        try {
            console.log('id', id);
            const incomeExists = await this.incomeService.getIncomeById(id);
            if (!incomeExists) {
                return this.errorHandler.sendError(res, 'El ingreso no existe.', 'income', 400);
            }

            const result = await this.incomeService.inactivate(id);
            if (!result) {
                return this.errorHandler.sendError(res, 'Error al inactivar el ingreso.', 'internal_server_error', 500);
            }
    
            return res.json({ message: 'Ingreso inactivado exitosamente' }, { status: 200 });

        } catch (error) {
            console.error(error);
            return this.errorHandler.sendError(res, 'Error al inactivar el ingreso.', 'internal_server_error', 500);
        }
    }
}

export default IncomeController;
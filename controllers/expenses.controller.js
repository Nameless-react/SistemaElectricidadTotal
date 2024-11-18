
class ExprensesController {


  constructor(expensesProjectsService, validationExpenseProjectService, expensesService, userService, expenseCategoryService, errorHandler) {
    this.expensesProjectsService = expensesProjectsService;
    this.validationExpenseProjectService = validationExpenseProjectService;
    this.expensesService = expensesService;
    this.userService = userService;
    this.expenseCategoryService = expenseCategoryService;
    this.errorHandler = errorHandler;
  }

  getExpensesProjects = async (req, res) => {
    try {
      const exppensesProjects = await this.expensesProjectsService.getExpensesProjects();
      if (!exppensesProjects) {
        return this.errorHandler.sendError(res, 'No se encontraron gastos', 'not_found', 404);
      }
      return res.json({ message: 'Gastos encontrados', data: exppensesProjects }, { status: 200 });
    } catch (error) {
      console.error(error);
      return this.errorHandler.sendError(res, 'Error al obtener los gastos', 'internal_server_error', 500);
    }
  }

  getExpensesFlow = async (req, res) => {
    try {
      const expensesFlow = await this.expensesService.getExpensesFlow();
      if (!expensesFlow) {
        return this.errorHandler.sendError(res, 'No se encontraron gastos', 'not_found', 404);
      }
      return res.json({ message: 'Flujo de gastos encontrados', data: expensesFlow }, { status: 200 });
    } catch (error) {
      console.error(error);
      return this.errorHandler.sendError(res, 'Error al obtener el flujo de gastos', 'internal_server_error', 500);
    }
  }

  getProjectsExpensesFlow = async (req, res) => {
    try {
      const projectsExpensesFlow = await this.expensesProjectsService.getProjectsExpensesFlow();
      if (!projectsExpensesFlow) {
        return this.errorHandler.sendError(res, 'No se encontraron los flujos de gastos de proyectos', 'not_found', 404);
      }
      return res.json({ message: 'Flujo de gastos de proyectos encontrados', data: projectsExpensesFlow }, { status: 200 });
    } catch (error) {
      console.error(error);
      return this.errorHandler.sendError(res, 'Error al obtener el flujo de gastos de proyectos', 'internal_server_error', 500);
    }
  }

  saveProjectExpense = async (req, res) => {
    try {
      const formData = await req.json();

      //we need to validate the formData and some props
      const { success, error, data } = await this.validationExpenseProjectService.validateExpenseProject(formData);
      if (!success) {
        return this.errorHandler.sendError(res, error, 'validation_error', 400);
      }

      //vef if user exists
      const userExists = await this.userService.getUserById(data.user);
      if (!userExists) {
        return this.errorHandler.sendError(res, 'El usuario no existe', 'user', 400);
      }

      //vef if category exists
      const categoryExists = await this.expenseCategoryService.getExpenseCategoryById(data.category);
      if (!categoryExists) {
        return this.errorHandler.sendError(res, 'La categoría no existe', 'category', 400);
      }

      //save the project expense
      const projectExpense = await this.expensesProjectsService.save(data);
      if (!projectExpense) {
        return this.errorHandler.sendError(res, 'No se pudo guardar el gasto del proyecto', 'internal_server_error', 500);
      }
      return res.json({ message: 'Gasto del proyecto guardado exitosamente' }, { status: 200 });

    } catch (error) {
      console.error(error);
      return this.errorHandler.sendError(res, 'Error al guardar los gastos del proyecto', 'internal_server_error', 500);
    }
  }

  updateProjectExpense = async (req, res) => {
    try {
      const url = new URL(req.url);
      const id = parseInt(url.searchParams.get("id"));
      const formData = await req.json();

      const { success, error, data } = await this.validationExpenseProjectService.validateExpenseProject(formData);
      if (!success) {
        return this.errorHandler.sendError(res, error, 'validation_error', 400);
      }

      //vef if the expense project already exists
      const expenseProjectExists = await this.expensesProjectsService.getExpenseProjectById(id);
      if (!expenseProjectExists) {
        return this.errorHandler.sendError(res, 'El gasto del proyecto no existe', 'project_expense', 400);
      }

      const updatedProjectExpense = await this.expensesProjectsService.update(id, data);
      if (!updatedProjectExpense) {
        return this.errorHandler.sendError(res, 'No se pudo actualizar el gasto del proyecto', 'internal_server_error', 500);
      }

      return res.json({ message: 'Gasto del proyecto actualizado exitosamente' }, { status: 200 });

    } catch (error) {
      console.error(error);
      return this.errorHandler.sendError(res, 'Error al actualizar el gasto del proyecto', 'internal_server_error', 500);
    }
  }
}

export default ExprensesController;
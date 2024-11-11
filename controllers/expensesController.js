

class ExprensesController {


  constructor(expensesProjectsService, expensesService, errorHandler) {
    this.expensesProjectsService = expensesProjectsService;
    this.expensesService = expensesService;
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
}

export default ExprensesController;
/**
 * Controller for handling project budget-related operations.
 */
class BudgetController {
    /**
     * Creates an instance of BudgetController.
     * @param {Object} projectBudgetService - Service for handling project budget operations.
     * @param {Object} errorHandler - Service for handling errors.
     */
    constructor(projectBudgetService, projectService, userService ,validationProjectBudgetService,errorHandler) {
        this.projectBudgetService = projectBudgetService;
        this.validationProjectBudgetService = validationProjectBudgetService;
        this.projectService = projectService;
        this.userService = userService;
        this.errorHandler = errorHandler;
    }

    /**
     * Retrieves all project budgets.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>}
     */
    getProjectBudgets = async (req, res) => {
        try {
            const projectBudgets = await this.projectBudgetService.getProjectBudgets();
            if (!projectBudgets) {
                return this.errorHandler.sendError(res, 'No se encontraron los presupuestos de los proyectos', 'not_found', 404);
            }
        } catch (error) {
            console.error('An error occurred while getting project budgets:', error);
            return this.errorHandler.sendError(res, 'Error al obtener los presupuestos de los proyectos', 'internal_server_error', 500);
        }
    }

    /**
     * Retrieves the flow of project budgets.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>}
     */
    getProjectBudgetsFlow = async (req, res) => {
        try {
            const projectBudgetsFlow = await this.projectBudgetService.getProjectBudgetsFlow();
            if (!projectBudgetsFlow) {
                return this.errorHandler.sendError(res, 'No se encontró el flujo de presupuestos de los proyectos', 'not_found', 404);
            }
        } catch (error) {
            console.error('An error occurred while getting project budgets flow:', error);
            return this.errorHandler.sendError(res, 'Error al obtener el flujo de presupuestos de los proyectos', 'internal_server_error', 500);
        }
    }

    saveProjectBudget = async (req, res) => {
        try {
            const formData = await req.json();
            const { success, error, data } = await this.validationProjectBudgetService.validateProjectBudget(formData);
            if (!success) {
                return this.errorHandler.sendError(res, error, 'validation_error', 400);
            }
     
            //vef if the project already exists
    
            // const projectExists = await this.projectService.getProjectById(data.project);
            // if (!projectExists) {
            //     return this.errorHandler.sendError(res, 'El proyecto no existe', 'project', 400);
            // }

            //vef if the user already exists
            const userExists = await this.userService.getUserById(data.user);
            if (!userExists) {
                return this.errorHandler.sendError(res, 'El usuario no existe', 'user', 400);
            }
        
            //save the project budget
            const projectBudget = await this.projectBudgetService.save(data);
            if (!projectBudget) {
                return this.errorHandler.sendError(res, 'No se pudo guardar el presupuesto del proyecto', 'internal_server_error', 500);
            }
            return res.json({message: 'Presupuesto del proyecto guardado exitosamente'}, {status: 200});

        } catch (error) {
            console.error('An error occurred while saving project budget:', error);
            return this.errorHandler.sendError(res, 'Error al guardar el presupuesto del proyecto', 'internal_server_error', 500);
        }
    }

    updateProjectBudget = async (req, res) => {
        try {
            const url = new URL(req.url);
            const id = parseInt(url.searchParams.get("id"));
            const formData = await req.json();
            
            const { success, error, data } = await this.validationProjectBudgetService.validateProjectBudget(formData);
            if (!success) {
                return this.errorHandler.sendError(res, error, 'validation_error', 400);
            }
            //vef if the project already exists
            // const projectExists = await this.projectService.getProjectById(data.project);
            // if (!projectExists) {
            //     return this.errorHandler.sendError(res, 'El proyecto no existe', 'project', 400);
            // }
            
            //vef if the user already exists
            const userExists = await this.userService.getUserById(data.user);
            if (!userExists) {
                return this.errorHandler.sendError(res, 'El usuario no existe', 'user', 400);
            }
            //update the project budget
            const projectBudget = await this.projectBudgetService.update(data, id);
            if (!projectBudget) {
                return this.errorHandler.sendError(res, 'No se pudo actualizar el presupuesto del proyecto', 'internal_server_error', 500);
            }
            return res.json({message: 'Presupuesto del proyecto actualizado exitosamente'}, {status: 200});

        } catch (error) {
            console.error('An error occurred while updating project budget:', error);
            return this.errorHandler.sendError(res, 'Error al actualizar el presupuesto del proyecto', 'internal_server_error', 500);
        }
    }
}

export default BudgetController;
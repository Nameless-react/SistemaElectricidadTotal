/**
 * Repository class for handling project budget related operations.
 */
class ProjectBudgetRepository {
    /**
     * Creates an instance of ProjectBudgetRepository.
     * @param {Object} dependencies - The dependencies for the repository.
     * @param {Object} dependencies.sequelize - The Sequelize instance.
     * @param {Object} dependencies.projectBudgetModel - The ProjectBudget model.
     */
    constructor(sequelize, projectBudgetModel) {
        this.sequelize = sequelize;
        this.projectBudgetModel = projectBudgetModel
    }

    /**
     * Retrieves all project budgets.
     * @returns {Promise<Array|null>} A promise that resolves to an array of project budgets or null if none found.
     * @throws {Error} Throws an error if there is an issue retrieving the project budgets.
     */
    async getProjectBudgets() {
        try {
            const projectBudgets = await this.sequelize.query("SELECT * FROM GetProjectBudgets", { type: this.sequelize.QueryTypes.SELECT });
            if (!projectBudgets || projectBudgets.length === 0) {
                return null;
            }
            return projectBudgets;
        } catch (error) {
            console.error('An error occurred while getting project budgets:', error);
            throw new Error('Error al obtener los presupuestos de proyectos.');
        }
    }
    /**
     * Retrieves the flow of project budgets.
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     * @throws {Error} Throws an error if there is an issue retrieving the project budgets flow.
     */
    async getProjectBugetsFlow() {
        try {
            const projectBudgetsFlow = await this.sequelize.query("SELECT * FROM project_budgets_flow ", { type: this.sequelize.QueryTypes.SELECT });
            if (!projectBudgetsFlow || projectBudgetsFlow.length === 0) {
                return null;
            }
            return projectBudgetsFlow;
        } catch (error) {
            console.error('An error occurred while getting project budgets flow:', error);
            throw new Error('Error al obtener el flujo de presupuestos de proyectos.');
        }
    }

    async getProjectBudgetById(id) {
        try {
            const projectBudget = await this.sequelize.query("SELECT * FROM project_budget where id_project_budget = :id", {
                replacements: { id },
                type: this.sequelize.QueryTypes.SELECT,
                plain: true
            });
            if (!projectBudget) {
                return null;
            }
            return projectBudget;
        } catch (error) {
            console.error('An error occurred while getting project budget by id:', error);
            throw new Error('Error al obtener el presupuesto del proyecto por id.');
        }
    }

    /**
  * Saves the project budget data to the database.
  *
  * @async
  * @function saveProjectBudget
  * @param {Object} formData - The form data containing budget information.
  * @param {string} formData.description - The description of the budget.
  * @param {number} formData.amount - The total amount of the budget.
  * @param {Date} formData.date - The date of the budget entry.
  * @param {string} formData.project - The ID of the associated project.
  * @param {string} formData.user - The ID of the user creating the budget.
  * @returns {Promise<Object|null>} Returns the created project budget object or `null` if the creation fails.
  * @throws {Error} Throws an error if there is an issue while saving the project budget.
  */
    async saveProjectBudget(formData) {
        try {

            // Use raw query for inserting the project budget with a valid id_project
            const result = await this.sequelize.query(
                `
                INSERT INTO project_budget (id_project, amount, date, id_user, description, status)
                 VALUES (:id_project, :amount, :date, :id_user, :description, :status)
                 `,
                {
                    replacements: {
                        id_project: formData.project,
                        amount: formData.amount,
                        date: formData.date,
                        id_user: formData.user,
                        description: formData.description,
                        status: formData.status || 'Active'
                    },
                    type: this.sequelize.QueryTypes.INSERT
                }
            );
            return result;
        } catch (error) {
            console.error('An error occurred while saving project budget:', error);
            throw new Error(`Failed to save the project budget: ${error.message}`);
        }
    }

    async updateProjectBudget(formData, id) {
        
       
        try {
            const result = await this.sequelize.query(
                `
                UPDATE project_budget
                SET id_project = :id_project, amount = :amount, date = :date, id_user = :id_user, description = :description, status = :status
                WHERE id_project_budget = :id
                `,
                {
                    replacements: {
                        id: id,
                        id_project: formData.project,
                        amount: formData.amount,
                        date: formData.date,
                        id_user: formData.user,
                        description: formData.description,
                        status: formData.status || 'Active'
                    },
                    type: this.sequelize.QueryTypes.UPDATE
                }
            );

            return result;
        } catch (error) {
            console.error('An error occurred while updating project budget:', error);
            throw new Error(`Failed to update the project budget: ${error.message}`);
        }
    }
}
export default ProjectBudgetRepository;
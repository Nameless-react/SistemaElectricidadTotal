

/**
 * Repository class for managing expenses projects.
 */
class ExpensesProjectsRepository {
    /**
     * Creates an instance of ExpensesProjectsRepository.
     * @param {Object} expensesProjectModel - The model representing the expenses projects.
     * @param {Object} sequelize - The Sequelize instance for database operations.
     */
    constructor(expensesProjectModel, sequelize) {
        this.expensesProjectModel = expensesProjectModel;
        this.sequelize = sequelize;
    }

    /**
     * Retrieves all expenses projects.
     * @returns {Promise<Array|null>} A promise that resolves to an array of expenses projects or null if no expenses are found.
     * @throws {Error} Throws an error if there is an issue retrieving the expenses.
     */
    async getExpensesProjects() {
        try {
            const expenses = await this.sequelize.query("SELECT * FROM GeneralExpenses", {
                type: this.sequelize.QueryTypes.SELECT

            });
            if (!expenses || expenses.length === 0) {
                return null;
            }
            return expenses;
        } catch (error) {
            console.error('An error occurred while getting expenses:', error);
            throw new Error('Error al obtener los gastos.');
        }
    }

    async getProjectsExpensesFlow() {
        try {
            const projectsExpensesFlow = await this.sequelize.query("SELECT * FROM projects_expenses_flow", {
                type: this.sequelize.QueryTypes.SELECT
            });
            if (!projectsExpensesFlow || projectsExpensesFlow.length === 0) {
                return null;
            }
            return projectsExpensesFlow;
        } catch (error) {
            console.error('An error occurred while getting project expenses flow:', error);
            throw new Error('Error al obtener el flujo de gastos del proyecto.');
        }
    }
}

export default ExpensesProjectsRepository;



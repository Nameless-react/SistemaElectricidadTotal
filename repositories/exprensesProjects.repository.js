

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

    async getExpenseProjectById(id) {
        try {
            const expenseProject = await this.sequelize.query(
                `select
                   
                    ep.description,
                    ep.amount,
                    ep.id_project as project,
                    ep.date,
                    ep.id_user as user,
                    ep.id_expense_category as category,
                    ep.status
                from expenses_projects ep WHERE id_expenses_projects = :id
                `
                , {
                    replacements: {
                        id: id
                    },
                    type: this.sequelize.QueryTypes.SELECT
                });
            if (!expenseProject || expenseProject.length === 0) {
                return null;
            }
            return expenseProject[0];
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

    async saveExpensesProjects(formData) {
        try {
            const projectExpenses = await this.sequelize.query(
                `Insert into expenses_projects (description, amount, id_project, id_user, id_expense_category ,status)
                values (:description, :amount, :project, :user, :category, :status)
                `, {
                replacements: {
                    description: formData.description,
                    amount: formData.amount,
                    date: formData.date,
                    project: formData.project,
                    user: formData.user,
                    status: formData.status,
                    category: formData.category
                }
            })
            if (!projectExpenses) {
                return null;
            }
            return projectExpenses;
        } catch (error) {
            console.error('An error occurred while saving expenses projects:', error);
            throw new Error('Error al guardar los gastos del proyecto.');
        }
    }

    async updateExpensesProjects(id, formData) {
        try {
            const projectExpenses = await this.sequelize.query(
                `UPDATE expenses_projects SET status = :status
                WHERE id_expenses_projects = :id
                `, {
                replacements: {
                    id: id,
                    status: formData.status,
                }
            })
            if (!projectExpenses) {
                return null;
            }
            return projectExpenses;
        } catch (error) {
            console.error('An error occurred while updating expenses projects:', error);
            throw new Error('Error al actualizar los gastos del proyecto.');
        }
    }
}

export default ExpensesProjectsRepository;



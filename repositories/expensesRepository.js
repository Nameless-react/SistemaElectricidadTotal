
class ExpensesRepository {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    async getExpensesFlow() {
        try {
            const expensesFlow = await this.sequelize.query("SELECT * FROM expenses_flow", {
                type: this.sequelize.QueryTypes.SELECT

            });
            if (!expensesFlow || expensesFlow.length === 0) {
                return null;
            }
            return expensesFlow;
        } catch (error) {
            console.error('An error occurred while getting expenses flow:', error);
            throw new Error('Error al obtener el flujo de gastos.');
        }
    }
}

export default ExpensesRepository;
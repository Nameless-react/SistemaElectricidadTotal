class IncomeRepository {
    constructor(IncomeModel, sequelize) {
        this.IncomeModel = IncomeModel;
        this.sequelize = sequelize;
    }

    async getIncomes() {
        try {
            const incomes = await this.IncomeModel.findAll();
            if (!incomes || incomes.length === 0) {
                return null;
            }
            const formattedIncomes = incomes.map(income => income.dataValues);
            return formattedIncomes;
        } catch (error) {
            console.error('An error occurred while getting incomes:', error);
            throw new Error('Error al obtener los ingresos.');
        }
    }
}

export default IncomeRepository;


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

    async getIncomeById(id) {
        try {
            const income = await this.IncomeModel.findByPk(id);
            if (!income) {
                return null;
            }
            return income.dataValues;
        } catch (error) {
            console.error('An error occurred while getting income by id:', error);
            throw new Error('Error al obtener el ingreso por id.');
        }
    }

    async saveIncome(data) {
        try {
            const income = await this.IncomeModel.create({
                idProject: data.project,
                idIncomeCategory: data.category,
                idUser: data.user,
                amount: data.amount,
                incomeDate: data.date,
                description: data.description,
                paymentMethod: data.paymentMethod,
                status: data.status,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            if (!income) {
                return null;
            }
            return income.dataValues;
        } catch (error) {
            console.error('An error occurred while saving income:', error);
            throw new Error('Error al guardar el ingreso.');
        }
    }

    async updateIncome(data, id) {
        try {
            const income = await this.IncomeModel.update({
                idProject: data.project,
                idIncomeCategory: data.category,
                idUser: data.user,
                amount: data.amount,
                incomeDate: data.date,
                description: data.description,
                paymentMethod: data.paymentMethod,
                status: data.status,
                updatedAt: new Date(),
            }, {
                where: {
                    idIncome: id
                }
            });
            if (!income) {
                return null;
            }

            return income;
        } catch (error) {
            console.error('An error occurred while updating income:', error);
            throw new Error('Error al actualizar el ingreso.');
        }
    }

    async inactivateIncome(id) {
        try {
            const income = await this.IncomeModel.update({
                status: 'Inactivado',
                updatedAt: new Date(),
            }, {
                where: {
                    idIncome: id
                }
            });
            if (!income) {
                return null;
            }
            return income;
        } catch (error) {
            console.error('An error occurred while inactivating income:', error);
            throw new Error('Error al inactivar el ingreso.');
        }
    }
}

export default IncomeRepository;


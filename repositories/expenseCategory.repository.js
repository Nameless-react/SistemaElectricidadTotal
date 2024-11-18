
class ExpenseCategoryRepository {

    constructor(sequelize, expenseCategoryModel) {
        this.sequelize = sequelize;
        this.expenseCategoryModel = expenseCategoryModel;
    }

    async getAllExpensesCategories() {
        try {
            const expensesCategories = await this.expenseCategoryModel.findAll();

            if (!expensesCategories || expensesCategories.length === 0) {
                return null;
            }

            const formattedCategories = expensesCategories.map(category => category.dataValues);
            return formattedCategories;

        } catch (error) {
            console.error('An error occurred while getting expenses categories:', error);
            throw new Error('Error al obtener las categorias de gastos.');
        }
    }

    async getExpenseCategoryById(id) {
        try {
            const expenseCategory = await this.expenseCategoryModel.findOne({ where: { idExpenseCategory: id } });

            if (!expenseCategory) {
                return null;
            }

            return expenseCategory.dataValues;

        } catch (error) {
            console.error('An error occurred while getting the expense category:', error);
            throw new Error('Error al obtener la categoria de gasto.');
        }
    }

    async getExpenseCategoryByName(name) {
        try {
            const expenseCategory = await this.expenseCategoryModel.findOne({ where: { name: name } });

            if (!expenseCategory) {
                return null;
            }
            return expenseCategory.dataValues;
        } catch (error) {
            console.error('An error occurred while getting the expense category:', error);
            throw new Error('Error al obtener la categoria de gasto.');
        }
    }

    async saveExpenseCategory(formData) {
        try {
            const newExpenseCategory = await this.expenseCategoryModel.create({
                name: formData.name,
                description: formData.description,
                status: formData.status
            });

            if (!newExpenseCategory) {
                return null;
            }

            return newExpenseCategory;

        } catch (error) {
            console.error('An error occurred while saving the expense category:', error);
            throw new Error('Error al guardar la categoria de gasto.');
        }
    }

    async updateExpenseCategory(formData) {
        try {
            const updateExpenseCategory = await this.expenseCategoryModel.update({
                name: formData.name,
                description: formData.description,
                status: formData.status
            }, {
                where: { idExpenseCategory: formData.id }
            });
            if (!updateExpenseCategory) {
                return null;
            }
            return updateExpenseCategory;
        } catch (error) {
            console.error('An error occurred while updating the expense category:', error);
            throw new Error('Error al actualizar la categoria de gasto.');
        }
    }

    async inactivateExpenseCategory(id) {
        console.log("Inactivando categoria de gasto");
        try {
            const inactivateExpenseCategory = await this.expenseCategoryModel.update({
                status: "Inactiva"
            }, {
                where: { idExpenseCategory: id }
            });
            if (!inactivateExpenseCategory) {
                return null;
            }
            return inactivateExpenseCategory;
        } catch (error) {
            console.error('An error occurred while inactivating the expense category:', error);
            throw new Error('Error al inactivar la categoria de gasto.');
        }
    }
}

export default ExpenseCategoryRepository;

class ExpenseCategoryRepository{

    constructor(sequelize, expenseCategoryModel){
        this.sequelize = sequelize;
        this.expenseCategoryModel = expenseCategoryModel;
    }

    async getAllExpensesCategories(){
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
}

export default ExpenseCategoryRepository;
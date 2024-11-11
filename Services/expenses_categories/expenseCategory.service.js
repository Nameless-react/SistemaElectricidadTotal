
class ExpenseCategoryService {
    constructor(expensesCategoryRepository){
        this.expensesCategoryRepository = expensesCategoryRepository;
    }

    async getExpensesCategories(){
        return await this.expensesCategoryRepository.getAllExpensesCategories();
    }
}
export default ExpenseCategoryService;
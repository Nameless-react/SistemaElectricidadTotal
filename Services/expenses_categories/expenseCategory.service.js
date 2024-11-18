
class ExpenseCategoryService {
    constructor(expensesCategoryRepository) {
        this.expensesCategoryRepository = expensesCategoryRepository;
    }

    async getExpensesCategories() {
        return await this.expensesCategoryRepository.getAllExpensesCategories();
    }

    async getExpenseCategoryById(id) {
        return await this.expensesCategoryRepository.getExpenseCategoryById(id);
    }

    async getExpenseCategoryByName(name) {
        return await this.expensesCategoryRepository.getExpenseCategoryByName(name);
    }

    async save(formData) {
        return await this.expensesCategoryRepository.saveExpenseCategory(formData);
    }

    async update(formData) {
        return await this.expensesCategoryRepository.updateExpenseCategory(formData);
    }

    async inactivate(id) {
        return await this.expensesCategoryRepository.inactivateExpenseCategory(id);
    }

    async prepareExpenseCategoryData(data, id) {
        const { name, description, status } = data;
        return {
            id: id,
            name,
            description,
            status: status
        }
    }
}
export default ExpenseCategoryService;
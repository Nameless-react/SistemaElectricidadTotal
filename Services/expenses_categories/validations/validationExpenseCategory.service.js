class ValidationExpenseCategoryService {
    constructor(validationExpenseCategoryForm) {
        this.validationExpenseCategoryForm = validationExpenseCategoryForm;
    }

    async validateExpenseCategory(formData) {
        return await this.validationExpenseCategoryForm(formData);
    }
}

export default ValidationExpenseCategoryService;
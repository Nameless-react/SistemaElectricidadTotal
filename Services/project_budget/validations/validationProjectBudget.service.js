class ValidationProjectBudgetService {
    constructor(validationProjectBudgetForm) {
        this.validationProjectBudgetForm = validationProjectBudgetForm;
    }

    async validateProjectBudget(formData) {
        return await this.validationProjectBudgetForm(formData);
    }
}

export default ValidationProjectBudgetService;
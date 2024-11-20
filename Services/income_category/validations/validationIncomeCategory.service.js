class ValidationIncomeCategoryService {
    constructor(validationIncomeCategoryForm){
        this.validationIncomeCategoryForm = validationIncomeCategoryForm;
    }

    async validateIncomeCategory(formData){
        return await this.validationIncomeCategoryForm(formData);
    }
}

export default ValidationIncomeCategoryService;
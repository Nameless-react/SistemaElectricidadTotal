class ValidationExpenseProjectService {
    constructor(validationExpenseProjectForm) {
        this.validationExpenseProjectForm = validationExpenseProjectForm;
    }

    async validateExpenseProject(formData){
        return await this.validationExpenseProjectForm(formData);
    }
}

export default ValidationExpenseProjectService;
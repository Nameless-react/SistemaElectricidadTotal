class ValidationIncomeService{

    constructor(incomeValidationForm){
        this.incomeValidationForm = incomeValidationForm;
    }

    async validateIncome(formData){
       return this.incomeValidationForm(formData);
    }
}

export default ValidationIncomeService;
class ValidationEmployeeFormService{
    constructor(validationEmployeeForm){
        this.validationEmployeeForm = validationEmployeeForm
    }

    async validateEmployeeForm(formData){
        return await this.validationEmployeeForm(formData)
    }
}

export default ValidationEmployeeFormService


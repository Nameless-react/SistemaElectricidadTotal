
class ValidationMaterialService {

    constructor(validationMaterialForm) {
        this.validationMaterialForm = validationMaterialForm;
    }

    async validateMaterial(formData) {
        return await this.validationMaterialForm(formData);
    }
}

export default ValidationMaterialService;
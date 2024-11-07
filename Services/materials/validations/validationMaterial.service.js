
class ValidationMaterialService {

    /**
     * Constructor for ValidationMaterialService
     * @param {function} validationMaterialForm - Function to validate a material form.
     */
    constructor(validationMaterialForm) {
        this.validationMaterialForm = validationMaterialForm;
    }

    async validateMaterial(formData) {
        return await this.validationMaterialForm(formData);
    }
}

export default ValidationMaterialService;
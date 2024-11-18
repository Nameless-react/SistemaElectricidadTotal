class IncomeCategoryService {
    constructor(incomeCategoryRepository) {
        this.incomeCategoryRepository = incomeCategoryRepository;
    }

    async getIncomeCategories() {
        return await this.incomeCategoryRepository.getIncomeCategories();
    }

    async getIncomeCategoryById(id) {
        return await this.incomeCategoryRepository.getIncomeCategoryById(id);
    }

    async getIncomeCategoryByName(name) {
        return await this.incomeCategoryRepository.getIncomeCategoryByName(name);
    }

    async save(formData) {
        return await this.incomeCategoryRepository.saveIncomeCategory(formData);
    }

    async update(formData, id) {
        return await this.incomeCategoryRepository.updateIncomeCategory(formData, id);
    }

    async inactivate(id) {
        return await this.incomeCategoryRepository.inactivateIncomeCategory(id);
    }

}

export default IncomeCategoryService;
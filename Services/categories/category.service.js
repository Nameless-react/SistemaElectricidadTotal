

class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async getCategories() {
        return await this.categoryRepository.getCategories();
    }

    async getCategoryById(id) {
        return await this.categoryRepository.getCategoryById(id);
    }

    async getCategoryByName(name) {
        return await this.categoryRepository.getCategoryByName(name);
    }
}

export default CategoryService;
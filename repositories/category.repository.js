class CategoryRepository {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }

    /**
     * Retrieves all categories from the database.
     * @returns {Promise<Array|null>} A promise that resolves with an array of categories or null if none are found.
     */
    async getCategories() {
        try {
            const categories = await this.categoryModel.findAll();
            if (!categories || categories.length === 0) {
                console.log("No categories found");
                return null; // Return null if no categories are found
            }
            return categories;
        } catch (error) {
            console.error("Error retrieving categories:", error);
            throw new Error("Error al obtener las categorías");
        }
    }

    /** 
     * Retrieves a category by its ID from the database.
     * @param {number} id - The ID of the category to retrieve.
     * @returns {Promise<Category|null>} A promise that resolves with the retrieved category or null if not found.
     */
    async getCategoryById(id) {
        try {
            const category = await this.categoryModel.findByPk(id);
            if (!category) {
                console.log("Category not found");
                return null; // Return null if the category is not found
            }
            return category.dataValues;
        } catch (error) {
            console.error("Error retrieving category by ID:", error);
            throw new Error("Error al obtener la categoría");
        }
    }

    /**
     * Retrieves a category by its name from the database.
     * @param {string} name - The name of the category to retrieve.
     * @returns {Promise<Category|null>} A promise that resolves with the retrieved category or null if not found.
     */
    async getCategoryByName(name) {
        try {
            const category = await this.categoryModel.findOne({ where: { name } });
            if (!category) {
                console.log("Category not found");
                return null; // Return null if the category is not found
            }
            return category.dataValues;
        } catch (error) {
            console.error("Error retrieving category by name:", error);
            throw new Error("Error al obtener la categoría");
        }
    }
}

export default CategoryRepository;

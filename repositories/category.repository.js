class CategoryRepository {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    /**
     * Retrieves all categories from the database.
     * @returns {Promise<Array>} A promise that resolves with an array of categories.
     * @throws {Error} Throws an error if categories cannot be retrieved.
     */
    async getCategories() {
        try {
            const categories = await this.categoryModel.findAll();
            if (!categories || categories.length === 0) {
                throw new Error("No se encontraron categorías");
            }
            return categories;
        } catch (error) {
            console.error("Error al obtener las categorías:", error);
            throw new Error("Error al obtener las categorías");
        }
    }

    /** 
     *Retrieves a category by its ID from the database.
     * @param {number} id - The ID of the category to retrieve.
     * @returns {Promise<Category>} A promise that resolves with the retrieved category.
     * @throws {Error} Throws an error if the category cannot be retrieved.
    **/
    async getCategoryById(id) {
        try {
            const category = await this.categoryModel.findByPk(id);
            if (!category) {
                throw new Error("Categoría no encontrada");
            }
            return category.dataValues;
        } catch (error) {
            console.error("Error al obtener la categoría:", error);
            throw new Error("Error al obtener la categoría");
        }
    }

    /**
     * Retrieves a category by its name from the database.
     * @param {string} name - The name of the category to retrieve.
     * @returns {Promise<Category>} A promise that resolves with the retrieved category.
     * @throws {Error} Throws an error if the category cannot be retrieved.
     */
    async getCategoryByName(name) {
        try {
            const category = await this.categoryModel.findOne({ where: { name } });
            if (!category) {
                throw new Error("Categoría no encontrada");
            }
            return category.dataValues;
        } catch (error) {
            console.error("Error al obtener la categoría:", error);
            throw new Error("Error al obtener la categoría");
        }
    }
    
}
export default CategoryRepository;
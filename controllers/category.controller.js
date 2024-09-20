import { Category } from "../models";

class CategoryController {
    getCategories = async (req, res) => {
        try {
            const categories = await Category.findAll();

            const categoryData = categories.map(category => category.dataValues);

            return categoryData;
        } catch (error) {
            throw new Error(error, "Error while getting categories");
        }
    }
}

export default CategoryController;
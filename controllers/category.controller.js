import { Category } from "../models";

class CategoryController {
    getCategories = async (req, res) => {
        try {
            const categories = await Category.findAll();
            return categories;
        } catch (error) {
            throw new Error(error, "Error while getting categories");
        }
    }
}

export default CategoryController;
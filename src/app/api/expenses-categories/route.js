import { ExpenseCategoryController } from "/controllers";


export const GET = (req, res) => new ExpenseCategoryController().getExpensesCategories(req, res);
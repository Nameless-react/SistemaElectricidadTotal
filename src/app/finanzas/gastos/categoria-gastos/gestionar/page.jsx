import { ExpensesCategoryForm } from "../../../../../../components/finances/expenseCategory/expenseCategoryForm";
import { createExpensesCategoryController } from "../../../../../../controllers/factory";

export default async function Page({ searchParams }) {
    const { id } = await searchParams;
    let expenseCategory = null;
    const expenseCategoryService = createExpensesCategoryController().expenseCategoryService;
    try {
        if (id) {
            expenseCategory = await expenseCategoryService.getExpenseCategoryById(id)
        }
    } catch (error) {
        console.error(error);
        return <p>Hubo un problema al cargar los datos.</p>;
    }

    return (
        <div className="flex-1 min-h-screen sm:px-4 sm:pt-4 ">
            <div className="bg-gray-800 bg-opacity-10 rounded-lg shadow-lg p-6 min-h-full overflow-auto">
                <ExpensesCategoryForm expenseCategory={expenseCategory} id={id}/>
            </div>
        </div>
    )
}
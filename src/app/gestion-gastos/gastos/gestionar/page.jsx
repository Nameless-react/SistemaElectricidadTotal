import { ExpensesForm } from "../../../../../components/expensesManagment/expenses/expensesForm";
import { createExpensesCategoryController } from "../../../../../controllers/factory";
import projectController from "../../../../../controllers/project.controller";

export default async function Gestionar() {
     const expenseCategoryService = createExpensesCategoryController().expenseCategoryService;
     const projectService =  projectController.projectsService;
     const projects = await projectService.getProjects();
     const expenseCategories = await expenseCategoryService.getExpensesCategories();


    return (
        <div className="flex-1 min-h-screen sm:px-4 sm:pt-4 ">
            <div className="bg-gray-800 bg-opacity-10 rounded-lg shadow-lg p-6 min-h-full overflow-auto ">
                <ExpensesForm  categories={expenseCategories} projects={projects}/>
            </div>
        </div>
    )
}
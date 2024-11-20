import { ExpensesForm } from "../../../../../components/finances/expenses/expensesForm";
import { createExpensesCategoryController, createExpensesController } from "../../../../../controllers/factory";
import projectController from "../../../../../controllers/project.controller";

export default async function Page({ searchParams }) {
    const { id } = await searchParams;
    let expenseProject = null;
    const expenseCategoryService = createExpensesCategoryController().expenseCategoryService;
    const expensesProjectsService = createExpensesController().expensesProjectsService;
    const projectService = projectController.projectsService;
    const projects = await projectService.getProjects();
    const expenseCategories = await expenseCategoryService.getExpensesCategories();

    try {
        if (id) {
            expenseProject= await expensesProjectsService.getExpenseProjectById(id)
        }
    } catch (error) {
        console.error(error);
        return <p>Hubo un problema al cargar los datos.</p>;
    }

  

    return (
        <div className="flex-1 min-h-screen sm:px-4 sm:pt-4 ">
            <div className="bg-gray-800 bg-opacity-10 rounded-lg shadow-lg p-6 min-h-full overflow-auto ">
                <ExpensesForm categories={expenseCategories} projects={projects} expense={expenseProject} />
            </div>
        </div>
    )
}
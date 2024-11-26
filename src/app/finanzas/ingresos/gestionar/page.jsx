import { IncomeForm } from "../../../../../components/finances/income/incomeForm";
import projectController from "../../../../../controllers/project.controller";
import { createIncomeCategoryController, createIncomeController } from "../../../../../controllers/factory";
export default async function Page({ searchParams }) {
    const { id } = await searchParams;
    const projectService = projectController.projectsService;
    let income = null;
    let parsedIncome = null;
    const incomeService = createIncomeController().incomeService;
    const incomeCategoryService = createIncomeCategoryController().incomeCategoryService;
    const incomeCategories = await incomeCategoryService.getIncomeCategories();
    const projects = await projectService.getProjects();

    try {
        if (id) {
            income = await incomeService.getIncomeById(id);
            parsedIncome = {
                project: income.idProject,
                amount: income.amount,
                category: income.idIncomeCategory,
                user: income.idUser,
                date: income.incomeDate,
                description: income.description,
                paymentMethod: income.paymentMethod,
                status: income.status
            }
        }
    } catch (error) {
        console.error(error);
        return <p>Hubo un problema al cargar los datos.</p>;

    }


    return (
        <div className="flex-1 min-h-screen sm:px-4 sm:pt-4 ">
            <div className="bg-gray-800 bg-opacity-10 rounded-lg shadow-lg p-6 min-h-full overflow-auto ">
                <IncomeForm incomeCategories={incomeCategories} projects={projects} income={parsedIncome} />
            </div>
        </div>
    )
}
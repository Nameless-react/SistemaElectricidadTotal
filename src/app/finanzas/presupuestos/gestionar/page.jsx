import { BudgetForm } from "../../../../../components/finances/budgets/budgetForm";
import projectController from "../../../../../controllers/project.controller";
import { createBudgetController } from "../../../../../controllers/factory";
export default async function Page({ searchParams }) {
    const { id } = await searchParams;

    let projectBudget = null;
    const projectService =  projectController.projectsService;
    const projectBudgetService = createBudgetController().projectBudgetService;
    const projects = await projectService.getProjects();
    if(id){
        try {
            projectBudget = await projectBudgetService.getProjectBudgetById(id)
        } catch (error) {
            console.error(error);
            return <p>Hubo un problema al cargar los datos.</p>;
        }
    }

    const parsedData = {
        amount: projectBudget?.amount,
        project: projectBudget?.id_project,
        user: projectBudget?.id_user,
        description: projectBudget?.description,
        status: projectBudget?.status,
        date: projectBudget?.date ? new Date(projectBudget.date) : null  // Parseamos la fecha si existe
    };
    
    console.log(parsedData);

    return (
        <div className="flex-1 min-h-screen sm:px-4 sm:pt-4 ">
            <div className="bg-gray-800 bg-opacity-10 rounded-lg shadow-lg p-6 min-h-full overflow-auto ">
                <BudgetForm projectBudget= {parsedData} projects={projects} />
            </div>
        </div>
    )
}

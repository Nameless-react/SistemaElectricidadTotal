
import { ExpensesManagmentTable } from '../../../../components/expensesManagment/expensesManagmentTable';
import { ExpensesFlow } from '../../../../components/expensesManagment/expenses/expensesFlow';
import { ProjectExpensesFlow } from '../../../../components/expensesManagment/expenses/expensesByProject';
import { createExpensesController, createExpensesCategoryController } from '../../../../controllers/factory';

export default async function Gastos() {
    const expensesProjectsService = createExpensesController().expensesProjectsService;
    const expensesCategoryService = createExpensesCategoryController().expenseCategoryService;
    const expensesService = createExpensesController().expensesService;
    const expenseCategories = await expensesCategoryService.getExpensesCategories()
    const expensesFlow = await expensesService.getExpensesFlow();
    const expensesProjects = await expensesProjectsService.getExpensesProjects();
    const projectExpensesFlow = await expensesProjectsService.getProjectsExpensesFlow();
 
    const columns = [
        { key: 'entry_date', label: 'Fecha' },
        { key: 'main_entity', label: 'Proyecto' },
        { key: 'summary', label: 'Descripción' },
        { key: 'classification', label: 'Categoría' },
        { key: 'total_value', label: 'Monto' },
    ];

    return (
        <div className="flex-1 min-h-screen sm:px-4 sm:pt-4 ">
                <div className="bg-gray-800 bg-opacity-10 rounded-lg shadow-lg p-6 min-h-full overflow-auto">
                    <ExpensesFlow expensesFlow={expensesFlow[0]} />
                    <ExpensesManagmentTable
                        rows={expensesProjects}
                        columnHeaders={columns}
                        categories={expenseCategories}
                        detailsLink={"/gestion-gastos/gastos/detalles"}
                    />
                    <ProjectExpensesFlow projectExpensesFlow={projectExpensesFlow} />
                </div>
        </div>
    );
}
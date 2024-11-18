
import { ExpensesManagmentTable } from '../../../../components/finances/expensesManagmentTable';
import { ProjectExpensesFlow } from '../../../../components/finances/expenses/expensesByProject';
import { createExpensesController, createExpensesCategoryController } from '../../../../controllers/factory';
import { FinancialFlow } from '../../../../components/finances/financialFlow';
import PassSucessModal from '../../../../components/modals/passSucessModal';

export default async function Gastos() {
    const expensesProjectsService = createExpensesController().expensesProjectsService;
    const expensesCategoryService = createExpensesCategoryController().expenseCategoryService;
    const expensesService = createExpensesController().expensesService;
   
    const expensesFlow = await expensesService.getExpensesFlow();
    const expensesProjects = await expensesProjectsService.getExpensesProjects();
    const projectExpensesFlow = await expensesProjectsService.getProjectsExpensesFlow();

    const expensesData = [
        {
            label: "Monto Total de Gastos",
            value: expensesFlow[0].accumulatedspending,
            color: "text-red-600", 
        },
        {
            label: "Presupuesto Total",
            value: expensesFlow[0].allocatedfunds, 
            color: "text-green-600", 
        },
    ];

    const columns = [
        { key: 'entry_date', label: 'Fecha' },
        { key: 'main_entity', label: 'Proyecto' },
        { key: 'summary', label: 'Gasto' },
        { key: 'classification', label: 'Categoría' },
        { key: 'total_value', label: 'Monto' },
        {key: 'status', label: 'Estado'}
    ];
   
    return (
        <div className="flex-1 min-h-screen sm:px-4 sm:pt-4 ">
            <div className="bg-gray-800 bg-opacity-10 rounded-lg shadow-lg p-6 min-h-full overflow-auto">
                <FinancialFlow data={expensesData} title={"Flujo de Gastos"}/>
                <PassSucessModal
                  titles={{
                    create: "Gasto Creado",
                    update: "Gasto Actualizado",
                    delete: "Gasto Eliminado",
                    createEquipment: "Equipo Creado",
                  }}
                 messages={{
                    create: "Gasto creado exitosamente",
                    update: "Gasto actualizado exitosamente",
                    delete: "Gasto eliminado exitosamente",
                    createEquipment: "Equipo creado exitosamente",
                 }}
                />
                <ExpensesManagmentTable
                    rows={expensesProjects}
                    columnHeaders={columns}
                    actionConfig={{ link: "/finanzas/gastos/gestionar", action: "Crear Gasto" }}
                    isDeletable={false}
                    detailsLink={"/finanzas/gastos/detalles"}
                />
                <ProjectExpensesFlow projectExpensesFlow={projectExpensesFlow} />
            </div>
        </div>
    );
}
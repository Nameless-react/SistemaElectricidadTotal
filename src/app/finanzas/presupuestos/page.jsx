
import { ProjectBudgetFlow } from "../../../../components/finances/budgets/projectBudgetFlow";
import { ExpensesManagmentTable } from "../../../../components/finances/expensesManagmentTable";
import { FinancialFlow } from "../../../../components/finances/financialFlow";
import PassSucessModal from "../../../../components/modals/passSucessModal";
import { createExpensesController, createBudgetController } from "../../../../controllers/factory";

export default async function Page() {
    const projectBudgetService = createBudgetController().projectBudgetService;
    const expensesService = createExpensesController().expensesService;
    const budgetFlow = await expensesService.getExpensesFlow();
    const projectBudgets = await projectBudgetService.getProjectBudgets();
    const projectBudgetFlow = await projectBudgetService.getProjectBugetsFlow();

    const budgetData = [
        {
            label: "Presupuesto Total Asignado",
            value: budgetFlow[0].allocatedfunds,
            color: "text-green-600",
        },
        {
            label: "Presupuesto Disponible",
            value: budgetFlow[0].unusedfunds,
            color: "text-yellow-600",
        },
        {
            label: "Presupuesto en Proyectos",
            value: budgetFlow[0].accummulatedprojectbudgets,
            color: "text-blue-600",
        },
    ];

    const columns = [
        { key: 'entry_date', label: 'Fecha' },
        { key: 'main_entity', label: 'Proyecto' },
        { key: 'summary', label: 'Descripción' },
        { key: 'total_value', label: 'Monto' },
        { key: 'status', label: 'Estado' }
    ];


    return (
        <div className="flex-1 min-h-screen sm:px-4 sm:pt-4 ">
            <div className="bg-gray-800 bg-opacity-10 rounded-lg shadow-lg p-6 min-h-full overflow-auto">
                <PassSucessModal
                titles={{
                    create: "Presupuesto de proyecto creado",
                    update: "Presupuesto de proyecto actualizado",
                    delete: "Presupuesto de proyecto eliminado",
                    createEquipment: "Agregar Material"
                }}
                 messages={{
                    created: "Presupuesto del proyecto guardado exitosamente",
                    updated: "Presupuesto del proyecto actualizado exitosamente",
                    deleted: "Presupuesto del proyecto eliminado exitosamente",
                    createEquipment: "Material guardado exitosamente"
                 }}
                />
                <FinancialFlow data={budgetData} title={"Flujo de Presupuestos"} />
                <ExpensesManagmentTable actionConfig={{
                    action: "Agregar Presupuesto Adicional",
                    link: "/finanzas/presupuestos/gestionar",
                    
                }} columnHeaders={columns} rows={projectBudgets}  detailsLink={"example"}  />
                <ProjectBudgetFlow projectBudgets={projectBudgetFlow}   />
            </div>
        </div>
    );
}

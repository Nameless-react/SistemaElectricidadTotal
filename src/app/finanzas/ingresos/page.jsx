import { createIncomeController, createIncomeCategoryController } from "../../../../controllers/factory";
import { ExpensesManagmentTable } from "../../../../components/finances/expensesManagmentTable";
import { FinancialFlow } from "../../../../components/finances/financialFlow";
export default async function Page() {
    const incomeService = createIncomeController().incomeService;
    const incomeCategoryService = createIncomeCategoryController().incomeCategoryService;



    let incomes = await incomeService.getIncomes();
    const incomeCategories = await incomeCategoryService.getIncomeCategories();
    incomes.forEach((income) => {
        income.id = income.idIncome;


        const date = new Date(income.incomeDate);


        income.incomeDate = date.toLocaleDateString(); // Formato local de fecha (ej. "18/11/2024" en España)


        delete income.idIncome;
    });

    const columns = [
        { key: 'incomeDate', label: 'Fecha' },
        { key: 'amount', label: 'Ingreso' },
        { key: 'description', label: 'Descripción' },
        { key: 'paymentMethod', label: 'Método de Pago' },
        { key: 'status', label: 'Estado' },
    ]

    return (

        <div className="flex-1 min-h-screen sm:px-4 sm:pt-4 ">
            <div className="bg-gray-800 bg-opacity-10 rounded-lg shadow-lg p-6 min-h-full overflow-auto">
                {/* <PassSucessModal
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
                 */}
                <FinancialFlow data={[]} title={"Ingresos de la Empresa"} />
                <ExpensesManagmentTable actionConfig={{
                    action: "Agregar Presupuesto Adicional",
                    link: "/finanzas/presupuestos/gestionar",

                }} columnHeaders={columns} rows={incomes} detailsLink={"example"} />
                {/* <ProjectBudgetFlow projectBudgets={projectBudgetFlow}   /> */}
            </div>
        </div>
    );
}

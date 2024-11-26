import { createIncomeController, createIncomeCategoryController } from "../../../../controllers/factory";
import { ExpensesManagmentTable } from "../../../../components/finances/expensesManagmentTable";
import { FinancialFlow } from "../../../../components/finances/financialFlow";
import PassSucessModal from "../../../../components/modals/passSucessModal";
export default async function Page() {
    const incomeService = createIncomeController().incomeService;
    const incomeCategoryService = createIncomeCategoryController().incomeCategoryService;



    let incomes = await incomeService.getIncomes();
    const incomeCategories = await incomeCategoryService.getIncomeCategories();
    incomes.forEach((income) => {
        income.id = income.idIncome;


        const date = new Date(income.incomeDate);


        income.incomeDate = date.toLocaleDateString();


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
                <PassSucessModal
                titles={{
                    create: "Ingreso de proyecto creado",
                    update: "Ingreso de proyecto actualizado",
                    delete: "Ingreso de proyecto eliminado",
                    createEquipment: "Material creado"
                }}
                 messages={{
                    created: "Presupuesto del proyecto guardado exitosamente",
                    updated: "Presupuesto del proyecto actualizado exitosamente",
                    deleted: "Presupuesto del proyecto eliminado exitosamente",
                    createEquipment: "Material guardado exitosamente"
                 }}
                    
                />

                <FinancialFlow data={[]} title={"Ingresos de la Empresa"} />
                <ExpensesManagmentTable actionConfig={{
                    action: "Agregar Ingreso",
                    link: "/finanzas/ingresos/gestionar",
                    linkToDelete: "/api/finance/income",
                    urlToRedirectDelete: "/finanzas/ingresos"
                }} columnHeaders={columns} rows={incomes} detailsLink={"example"} />
                {/* <ProjectBudgetFlow projectBudgets={projectBudgetFlow}   /> */}
            </div>
        </div>
    );
}

import { createIncomeController, createIncomeCategoryController } from "../../../../../controllers/factory";
import { ExpensesManagmentTable } from "../../../../../components/finances/expensesManagmentTable";
import { FinancialFlow } from "../../../../../components/finances/financialFlow";
import PassSucessModal from "../../../../../components/modals/passSucessModal";
export default async function Page() {

    const incomeCategoryService = createIncomeCategoryController().incomeCategoryService;
    let incomeCategories = await incomeCategoryService.getIncomeCategories();

    incomeCategories.forEach((incomeCategory) => {
        incomeCategory.id = incomeCategory.idIncomeCategory;
        delete incomeCategory.idIncomeCategory;
    });

    const columns = [
        { key: 'name', label: 'Nombre' },
        { key: 'description', label: 'Descripción' },
        { key: 'status', label: 'Estado' },
    ]

    return (

        <div className="flex-1 min-h-screen sm:px-4 sm:pt-4 ">
            <div className="bg-gray-800 bg-opacity-10 rounded-lg shadow-lg p-6 min-h-full overflow-auto">
                <PassSucessModal
                    titles={{
                        create: "Categoría de Ingreso creada",
                        update: "Categoría de Ingreso actualizada",
                        delete: "Categoría de Ingreso eliminada",
                        createEquipment: "Agregar Material"
                    }}
                    messages={{
                        created: "Categoría de Ingreso guardada exitosamente",
                        updated: "Categoría de Ingreso actualizada exitosamente",
                        deleted: "Categoría de Ingreso eliminada exitosamente",
                        createEquipment: "Material guardado exitosamente"
                    }}
                />

                <FinancialFlow data={[]} title={"Categorías de Ingresos"} />
                <ExpensesManagmentTable actionConfig={{
                    action: "Agregar Categoría de Ingreso",
                    link: "/finanzas/ingresos/categoria-ingresos/gestionar",
                    linkToDelete: "/api/finance/incomeCategory",
                    urlToRedirectDelete: "/finanzas/ingresos/categoria-ingresos"

                }} columnHeaders={columns} rows={incomeCategories} detailsLink={"example"} />

            </div>
        </div>
    );
}

"use server";
import { ExpensesManagmentTable } from "../../../../../components/finances/expensesManagmentTable";
import { FinancialFlow } from "../../../../../components/finances/financialFlow";
import PassSucessModal from "../../../../../components/modals/passSucessModal";
import { createExpensesCategoryController } from "../../../../../controllers/factory";

export default async function Page({ searchParams }) {
    const { id } = await searchParams;
    
    const expensesCategoryService = createExpensesCategoryController().expenseCategoryService;
    const expensesCategories = await expensesCategoryService.getExpensesCategories();

    // Ajustar IDs para el formato esperado
    expensesCategories.forEach((category) => {
        category.id = category.idExpenseCategory;
        delete category.idExpenseCategory;
    });

    const columns = [
        { key: 'name', label: 'Nombre de la Categoria' },
        { key: 'description', label: 'Descripcion' },
        { key: 'status', label: 'Estado' },
    ];

  
    return (
        <div className="flex-1 min-h-screen sm:px-4 sm:pt-4 ">
            <div className="bg-gray-800 bg-opacity-10 rounded-lg shadow-lg p-6 min-h-full overflow-auto">
                <FinancialFlow title="Categorias de Gastos" data={[]} />
                <PassSucessModal
                    titles={{
                        create: "Categoría de gasto creada",
                        update: "Categoría de gasto actualizada",
                        delete: "Categoría de gasto eliminada"
                    }}
                    messages={{
                        create: "La categoría de gasto ha sido creada exitosamente",
                        update: "La categoría de gasto ha sido actualizada exitosamente",
                        delete: "La categoría de gasto ha sido eliminada exitosamente"}}
                />
                <ExpensesManagmentTable
                    columnHeaders={columns}
                    rows={expensesCategories}
                    actionConfig={{
                        action: "Agregar Categoría",
                        link: "/finanzas/gastos/categoria-gastos/gestionar",
                        linkToDelete: "/api/finance/expenseCategory"
                    }}
                />
            </div>
        </div>
    );
}

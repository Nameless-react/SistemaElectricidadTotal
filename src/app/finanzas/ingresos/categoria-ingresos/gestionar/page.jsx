import { IncomeCategoryForm } from "../../../../../../components/finances/incomeCategory/incomeCategoryForm";
import { createIncomeCategoryController } from "../../../../../../controllers/factory";

export default async function Page({ searchParams }) {
    const incomeCategoryService = createIncomeCategoryController().incomeCategoryService;
    const { id } = await searchParams;
    let incomeCategory = null;
    try {
        if (id) {
            incomeCategory = await incomeCategoryService.getIncomeCategoryById(id);
        }
    } catch (error) {
        console.error(error);
        return <p>Hubo un problema al cargar los datos.</p>;
    }

    return (
        <div className="flex-1 min-h-screen sm:px-4 sm:pt-4 ">
            <div className="bg-gray-800 bg-opacity-10 rounded-lg shadow-lg p-6 min-h-full overflow-auto ">
                <IncomeCategoryForm incomeCategory={incomeCategory} />
            </div>
        </div>
    )
}
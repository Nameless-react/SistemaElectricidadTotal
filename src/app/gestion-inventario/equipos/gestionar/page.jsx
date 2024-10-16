import ManageTool from "../../../../../components/inventory/tools/toolsManage";
import ProviderController from "../../../../../controllers/provider.controller";
import CategoryController from "../../../../../controllers/category.controller";
import { createToolController } from "../../../../../controllers/factory";
export default async function Page({ searchParams }) {
    const { id } = searchParams;
    let tool = null;
    const providerController = new ProviderController();
    const categoryController = new CategoryController();

    const toolController = createToolController();
    try {
        const providers = await providerController.getProviders();
        if (!providers) {
            console.error("Providers not found");
            return <p>No se encontraron proveedores</p>;
        }

        const categories = await categoryController.getCategories();
        if (!categories) {
            console.error("Categories not found");
            return <p>No se encontraron categorías</p>;
        }

        if (id) {
            tool = await toolController.getToolById(id);
        }

        return (
            <ManageTool providers={providers} id={id} categories={categories} tool={tool} />
        );
    } catch (error) {
        console.error(error);
        return <p>Hubo un problema al cargar los datos.</p>;
    }
}
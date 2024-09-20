import ManageTool from "../../../../../../components/inventory/tools/toolsManage";
import ProviderController from "../../../../../../controllers/provider.controller";
import CategoryController from "../../../../../../controllers/category.controller";
export default async function ManageToolServerSide() {
    
    const providerController = new ProviderController();
    const categoryController = new CategoryController();
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

    

        return(
            <ManageTool providers={providers} categories={categories} />
        )
        
    } catch (error) {
        console.error(error);
        return <p>Hubo un problema al cargar los datos.</p>;
    }
}
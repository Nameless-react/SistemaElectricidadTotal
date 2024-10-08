import ManageMaterial from "../../../../../components/inventory/materials/materials manage";
import { ProviderController, CategoryController } from "../../../../../controllers";
import { createMaterialController } from "../../../../../controllers/factory";
export default async function GestionarMaterial({ searchParams }) {

    const { id } = searchParams;
    let material = null;
    const providerController = new ProviderController();
    const categoryController = new CategoryController();
    const materialController = createMaterialController();
    try {
        const proividers = await providerController.getProviders();
        const categories = await categoryController.getCategories();

        if (!proividers || !categories) {
            return <p>No se encontraron proveedores ni categorías</p>;
        }

        if (id) {
            material = await materialController.getMaterialById(id);
        }

        return <ManageMaterial providers={proividers} categories={categories} material={material} id={id} title={id ? 'Editar Material' : 'Agregar Material'} />;
    } catch (error) {
        console.error(error);
        return <p>Hubo un problema al cargar los datos.</p>;
    }
}
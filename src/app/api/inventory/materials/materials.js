

import { NextRequest, NextResponse } from "next/server";
import { createMaterialController } from "../../../../../controllers/factory";
import MaterialsTable from "../../../../../components/inventory/materials/materialsTable";

/*Esta funcion es un server side component para las herramientas
  El componente primero obtiene los datos de la base de datos y los renderiza en el componente Equipos. 
  Si hay un error, se muestra un mensaje de error ya sea por no ser un array o por un error en la base de datos.
*/
export default async function MaterialsServerSide() {
    const materialController = createMaterialController();
    try {
        const materials = await materialController.getMaterials();
        if (!Array.isArray(materials)) {
            console.error('Data is not an array:', materials);
            return <p>Error al cargar los datos.</p>;
        }

        if (materials.length === 0) {
            return <p>No se encontraron herramientas.</p>;
        }


        return (
           <MaterialsTable materials={materials} />
        )

    } catch (error) {
        if (error instanceof Error) {
            console.error('Error específico:', error);
        } else {
            console.error('Error general:', error);
        }
        return <p>Hubo un problema al cargar los datos.</p>;
    }
}
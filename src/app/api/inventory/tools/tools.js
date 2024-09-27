
import ToolsTable from "../../../../../components/inventory/tools/toolsTable";
import { NextRequest, NextResponse } from "next/server";
import { createToolController } from "../../../../../controllers/factory";



/*Esta funcion es un server side component para las herramientas
  El componente primero obtiene los datos de la base de datos y los renderiza en el componente Equipos. 
  Si hay un error, se muestra un mensaje de error ya sea por no ser un array o por un error en la base de datos.
*/
export default async function ToolsServerSideComponent() {
    const toolController = createToolController();
    try {

        const tools = await toolController.getTools(NextRequest, NextResponse);

        if (!Array.isArray(tools)) {
            console.error('Data is not an array:', tools);
            return <p>Error al cargar los datos.</p>;
        }

        if (tools.length === 0) {
            return <p>No se encontraron herramientas.</p>;
        }


        return <ToolsTable tools={tools} />;

    } catch (error) {
        if (error instanceof Error) {
            console.error('Error específico:', error);
        } else {
            console.error('Error general:', error);
        }
        return <p>Hubo un problema al cargar los datos.</p>;
    }
}
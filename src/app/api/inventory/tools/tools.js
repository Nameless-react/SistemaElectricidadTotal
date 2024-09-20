
import Equipos from "../../../../../components/inventory/tools/toolsTable";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { z } from "zod";
import { ToolsRepository,CategoryRepository,ProviderRepository,MaintenanceNotesRepository } from "../../../../../repositories";
import {MaintenanceNotesService,CategoryService,ProviderService,ImageService, ToolService,ValidationMaintenanceNotesService, ValidationToolsService} from "../../../../../Services";
import {ToolController} from "../../../../../controllers";
import sequelze from "../../../../../config/databaseConnection";
import { Category, Provider, Tools, MaintenanceNotes } from "../../../../../models";

const maintenanceNotesRepository = new MaintenanceNotesRepository(MaintenanceNotes);
const maintenanceNotesService = new MaintenanceNotesService(maintenanceNotesRepository);
const validationToolsService = new ValidationToolsService(z);
const validationMaintenanceNotesService = new ValidationMaintenanceNotesService(z);
const imageService = new ImageService(writeFile, path);
const categoryRepository = new CategoryRepository(Category);
const providerRepository = new ProviderRepository(Provider);
const categoryService = new CategoryService(categoryRepository);
const providerService = new ProviderService(providerRepository);
const toolsRepository = new ToolsRepository(Tools, sequelze);
const toolService = new ToolService(toolsRepository);
const toolController = new ToolController(imageService,validationToolsService, categoryService, providerService, toolService, validationMaintenanceNotesService, maintenanceNotesService);


/*Esta funcion es un server side component para las herramientas
  El componente primero obtiene los datos de la base de datos y los renderiza en el componente Equipos. 
  Si hay un error, se muestra un mensaje de error ya sea por no ser un array o por un error en la base de datos.
*/
export default async function ToolsServerSideComponent() {
    try {
        
        const tools = await toolController.getTools();

        if (!Array.isArray(tools)) {
            console.error('Data is not an array:', tools);
            return <p>Error al cargar los datos.</p>;
        }

        if (tools.length === 0) {
            return <p>No se encontraron herramientas.</p>;
        }
    
        return <Equipos tools={tools} />;

    } catch (error) {
        if (error instanceof Error) {
            console.error('Error específico:', error);
        } else {
            console.error('Error general:', error);
        }
        return <p>Hubo un problema al cargar los datos.</p>;
    }
}
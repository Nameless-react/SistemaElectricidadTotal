
import { writeFile } from "fs/promises";
import path from "path";
import { z } from "zod";
import { ToolsRepository, CategoryRepository, ProviderRepository, MaintenanceNotesRepository } from "../repositories";
import { MaintenanceNotesService, CategoryService, ProviderService, ImageService, ToolService, ValidationMaintenanceNotesService, ValidationToolsService } from "../Services";
import { ToolController } from "../controllers";
import sequelze from "../config/databaseConnection";
import { Category, Provider, Tools, MaintenanceNotes } from "../models";
export const createToolController = () => {

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

    return new ToolController(imageService, validationToolsService, categoryService, providerService, toolService, validationMaintenanceNotesService, maintenanceNotesService);
}



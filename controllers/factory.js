
import { writeFile } from "fs/promises";
import path from "path";
import { z } from "zod";
import { ToolRepository, CategoryRepository, ProviderRepository, MaintenanceNotesRepository, MaterialRepository } from "../repositories";
import { ValidationMaterialService, MaintenanceNotesService, MaterialService, CategoryService, ProviderService, ImageService, ToolService, ValidationMaintenanceNotesService, ValidationToolsService } from "../Services";
import { ToolController, MaterialController } from "../controllers";
import sequelze from "../config/databaseConnection";
import { Category, Provider, Tool, MaintenanceNotes, Material } from "../models";
import { validateMaterialsForm } from "../functions/validations/materialsValidtion";


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
    const toolRepository = new ToolRepository(Tool, sequelze);
    const toolService = new ToolService(toolRepository);
    return new ToolController(imageService, validationToolsService, categoryService, providerService, toolService, validationMaintenanceNotesService, maintenanceNotesService);
}

export const createMaterialController = () => {
    const categoryRepository = new CategoryRepository(Category);
    const providerRepository = new ProviderRepository(Provider);
    const providerService = new ProviderService(providerRepository);
    const categoryService = new CategoryService(categoryRepository);
    const materialRepository = new MaterialRepository(Material, sequelze);
    const materialService = new MaterialService(materialRepository);
    const validationMaterialService = new ValidationMaterialService(validateMaterialsForm);
    return new MaterialController(materialService, validationMaterialService, categoryService, providerService);
}



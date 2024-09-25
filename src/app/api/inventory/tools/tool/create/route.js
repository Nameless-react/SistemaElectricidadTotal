import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { z } from "zod";
import { ToolsRepository,CategoryRepository,ProviderRepository,MaintenanceNotesRepository } from "../../../../../../../repositories";
import {MaintenanceNotesService,CategoryService,ProviderService,ImageService, ToolService,ValidationMaintenanceNotesService, ValidationToolsService} from "../../../../../../../services";
import {ToolController} from "../../../../../../../controllers";
import sequelze from "../../../../../../../config/databaseConnection";
import { Category, Provider, Tools, MaintenanceNotes } from "../../../../../../../models";


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

export async function POST(request) {
    try {
        const result = await toolController.saveTool(request, NextResponse);
        if (!result) {
            return NextResponse.json({ error: "Error processing the request" }, { status: 500 });
        }
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error processing the request:', error);
        return NextResponse.json({ error: "Error processing the request" }, { status: 500 });
    }
}

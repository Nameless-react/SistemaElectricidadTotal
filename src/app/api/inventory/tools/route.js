import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';
import { writeFile } from 'fs/promises';
import path from 'path';
import { Category, MaintenanceNotes, Provider, Tools } from '../../../../../models';
import sequelze from '../../../../../config/databaseConnection';
import { ToolsRepository,CategoryRepository,MaintenanceNotesRepository,ProviderRepository } from '../../../../../repositories';
import { ImageService,CategoryService,MaintenanceNotesService,ProviderService,ToolService,ValidationMaintenanceNotesService,ValidationToolsService } from '../../../../../services';
import { ToolController } from '../../../../../controllers';

const toolsRepository = new ToolsRepository(Tools,sequelze);
const categoryRepository = new CategoryRepository(Category);
const providerRepository = new ProviderRepository(Provider);
const maintenanceNotesRepository = new MaintenanceNotesRepository(MaintenanceNotes);
const categoryService = new CategoryService(categoryRepository);
const providerService = new ProviderService(providerRepository);
const maintenanceNotesService = new MaintenanceNotesService(maintenanceNotesRepository); 
const validationToolsService = new ValidationToolsService(z);
const validationMaintenanceNotesService = new ValidationMaintenanceNotesService(z);
const imageService = new ImageService(writeFile, path);
const toolService = new ToolService(toolsRepository);
const toolController = new ToolController(imageService,validationToolsService, categoryService, providerService,toolService,validationMaintenanceNotesService,maintenanceNotesService);

export async function GET(req) {
    try {
        const tools = await toolController.getTools(NextRequest, NextResponse);
     
        if (!tools) {
            return NextResponse.json({ message: 'Tools not found' }, { status: 404 });
        }
        
        return NextResponse.json(tools, { status: 200 });

    } catch (error) {
        console.error('Error while getting tools:', error);
        return NextResponse.json({ message: 'Error while getting tools' }, { status: 500 });
    }
}
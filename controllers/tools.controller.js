class ToolController {
    constructor(imageService, validationToolsService, categoryService, providerService, toolService, validationMaintenanceNotesService, maintenanceNotesService) {
        this.imageService = imageService;
        this.validationToolsService = validationToolsService;
        this.categoryService = categoryService;
        this.providerService = providerService;
        this.toolService = toolService;
        this.validationMaintenanceNotesService = validationMaintenanceNotesService;
        this.maintenanceNotesService = maintenanceNotesService;
    }

    getTools = async () => {
        try {
            const tools = await this.toolService.getTools();

            if (!tools) {
                throw new Error("Tools not found");
            }

            return tools;
        } catch (error) {
            console.error(error);
            throw new Error("Error while getting tools");
        }
    }

    getToolById = async (id) => {
        try {
            const tool = await this.toolService.getToolById(id);
            if (!tool) {
                throw new Error("Tool not found");
            }
            return tool;
        } catch (error) {
            console.error(error);
            throw new Error("Error while getting tool");
        }
    }

    saveTool = async (req, res) => {
        try {
            const host = req.headers.get('host');
            const formData = await req.formData();
            const isChecked = formData.get('checkedMaintenanceNotes') === 'true';

            const imageUpload = await this.imageService.uploadImage(formData, 'tools/images', host);
            if (!imageUpload.success) {

                return this.sendError(res, imageUpload.error, 'image_error', 400);
            }

            const { success, data, error } = await this.validationToolsService.validateTool(formData);
            if (!success) {
                return this.sendError(res, error, "validation_error", 400);
            }
            data.image = imageUpload.imagePath;

            const categoryExists = await this.categoryService.getCategoryByName(data.category);
            const providerExists = await this.providerService.getProviderByName(data.provider);
            if (!categoryExists || !providerExists) {
                return this.sendError(res, "Category or Provider not found", "category_or_provider", 400);
            }

            const serialExists = await this.toolService.getToolBySerial(data.serial);
            if (serialExists) {
                return this.sendError(res, "El serial ya existe", "serial_error", 400);
            }

            const validatedData = this.prepareToolData(data, categoryExists, providerExists);
            const result = await this.toolService.save(validatedData);
            const toolId = parseInt(result[0][0].p_toolid);
            const successSave = result[0][0].p_success;

            if (!successSave) {
                return this.sendError(res, "Error processing the request", "save_error", 500);
            }

            if (isChecked) {
                await this.handleMaintenanceNotes(formData, toolId);
            }
            return res.json({ message: 'Tool saved successfully', result }, { status: 200 });
        } catch (error) {
            console.error(error);
            return this.sendError(res, "Error processing the request", "internal_error", 500);
        }
    }

    updateTool = async (req, res) => {
        try {
            const formData = await req.formData();
            const host = req.headers.get('host');
            const url = new URL(req.url);
            const id = url.searchParams.get("id");
            const validatedId = this.validateId(id);
            const isChecked = formData.get('checkedMaintenanceNotes') === 'true';

            const imageUpload = await this.imageService.uploadImage(formData, 'tools/images', host);
            if (!imageUpload.success) {
                return this.sendError(res, imageUpload.error, 'image_error', 400);
            }

            const { success, data, error } = await this.validationToolsService.validateTool(formData);
            if (!success) {
                return this.sendError(res, error, "validation_error", 400);
            }

            data.image = imageUpload.imagePath ? imageUpload.imagePath : data.image;

            const categoryExists = await this.categoryService.getCategoryByName(data.category);
            const providerExists = await this.providerService.getProviderByName(data.provider);
            if (!categoryExists || !providerExists) {
                return this.sendError(res, "Category or Provider not found", "category_or_provider", 400);
            }

            const toolExists = await this.toolService.getToolById(validatedId);
            if (!toolExists) {
                return this.sendError(res, "Tool not found", "tool_not_found", 400);
            }
            const serialExists = await this.toolService.getToolBySerial(data.serial);

            if (toolExists.serial !== data.serial && serialExists) {
                return this.sendError(res, "El serial ya existe", "serial_error", 400);
            }

            const validatedData = this.prepareToolData(data, categoryExists, providerExists);

            const result = await this.toolService.update(validatedData, validatedId);
            const successSave = result[0][0].p_success;
            if (!successSave) {
                return this.sendError(res, "Error while updating tool", "update_error", 500);
            }

            if (isChecked) {
                await this.handleMaintenanceNotes(formData, validatedId);
            }

            return res.json({ message: 'Tool updated successfully' }, { status: 200 });

        } catch (error) {
            console.log(error);
            return this.sendError(res, "Error processing the request", "internal_error", 500);
        }
    }

    deleteTool = async (req, res) => {
        try {
            const url = new URL(req.url);
            const id = url.searchParams.get("id");
            const validatedId = this.validateId(id);
            const result = await this.toolService.delete(validatedId);


            if (!result) {
                console.error("Error while deleting tool");
                return this.sendError(res, "Error while deleting tool", "delete_error", 500);
            }

            return res.json({ message: 'Tool deleted successfully' }, { status: 200 });

        } catch (error) {
            console.error(error);
            return this.sendError(res, "Error processing the request", "internal_error", 500);
        }
    }

    prepareToolData(data, category, provider) {
        const { name, model, serial, status, image, description, date, cost } = data;

        return {
            name,
            model,
            serial,
            status,
            image,
            description,
            date,
            cost,
            category: category.id_category,
            provider: provider.id_provider
        };
    }

    async handleMaintenanceNotes(formData, toolId) {
        const { success, data, error } = await this.validationMaintenanceNotesService.validateToolsMaintenance(formData);
        if (!success) {
            throw new Error(error);
        }

        const { notes, recoveryDate, startMaintenanceDate } = data;
        const validatedData = {
            notes,
            expected_recover_date: recoveryDate,
            maintenance_date: startMaintenanceDate,
            id_tools: toolId
        };

        const maintenanceNote = await this.maintenanceNotesService.saveMaintenanceNote(validatedData);
        if (!maintenanceNote) {
            throw new Error('Error processing the maintenance note'); // Lanza el error para que sea capturado
        }
    }
    validateId(id) {
        if (id && !isNaN(id)) {
            const numericId = parseInt(id, 10);
            return numericId;
        } else {
            return this.sendError(res, "invalid id", "id", 400);
        }
    }
    sendError(res, message, error, status) {
        const errorName = error || 'GeneralError';
        const errorResponse = {
            error: {
                [errorName]: {
                    message
                }
            }
        };

        return res.json(errorResponse, { status });
    }
}


export default ToolController;
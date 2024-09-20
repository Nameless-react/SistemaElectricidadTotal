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

    getTools = async (req, res) => {
        try {
            const tools = await this.toolService.getTools();
            console.log(tools);
            if (!tools) {
                throw new Error("Tools not found");
            }
            return tools;
        } catch (error) {
            console.error(error);
            throw new Error("Error while getting tools");
        }
    }

    saveTool = async (req, res) => {
        try {
            const formData = await req.formData();
            const isChecked = formData.get('checkedMaintenanceNotes');
            const imageUpload = await this.imageService.uploadImage(formData, 'tools/images');
            if (!imageUpload.success) {
                return this.sendError(res, imageUpload.error, 400);
            }

            const { success, data, error } = await this.validationToolsService.validateTool(formData);
            if (!success) {
                return this.sendError(res, error, 400);
            }

            const categoryExists = await this.categoryService.getCategoryByName(data.category);
            const providerExists = await this.providerService.getProviderByName(data.provider);
            if (!categoryExists || !providerExists) {
                return this.sendError(res, "Category or Provider not found", 400);
            }

            const validatedData = this.prepareToolData(data, categoryExists, providerExists);


            const result = await this.toolService.save(validatedData);
            const toolId = parseInt(result[0][0].p_toolid);
            const successSave = result[0][0].p_success;

            if (!successSave) {
                return this.sendError(res, "Error processing the request", 500);
            }

            if (isChecked === true) {
                console.log('checked');
                await this.handleMaintenanceNotes(formData, toolId);
            }

            return res.json({ message: 'Tool saved successfully', result }, { status: 200 });

        } catch (error) {
            console.error(error);
            return this.sendError(res, "Error processing the request", 500);
        }
    }

    prepareToolData(data, category, provider) {
        const { name, model, serial, status, image, description, date, cost } = data;
        return {
            name, model, serial, status, image, description, date, cost,
            category: category.id_category,
            provider: provider.id_provider
        };
    }

    async handleMaintenanceNotes(formData, toolId) {
        const { success, data, error } = await this.validationMaintenanceNotesService.validateToolsMaintenance(formData);
        if (!success) {
            throw new Error('Maintenance notes validation failed');
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
            throw new Error('Failed to save maintenance note');
        }
    }

    sendError(res, message, status) {
        return res.json({ error: message }, { status });
    }
}

export default ToolController;
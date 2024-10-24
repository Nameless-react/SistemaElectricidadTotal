class ToolController {
    /**
     * Constructor for the ToolController class.
     * @param {ImageService} imageService - Service for manipulating images.
     * @param {ValidationToolsService} validationToolsService - Service for validating tools.
     * @param {CategoryService} categoryService - Service for manipulating categories.
     * @param {ProviderService} providerService - Service for manipulating providers.
     * @param {ToolService} toolService - Service for manipulating tools.
     * @param {MaintenanceNotesService} maintenanceNotesService - Service for manipulating maintenance notes.
     * @param {ErrorHandler} errorHandler - Service for handling errors.
     */
    constructor(imageService, validationToolsService, categoryService, providerService, toolService, maintenanceNotesService, errorHandler) {
        this.imageService = imageService;
        this.validationToolsService = validationToolsService;
        this.categoryService = categoryService;
        this.providerService = providerService;
        this.toolService = toolService;
        this.maintenanceNotesService = maintenanceNotesService;
        this.errorHandler = errorHandler;
    }
    /**
     * Retrieves all tools from the database.
     * @returns {Promise<Array>} List of tools.
     * @throws Will throw an error if tools are not found or an error occurs.
     */
    getTools = async () => {
        try {
            const tools = await this.toolService.getTools();
            if (!tools) {
                throw new Error("Tools not found");
            }
            return tools;
        } catch (error) {
            console.error(error);
            throw new Error("Error al obtener las herramientas");
        }
    }
    /**
     * Retrieves a tool by its ID.
     * @param {number} id - The ID of the tool to retrieve.
     * @returns {Promise<Object>} The tool object.
     * @throws Will throw an error if the tool is not found or an error occurs.
     */
    getToolById = async (id) => {
        try {
            const tool = await this.toolService.getToolById(id);
            if (!tool) {
                throw new Error("Tool not found");
            }
            return tool;
        } catch (error) {
            console.error(error);
            throw new Error("Error al obtener la herramienta");
        }
    }
    /**
     * Saves a new tool to the database.
     * @param {Object} req - The request object containing tool data.
     * @param {Object} res - The response object to send responses.
     * @returns {Promise<Object>} Success message and result.
     * @throws Will throw an error if validation fails, or any error occurs during saving.
     */
    saveTool = async (req, res) => {
        try {
            const formData = await req.formData();
            const isChecked = formData.get('checkedMaintenanceNotes') === 'true';
            const formDataObj = Object.fromEntries(formData);
    
            const { success: imageUploadSuccess, error: imageUploadError, imagePath } = await this.imageService.uploadImageToFirebase(formData, 'tools/images');
         
            if (!imageUploadSuccess) {
                return this.errorHandler.sendError(res, imageUploadError, 'image_error', 400);
            }

            const { success, data, error } = await this.validationToolsService.validateTool(formDataObj);
            if (!success) {
                return this.errorHandler.sendError(res, error, 'validation_error', 400);
            }

            data.image = imagePath;

            const categoryExists = await this.categoryService.getCategoryByName(data.category);
            if (!categoryExists) {
                return this.errorHandler.sendError(res, "Categoría no encontrada", "category", 400);
            }
            const providerExists = await this.providerService.getProviderByName(data.provider);
            if (!providerExists) {
                return this.errorHandler.sendError(res, "Proveedor no encontrado", "provider", 400);
            }

            const serialExists = await this.toolService.getToolBySerial(data.serial);
            if (serialExists) {
                return this.errorHandler.sendError(res, "El serial ya existe", "serial_error", 400);
            }

            const validatedData = this.toolService.prepareToolData(data, categoryExists, providerExists);
            const result = await this.toolService.save(validatedData);
            const toolId = parseInt(result[0][0].p_toolid);
            const successSave = result[0][0].p_success;

            if (!successSave) {
                return this.errorHandler.sendError(res, "Error al procesar la solicitud", "save_error", 500);
            }

            if (isChecked) {
                await this.maintenanceNotesService.handleMaintenanceNotes(formData, toolId);
            }
            return res.json({ message: 'Herramienta guardada exitosamente', result }, { status: 200 });
        } catch (error) {
            console.error(error);
            return this.errorHandler.sendError(res, "Error al procesar la solicitud", "internal_server_error", 500);
        }
    }

    /**
     * Updates an existing tool in the database.
     * @param {Object} req - The request object containing updated tool data.
     * @param {Object} res - The response object to send responses.
     * @returns {Promise<Object>} Success message.
     * @throws Will throw an error if validation fails, the tool is not found, or any error occurs during updating.
     */
    updateTool = async (req, res) => {
        try {
            
            const formData = await req.formData();
            const url = new URL(req.url);
            const id = parseInt(url.searchParams.get("id"));
            const isChecked = formData.get('checkedMaintenanceNotes') === 'true';
            const formDataObj = Object.fromEntries(formData);
            const { success: imageUploadSuccess, error: imageUploadError, imagePath } = await this.imageService.uploadImageToFirebase(formData, 'tools/images');
            if (!imageUploadSuccess) {
                return this.errorHandler.sendError(res, imageUploadError, 'image_error', 400);
            }

            const { success, data, error } = await this.validationToolsService.validateTool(formDataObj);
            if (!success) {
                return this.errorHandler.sendError(res, error, 'validation_error', 400);
            }

            data.image = imagePath ? imagePath : data.image;

            const categoryExists = await this.categoryService.getCategoryByName(data.category);
            if (!categoryExists) {
                return this.errorHandler.sendError(res, "Categoría no encontrada", "category", 404);
            }

            const providerExists = await this.providerService.getProviderByName(data.provider);
            if (!providerExists) {
                return this.errorHandler.sendError(res, "Proveedor no encontrado", "provider", 404);
            }

            const toolExists = await this.toolService.getToolById(id);
            if (!toolExists) {
                return this.errorHandler.sendError(res, "Herramienta no encontrada", "tool", 404);
            }

            const serialExists = await this.toolService.getToolBySerial(data.serial);
            if (toolExists.serial !== data.serial && serialExists) {
                return this.errorHandler.sendError(res, "El serial ya existe", "serial_error", 400);
            }

            const validatedData = this.toolService.prepareToolData(data, categoryExists, providerExists, id);
            const result = await this.toolService.update(validatedData);
            const successSave = result[0][0].p_success;

            if (!successSave) {
                return this.errorHandler.sendError(res, "Error al actualizar la herramienta", "update_error", 500);
            }

            if (isChecked) {
                await this.maintenanceNotesService.handleMaintenanceNotes(formData, id);
            }

            return res.json({ message: 'Herramienta actualizada exitosamente' }, { status: 200 });
        } catch (error) {
            console.error(error);
            return this.errorHandler.sendError(res, "Error al procesar la solicitud", "internal_server_error", 500);
        }
    }
    /**
     * Deletes a tool from the database.
     * @param {Object} req - The request object containing the tool ID.
     * @param {Object} res - The response object to send responses.
     * @returns {Promise<Object>} Success message.
     * @throws Will throw an error if the tool is not found or any error occurs during deletion.
     */
    deleteTool = async (req, res) => {
        try {
            
            const url = new URL(req.url);
            const id = parseInt(url.searchParams.get("id"));
            const result = await this.toolService.delete(id);

            if (!result) {
                //console.error("Error al eliminar la herramienta");
                return this.errorHandler.sendError(res, "Error al eliminar la herramienta", "internal_server_error", 500);
            }
            return res.json({ message: 'Herramienta eliminada exitosamente' }, { status: 200 });

        } catch (error) {
            //console.error(error);
            return this.errorHandler.sendError(res, "Error al procesar la solicitud", "internal_server_error", 500);
        }
    }
}
export default ToolController;

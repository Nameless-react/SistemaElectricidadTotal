class MaterialController {
    /**
     * Constructor for MaterialController
     * @param {Object} materialService - Service to handle logic related to materials.
     * @param {Object} validationMaterialService - Service to validate material data.
     * @param {Object} categoryService - Service to handle categories.
     * @param {Object} providerService - Service to handle providers.
     * @param {Object} errorHandler - Service to handle errors and send appropriate responses.
     */
    constructor(materialService, validationMaterialService, categoryService, providerService, errorHandler) {
        this.materialService = materialService;
        this.validationMaterialService = validationMaterialService;
        this.categoryService = categoryService;
        this.providerService = providerService;
        this.errorHandler = errorHandler;
    }

    /**
     * Retrieves all materials.
     * @returns {Promise<Array>} - Returns a list of materials.
     * @throws {Error} - If an error occurs while retrieving materials.
     */
    getMaterials = async () => {
        try {
            const materials = await this.materialService.getMaterials();
            if (!materials) {
                throw new Error("No se encontraron materiales");
            }
            return materials;
        } catch (error) {
            console.error(error);
            throw new Error("Error al obtener los materiales");
        }
    }

    /**
     * Retrieves a material by its ID.
     * @param {number} id - ID of the material.
     * @returns {Promise<Object>} - Returns the found material.
     * @throws {Error} - If an error occurs while retrieving the material.
     */
    getMaterialById = async (id) => {
        try {
            const material = await this.materialService.getMaterialById(id);
            if (!material) {
                throw new Error("No se encontró el material");
            }
            return material;
        } catch (error) {
            console.error(error);
            throw new Error("Error al obtener el material");
        }
    }

    /**
     * Saves a new material.
     * @param {Object} req - HTTP request with the material data in JSON format.
     * @param {Object} res - HTTP response.
     * @returns {Promise<void>} - Returns a JSON response indicating success or failure.
     */
    saveMaterial = async (req, res) => {
        try {
            
            const formData = await req.json();
            const { success, error, data } = await this.validationMaterialService.validateMaterial(formData);
            if (!success) {
                return this.errorHandler.sendError(res, error, "validation_error", 400);
            }

            const categoryExists = await this.categoryService.getCategoryByName(data.category);
            if (!categoryExists) {
                return this.errorHandler.sendError(res, "Categoría no encontrada", "category", 404);
            }

            const providerExists = await this.providerService.getProviderByName(data.provider);
            if (!providerExists) {
                return this.errorHandler.sendError(res, "Proveedor no encontrado", "provider", 404);
            }

            const materialData = this.materialService.prepareMaterialData(data, categoryExists, providerExists);

            const result = await this.materialService.save(materialData);
            const successSave = result[0][0].p_success;
            if (!successSave) {
                return this.errorHandler.sendError(res, "Error al procesar la solicitud", "internal_server_error", 500);
            }

            return res.json({ message: "Material guardado exitosamente" });
        } catch (error) {
            console.error(error);
            return this.errorHandler.sendError(res, "Error al procesar la solicitud", "internal_server_error", 500);
        }
    };

    /**
     * Updates an existing material.
     * @param {Object} req - HTTP request with the material data in JSON format.
     * @param {Object} res - HTTP response.
     * @returns {Promise<void>} - Returns a JSON response indicating success or failure.
     */
    updateMaterial = async (req, res) => {
        try {
          
            const url = new URL(req.url);
            const formData = await req.json();
            const id = parseInt(url.searchParams.get("id"));

            const { success, error, data } = await this.validationMaterialService.validateMaterial(formData);
            if (!success) {
                return this.errorHandler.sendError(res, error, "validation_error", 400);
            }

            const categoryExists = await this.categoryService.getCategoryByName(data.category);
            if (!categoryExists) {
                return this.errorHandler.sendError(res, "Categoría no encontrada", "category", 404);
            }

            const providerExists = await this.providerService.getProviderByName(data.provider);
            if (!providerExists) {
                return this.errorHandler.sendError(res, "Proveedor no encontrado", "provider", 404);
            }

            const materialData = this.materialService.prepareMaterialData(data, categoryExists, providerExists, id);

            const result = await this.materialService.update(materialData);
            const successSave = result[0][0].p_success;
            if (!successSave) {
                return this.errorHandler.sendError(res, "Error al procesar la solicitud", "internal_server_error", 500);
            }

            return res.json({ message: "Material actualizado exitosamente" });

        } catch (error) {
            console.error(error);
            return this.errorHandler.sendError(res, "Error al procesar la solicitud", "internal_server_error", 500);
        }
    }

    /**
     * Deletes a material by its ID.
     * @param {Object} req - HTTP request to delete the material.
     * @param {Object} res - HTTP response.
     * @returns {Promise<void>} - Returns a JSON response indicating success or failure.
     */
    deleteMaterial = async (req, res) => {
        try {
           
            const url = new URL(req.url);
            const id = url.searchParams.get("id");

            const result = await this.materialService.delete(parseInt(id));

            if (!result) {
                return this.errorHandler.sendError(res, "Error al eliminar el material", "internal_server_error", 500);
            }

            return res.json({ message: 'Material eliminado exitosamente' }, { status: 200 });

        } catch (error) {
            console.error(error);
            return this.errorHandler.sendError(res, "Error al procesar la solicitud", "internal_server_error", 500);
        }
    }
}

export default MaterialController;

class MaterialController {
    constructor(materialService, validationMaterialService, categoryService, providerService) {
        this.materialService = materialService;
        this.validationMaterialService = validationMaterialService;
        this.categoryService = categoryService;
        this.providerService = providerService;
    }

    getMaterials = async () => {
        try {
            const materials = await this.materialService.getMaterials();
            if (!materials) {
                throw new Error("Materials not found");
            }
            return materials;
        } catch (error) {
            console.error(error);
            throw new Error("Error while getting materials");
        }
    }

    getMaterialById = async (id) => {
        try {
            const material = await this.materialService.getMaterialById(id);
            if (!material) {
                throw new Error("Material not found");
            }
            return material;
        } catch (error) {
            console.error(error);
            throw new Error("Error while getting material");
        }
    }

    saveMaterial = async (req, res) => {
        try {
            const formData = await req.json();
            const { success, error, data } = await this.validationMaterialService.validateMaterial(formData);
            if (!success) {
                return this.sendError(res, error, "validation_error", 400);
            }

            const categoryExists = await this.categoryService.getCategoryByName(data.category);
            if (!categoryExists) {
                return this.sendError(res, "Category not found", "category", 404);
            }
            const providerExists = await this.providerService.getProviderByName(data.provider);
            if (!providerExists) {
                return this.sendError(res, "Provider not found", "provider", 404);
            }

            const materialData = this.prepareMaterialData(data, categoryExists, providerExists);

            const result = await this.materialService.save(materialData);
            const toolId = parseInt(result[0][0].p_materialId);
            const successSave = result[0][0].p_success;
            if (!successSave) {
                return this.sendError(res, "Error processing the request", "internal_error", 500);
            }

            return res.json({ message: "Material saved successfully" });

        } catch (error) {
            console.error(error);
            return this.sendError(res, "Error processing the request", "internal_error", 500);
        }
    };

    updateMaterial = async (req, res) => {
        try {
            const url = new URL(req.url);
            const formData = await req.json();
            console.log(formData);

            const id = url.searchParams.get("id");
            const { success, error, data } = await this.validationMaterialService.validateMaterial(formData);
            if (!success) {
                return this.sendError(res, error, "validation_error", 400);
            }

            const categoryExists = await this.categoryService.getCategoryByName(data.category);
            if (!categoryExists) {
                return this.sendError(res, "Category not found", "category", 404);
            }
            const providerExists = await this.providerService.getProviderByName(data.provider);
            if (!providerExists) {
                return this.sendError(res, "Provider not found", "provider", 404);
            }

            const materialData = this.prepareMaterialData(data, categoryExists, providerExists);

            const result = await this.materialService.update(materialData, id);
            const successSave = result[0][0].p_success;
            if (!successSave) {
                return this.sendError(res, "Error processing the request", "internal_error", 500);
            }

            return res.json({ message: "Material updated successfully" });
        } catch (error) {
            console.error(error);
            return this.sendError(res, "Error processing the request", "internal_error", 500);
        }
    }


    deleteMaterial = async (req, res) => {
        try {
            const url = new URL(req.url);
            const id = url.searchParams.get("id");
            const validatedId = this.validateId(id);
            const result = await this.materialService.delete(validatedId);

            if (!result) {
                console.error("Error while deleting material");
                return this.sendError(res, "Error while deleting material", "delete_error", 500);
            }

            return res.json({ message: 'Material deleted successfully' }, { status: 200 });

        } catch (error) {
            console.error(error);
            return this.sendError(res, "Error processing the request", "internal_error", 500);
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

    prepareMaterialData(data, category, provider) {
        const { name, description, cost, stock, expiration, date, status } = data;
        return {
            name,
            description,
            cost,
            stock,
            status: status === "Activo" ? true : false,
            expiration,
            date,
            category: category.id_category,
            provider: provider.id_provider
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

export default MaterialController;
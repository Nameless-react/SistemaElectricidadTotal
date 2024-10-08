class MaterialRepository {

    constructor(material, sequelize) {
        this.material = material;
        this.sequelize = sequelize;
    }

    async getMaterials() {
        try {
            const materials = await this.sequelize.query("SELECT * FROM materials_view", { type: this.sequelize.QueryTypes.SELECT });
            if (!materials) {
                throw new Error("Materials not found");
            }
            return materials;
        } catch (error) {
            console.error(error);
            throw new Error(error, "Error while getting materials");
        }
    }

    async getMaterialById(id) {
        try {
            const material = await this.sequelize.query("SELECT * FROM material_view WHERE id = :p_id", { replacements: { p_id: id }, type: this.sequelize.QueryTypes.SELECT });
            if (!material) {
                throw new Error("Material not found");
            }
            return material[0];
        } catch (error) {
            console.error(error);
            throw new Error(error, "Error while getting material");
        }
    }


    async saveMaterial(material) {
        try {
            const result = await this.sequelize.query('CALL save_material(:p_name, :p_stock, :p_is_available, :p_description, :p_expiration_date ,:p_id_category, :p_id_provider, :p_price, :p_last_purchase_date ,:p_materialId, :p_Success)',
                {
                    replacements: {
                        p_name: material.name,
                        p_stock: material.stock,
                        p_is_available: material.status,
                        p_description: material.description,
                        p_expiration_date: material.expiration,
                        p_id_category: material.category,
                        p_id_provider: material.provider,
                        p_price: material.cost,
                        p_last_purchase_date: material.date,
                        p_materialId: null,
                        p_Success: null
                    },
                    type: this.sequelize.QueryTypes.RAW
                });
            return result;

        } catch (error) {
            console.error(error);
            throw new Error(error, "Error while saving material");
        }
    }


    async updateMaterial(material, id) {
       
        try {
            const result = await this.sequelize.query('CALL update_material(:p_idMaterial, :p_name, :p_stock, :p_is_available, :p_description, :p_expiration_date ,:p_id_category, :p_id_provider, :p_price, :p_last_purchase_date ,:p_Success)',
                {
                    replacements: {
                        p_idMaterial: id,
                        p_name: material.name,
                        p_stock: material.stock,
                        p_is_available: material.status,
                        p_description: material.description,
                        p_expiration_date: material.expiration,
                        p_id_category: material.category,
                        p_id_provider: material.provider,
                        p_price: material.cost,
                        p_last_purchase_date: material.date,
                        p_Success: null
                    },
                }
            );

            return result;
        } catch (error) {
            console.error(error);
            throw new Error(error, "Error while updating material");
        }
    }

    async deleteMaterial(id) {
        try {
            const result = await this.material.update({ is_available: false }, { where: { id_materials: id } });
            return result;
        } catch (error) {
            console.error('Error processing the request:', error);
            throw new Error("Error while deleting tool");
        }
    }
}

export default MaterialRepository;
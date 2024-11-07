class MaterialRepository {
    /**
     * Constructor for the MaterialRepository class.
     * @param {Model} material - Instance of the Material model.
     * @param {Sequelize} sequelize - Sequelize instance to interact with the database.
     */
    constructor(material, sequelize) {
        this.material = material;
        this.sequelize = sequelize;
    }

    /**
     * Retrieves all materials from the database.
     * @returns {Promise<Array<Material>>} A promise that resolves to an array of Material objects if the query is successful, or null if no materials are found.
     * @throws {Error} If an error occurs while connecting to the database or executing the query.
     */
    async getMaterials() {
        try {
            const materials = await this.sequelize.query("SELECT * FROM materials_view", { type: this.sequelize.QueryTypes.SELECT });
            if (!materials || materials.length === 0) {
                // console.log("No materials found");
                return null; // Return null if no materials are found
            }
            return materials;
        } catch (error) {
            console.error('An error occurred while getting materials:', error);
            throw new Error('Error al obtener los materiales.');
        }
    }

/**
 * Retrieves a material by its ID from the database.
 *
 * @param {number} id The ID of the material to retrieve.
 * @returns {Promise<Object>} The material object with the given ID, or null if not found.
 * @throws {Error} If an error occurs while trying to retrieve the material.
 */
    async getMaterialById(id) {
        try {
            const material = await this.sequelize.query("SELECT * FROM material_view WHERE id = :p_id", { replacements: { p_id: id }, type: this.sequelize.QueryTypes.SELECT });
            if (!material || material.length === 0) {
                // console.log("Material not found");
                return null; // Return null if the material is not found
            }
            return material[0];
        } catch (error) {
            console.error('An error occurred while getting material:', error);
            throw new Error('Error al obtener el material.');
        }
    }

    /**
     * Saves a material to the database.
     * @param {Object} material An object with the material's data. It should have the following properties:
     * - name (string): The name of the material.
     * - stock (number): The current stock of the material.
     * - status (boolean): The status of the material, where true means it is available and false means it is not.
     * - description (string): A description of the material.
     * - expiration (Date): The expiration date of the material.
     * - category (number): The ID of the material's category.
     * - provider (number): The ID of the material's provider.
     * - cost (number): The cost of the material.
     * - date (Date): The date of the material's last purchase.
     * @returns {Promise<Object>} A promise that resolves to an object with the result of the query if the material is saved successfully, or null if an error occurs.
     * @throws {Error} If an error occurs while trying to save the material.
     */
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
            console.error('An error occurred while saving material:', error);
            throw new Error('Error al guardar el material.');
        }
    }

    /**
     * Updates a material in the database.
     * @param {Object} material An object with the material's data to update. It should have the following properties:
     * - name (string): The name of the material.
     * - stock (number): The current stock of the material.
     * - status (boolean): The status of the material, where true means it is available and false means it is not.
     * - description (string): A description of the material.
     * - expiration (Date): The expiration date of the material.
     * - category (number): The ID of the material's category.
     * - provider (number): The ID of the material's provider.
     * - cost (number): The cost of the material.
     * - date (Date): The date of the material's last purchase.
     * @param {number} id The ID of the material to update.
     * @returns {Promise<Object>} A promise that resolves to an object with the result of the query if the material is updated successfully, or null if an error occurs.
     * @throws {Error} If an error occurs while trying to update the material.
     */
    async updateMaterial(material) {
        try {
            const result = await this.sequelize.query('CALL update_material(:p_idMaterial, :p_name, :p_stock, :p_is_available, :p_description, :p_expiration_date ,:p_id_category, :p_id_provider, :p_price, :p_last_purchase_date ,:p_Success)',
                {
                    replacements: {
                        p_idMaterial:  material.id_material,
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
            console.error('An error occurred while updating material:', error);
            throw new Error('Error al actualizar el material.');
        }
    }

    /**
     * Deletes a material from the database.
     * @param {number} id The ID of the material to delete.
     * @returns {Promise<Object>} A promise that resolves to an object with the result of the query if the material is deleted successfully, or null if an error occurs.
     * @throws {Error} If an error occurs while trying to delete the material.
     */
    async deleteMaterial(id) {
        try {
            const result = await this.material.update({ is_available: false }, { where: { id_materials: id } });
            return result;
        } catch (error) {
            console.error('An error occurred while deleting material:', error);
            throw new Error('Error al eliminar el material.');
        }
    }
}

export default MaterialRepository;

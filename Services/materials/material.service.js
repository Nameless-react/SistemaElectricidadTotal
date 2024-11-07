class MaterialService {
    constructor(materialRepository) {
        this.materialRepository = materialRepository;
    }

    /**
     * Retrieves all materials from the database.
     * @returns {Promise<Array<Object>>} A promise that resolves to an array of material objects if the query is successful, or null if no materials are found.
     * @throws {Error} If an error occurs while trying to retrieve the materials.
     */
    async getMaterials() {
        return await this.materialRepository.getMaterials();
    }

    /**
     * Retrieves a material by its ID from the database.
     * 
     * @param {number} id The ID of the material to retrieve.
     * @returns {Promise<Object>} The material object with the given ID, or null if not found.
     * @throws {Error} If an error occurs while trying to retrieve the material.
     */
    async getMaterialById(id) {
        return await this.materialRepository.getMaterialById(id);
    }

   
    /**
     * Saves a material to the database.
     * @param {Object} formData An object with the material's data to save. It should have the following properties:
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
    async save(formData) {
        return await this.materialRepository.saveMaterial(formData);
    }

/**
 * Updates a material in the database.
 * 
 * @param {Object} formData An object containing the updated material data.
 * @param {number} id The id of the material to be updated.
 * @returns {Promise<void>}
 */
    async update(formData, id) {
        return await this.materialRepository.updateMaterial(formData);
    }

    /**
     * Deletes a material by its id.
     * @param {number} id The id of the material to be deleted.
     * @returns {Promise<void>}
     */
    async delete(id) {
        return await this.materialRepository.deleteMaterial(id);
    }

    /**
     * Prepares a material object to be saved in the database.
     * @param {Object} data An object with the material's data.
     * @param {Object} category An object with the category's data.
     * @param {Object} provider An object with the provider's data.
     * @returns {Object} An object with the material's data ready to be saved in the database.
     */
    prepareMaterialData(data, category, provider, id) {
        const { name, description, cost, stock, expiration, date, status } = data;
        return {
            id_material: id,
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

}

export default MaterialService;
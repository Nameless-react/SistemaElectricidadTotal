class ToolService {
    constructor(toolsRepository) {
        this.toolsRepository = toolsRepository;
    }

    /**
     * Retrieves all tools from the database.
     * @returns {Promise<Array<Tool>>} A promise that resolves with an array of Tool objects.
     */
    async getTools() {
        return await this.toolsRepository.getTools();
    }


    /**
     * Retrieves a tool by its ID from the database.
     * @param {number} id The ID of the tool to retrieve.
     * @returns {Promise<Object>} A promise that resolves to the tool object with the given ID, or null if not found.
     */
    async getToolById(id) {
        return await this.toolsRepository.getToolById(id)
    }

    /**
     * Retrieves a tool by its serial number from the database.
     * @param {string} serial The serial number of the tool to retrieve.
     * @returns {Promise<Object | false>} A promise that resolves to the tool object with the given serial number, or false if not found.
     */
    async getToolBySerial(serial) {
        return await this.toolsRepository.getToolBySerial(serial);
    }

    /**
     * Saves a tool to the database.
     * @param {Object} formData The form data to be saved.
     * @returns {Promise<Object>} A promise that resolves to the result of the query if the tool is saved successfully.
     * @throws {Error} If an error occurs while saving the tool.
     */
    async save(formData) {
        return await this.toolsRepository.saveTool(formData);
    }

    /**
     * Updates a tool in the database.
     * @param {Object} formData The form data containing the tool's updated information.
     * @returns {Promise<Object>} A promise that resolves to the result of the query if the tool is updated successfully.
     * @throws {Error} If an error occurs while updating the tool.
     */
    async update(formData) {
        return await this.toolsRepository.updateTool(formData);
    }

    /**
     * Deletes a tool from the database.
     * @param {number} id The ID of the tool to delete.
     * @returns {Promise<Object>} A promise that resolves to the result of the query if the tool is deleted successfully.
     * @throws {Error} If an error occurs while trying to delete the tool.
     */
    async delete(id) {
        return await this.toolsRepository.deleteTool(id);
    }

    /**
     * Prepares a tool object to be saved in the database.
     * @param {Object} data An object with the tool's data.
     * @param {Object} category An object with the category's data.
     * @param {Object} provider An object with the provider's data.
     * @param {number} id The ID of the tool to save.
     * @returns {Object} An object with the tool's data ready to be saved in the database.
     */
    prepareToolData(data, category, provider, id) {
        const { name, model, serial, status, image, description, date, cost } = data;

        return {
            id_tool: id,
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
}

export default ToolService;
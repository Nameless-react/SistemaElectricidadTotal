class ToolRepository {
    /**
     * Creates a new ToolRepository instance.
     * @param {Model} tool - The Sequelize model for the Tool table.
     * @param {Sequelize} sequelize - The Sequelize instance for the database connection.
     */
    constructor(tool, sequelize) {
        this.tool = tool;
        this.sequelize = sequelize;
    }

    /**
     * Retrieves all tools from the database.
     * @returns {Promise<Array<Tool>>} A promise that resolves to an array of Tool objects if the query is successful, or null if no tools are found.
     * @throws {Error} If an error occurs while connecting to the database or executing the query.
     */
    async getTools() {
        try {
            const tools = await this.sequelize.query("SELECT * FROM tools_view", { type: this.sequelize.QueryTypes.SELECT });

            if (!tools || tools.length === 0) {
                // console.log("No tools found");
                return null; // Return null if no tools are found
            }

            return tools;
        } catch (error) {
            console.error("Error while getting tools:", error);
            throw new Error("Error al obtener las herramientas.");
        }
    }

    /**
     * Retrieves a tool by its ID from the database.
     * @param {number} id The ID of the tool to retrieve.
     * @returns {Promise<Object>} The tool object with the given ID, or null if not found.
     * @throws {Error} If an error occurs while trying to retrieve the tool.
     */
    async getToolById(id) {
        try {
            const tool = await this.sequelize.query("SELECT * FROM tool_view WHERE id = :p_id", { replacements: { p_id: id }, type: this.sequelize.QueryTypes.SELECT });
            if (!tool || tool.length === 0) {
                // console.log("Tool not found");
                return null; // Return null if the tool is not found
            }
            return tool[0];
        } catch (error) {
            console.error("Error while getting tool:", error);
            throw new Error("Error al obtener la herramienta.");
        }
    }

    /**
     * Retrieves a tool by its serial number from the database.
     * @param {string} serial The serial number of the tool to retrieve.
     * @returns {Promise<Object | false>} The tool object with the given serial number, or false if not found.
     * @throws {Error} If an error occurs while trying to retrieve the tool.
     */
    async getToolBySerial(serial) {
        try {
            const tool = await this.tool.findOne({ where: { serial_number: serial } });
            return tool ? tool.dataValues : false;
        } catch (error) {
            console.error("Error while querying the database:", error);
            throw new Error("Error while querying the database.");
        }
    }

/**
 * Saves a tool to the database.
 * 
 * @param {Object} formData An object containing the tool's data:
 * - name (string): The name of the tool.
 * - model (string): The model of the tool.
 * - serial_number (string): The serial number of the tool.
 * - status (boolean): The status of the tool.
 * - image (string): The image of the tool.
 * - description (string): The description of the tool.
 * - id_category (number): The ID of the tool's category.
 * - id_provider (number): The ID of the tool's provider.
 * - last_purchase_date (Date): The last purchase date of the tool.
 * - price (number): The cost of the tool.
 * 
 * @returns {Promise<Object>} A promise that resolves to the result of the query if the tool is saved successfully.
 * @throws {Error} If an error occurs while saving the tool.
 */
    async saveTool(formData) {
        try {
            const result = await this.sequelize.query('CALL save_tool(:p_name, :p_model, :p_serial_number, :p_status, :p_image, :p_description, :p_id_category, :p_id_provider, :p_last_purchase_date, :p_price, :p_toolId, :p_Success)', {
                replacements: {
                    p_name: formData.name,
                    p_model: formData.model,
                    p_serial_number: formData.serial,
                    p_status: formData.status,
                    p_image: formData.image,
                    p_description: formData.description,
                    p_id_category: formData.category,
                    p_id_provider: formData.provider,
                    p_last_purchase_date: formData.date,
                    p_price: formData.cost,
                    p_toolId: null,
                    p_Success: null
                },
                type: this.sequelize.QueryTypes.RAW
            });

            return result;

        } catch (error) {
            console.error("Error while saving tool:", error);
            throw new Error("Error al guardar la herramienta.");
        }
    }

/**
 * Updates a tool in the database.
 * 
 * @param {Object} formData An object containing the tool's data to update:
 * - name (string): The name of the tool.
 * - model (string): The model of the tool.
 * - serial_number (string): The serial number of the tool.
 * - status (boolean): The status of the tool.
 * - image (string): The image of the tool.
 * - description (string): The description of the tool.
 * - id_category (number): The ID of the tool's category.
 * - id_provider (number): The ID of the tool's provider.
 * - last_purchase_date (Date): The last purchase date of the tool.
 * - price (number): The cost of the tool.
 * 
 * @param {number} id The ID of the tool to update.
 * @returns {Promise<Object>} A promise that resolves to the result of the query if the tool is updated successfully.
 * @throws {Error} If an error occurs while updating the tool.
 */
    async updateTool(formData) {
        try {
            const result = await this.sequelize.query('CALL update_tool(:p_toolId, :p_name, :p_model, :p_serial_number, :p_status, :p_image, :p_description, :p_id_category, :p_id_provider, :p_last_purchase_date, :p_price, :p_Success)', {
                replacements: {
                    p_toolId: formData.id_tool,
                    p_name: formData.name,
                    p_model: formData.model,
                    p_serial_number: formData.serial,
                    p_status: formData.status,
                    p_image: formData.image,
                    p_description: formData.description,
                    p_id_category: formData.category,
                    p_id_provider: formData.provider,
                    p_last_purchase_date: formData.date,
                    p_price: formData.cost,
                    p_Success: null
                }
            });

            return result;

        } catch (error) {
            console.error("Error while updating tool:", error);
            throw new Error("Error al actualizar la herramienta.");
        }
    }

    /**
     * Deletes a tool from the database.
     * @param {number} id The ID of the tool to delete.
     * @returns {Promise<Object>} A promise that resolves to the result of the query if the tool is deleted successfully.
     * @throws {Error} If an error occurs while trying to delete the tool.
     */
    async deleteTool(id) {
        try {
            const result = await this.tool.update({ status: "No Disponible" }, { where: { id_tools: id } });
            return result;
        } catch (error) {
            console.error("Error while deleting tool:", error);
            throw new Error("Error al eliminar la herramienta.");
        }
    }
}

export default ToolRepository;

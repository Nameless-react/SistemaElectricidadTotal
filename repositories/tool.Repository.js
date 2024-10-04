
class ToolRepository {

    constructor(tool, sequelize) {
        this.tool = tool;
        this.sequelize = sequelize;
    }

    async getTools() {
        try {
            const tools = await this.sequelize.query("SELECT * FROM tools_view", { type: this.sequelize.QueryTypes.SELECT });

            if (!tools) {
                throw new Error("Tools not found");
            }

            return tools;
        } catch (error) {
            throw new Error(error, "Error while getting tools");
        }
    }

    async getToolById(id) {
        try {
            const tool = await this.sequelize.query("SELECT * FROM tooL_view WHERE id = :p_id", { replacements: { p_id: id }, type: this.sequelize.QueryTypes.SELECT });
            if (!tool) {
                throw new Error("Tool not found");
            }
            return tool[0];
        } catch (error) {
            throw new Error(error, "Error while getting tool");
        }
    }

    async getToolBySerial(serial) {
        try {
            const tool = await this.tool.findOne({ where: { serial_number: serial } });
            return tool ? tool.dataValues : false;
        } catch (error) {
            console.error("Error while querying the database", error);
            throw new Error("Error while querying the database");
        }
    }

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
            console.error('Error processing the request:', error);
            throw new Error("Error while saving tool");
        }
    }


    async updateTool(formData, id) {

        try {
            const result = await this.sequelize.query('CALL update_tool(:p_toolId, :p_name, :p_model, :p_serial_number, :p_status, :p_image, :p_description, :p_id_category, :p_id_provider, :p_last_purchase_date, :p_price, :p_Success)', {
                replacements: {
                    p_toolId: id,
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
            })

            return result;

        } catch (error) {
            console.error("Error processing the request", error)
            throw new Error("Error while updating tool")
        }
    }

    async deleteTool(id) {

        try {
            const result = await this.tool.update({ status: "No Disponible" }, { where: { id_tools: id } });
            return result;
        } catch (error) {
            console.error('Error processing the request:', error);
            throw new Error("Error while deleting tool");
        }
    }
}

export default ToolRepository;
import sequelze from "../config/databaseConnection";

class ToolsRepository {

    async getTools() {
        try {
            const tools = await sequelze.query("SELECT * FROM tools_view", { type: sequelze.QueryTypes.SELECT });
            if (!tools) {
                throw new Error("Tools not found");
            }
            return tools;
        } catch (error) {
            throw new Error(error, "Error while getting tools");
        }
    }
}

export default ToolsRepository;
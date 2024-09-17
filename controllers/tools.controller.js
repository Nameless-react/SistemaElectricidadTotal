import { Tools } from '../models/index';

class ToolsController {

    constructor(toolsRepository) {
        this.toolsRepository = toolsRepository;
    }

    getTools = async (req, res) => {
        try {
            const tools = await this.toolsRepository.getTools();
            return tools;
        } catch (error) {
            throw new Error(error, "Error while getting tools");
        }
    }
}

export default ToolsController;
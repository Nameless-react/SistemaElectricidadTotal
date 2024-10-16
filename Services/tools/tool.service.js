class ToolService {
    constructor(toolsRepository) {
        this.toolsRepository = toolsRepository;
    }

    async getTools() {
        return await this.toolsRepository.getTools();
    }


    async getToolById(id) {
        return await this.toolsRepository.getToolById(id)
    }

    async getToolBySerial(serial) {
        return await this.toolsRepository.getToolBySerial(serial);
    }

    async save(formData) {
        return await this.toolsRepository.saveTool(formData);
    }

    async update(formData, id) {
        return await this.toolsRepository.updateTool(formData, id);
    }

    async delete(id) {
        return await this.toolsRepository.deleteTool(id);
    }
}

export default ToolService;
class ToolService {
    constructor(toolsRepository) {
        this.toolsRepository = toolsRepository;
    }

    async getTools() {
        return await this.toolsRepository.getTools();
    }

    async save(formData) {
        return await this.toolsRepository.saveTool(formData);
    }
}

export default ToolService;
class MaterialService {
    constructor(materialRepository) {
        this.materialRepository = materialRepository;
    }

    async getMaterials() {
        return await this.materialRepository.getMaterials();
    }

    async getMaterialById(id) {
        return await this.materialRepository.getMaterialById(id);
    }

    async save(formData) {
        return await this.materialRepository.saveMaterial(formData);
    }

    async update(formData, id) {
        return await this.materialRepository.updateMaterial(formData, id);
    }

    async delete(id) {
        return await this.materialRepository.deleteMaterial(id);
    }

}

export default MaterialService;
class ProviderService {
    constructor(providerRepository) {
        this.providerRepository = providerRepository;
    }

    async getProviders() {
        return await this.providerRepository.getProviders();
    }

    async getProviderById(id) {
        return await this.providerRepository.getProviderById(id);
    }

    async getProviderByName(name) {
        return await this.providerRepository.getProviderByName(name);
    }

}

export default ProviderService;


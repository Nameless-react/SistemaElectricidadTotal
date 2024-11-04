class ProviderService {
    constructor(providerRepository) {
        this.providerRepository = providerRepository;
    }

    /**
     * Retrieves all providers from the repository.
     * @returns {Promise<Array|null>} A promise that resolves with an array of providers or null if none are found.
     */
    async getProviders() {
        return await this.providerRepository.getProviders();
    }

    /**
     * Retrieves a provider by its ID from the repository.
     * @param {number} id - The ID of the provider to retrieve.
     * @returns {Promise<Provider|null>} A promise that resolves with the retrieved provider or null if not found.
     */
    async getProviderById(id) {
        return await this.providerRepository.getProviderById(id);
    }

    /**
     * Retrieves a provider by its name from the repository.
     * @param {string} name - The name of the provider to retrieve.
     * @returns {Promise<Provider|null>} A promise that resolves with the retrieved provider or null if not found.
     */
    async getProviderByName(name) {
        return await this.providerRepository.getProviderByName(name);
    }

}

export default ProviderService;


class ProviderRepository {
    constructor(providerModel) {
        this.providerModel = providerModel;
    }

    /**
     * Retrieves all providers from the database.
     * @returns {Promise<Array|null>} A promise that resolves with an array of providers or null if none are found.
     */
    async getProviders() {
        try {
            const providers = await this.providerModel.findAll();
            return providers.length > 0 ? providers : null; // Return null if no providers are found
        } catch (error) {
            console.error("Error retrieving providers:", error);
            throw new Error("Error al obtener los proveedores");
        }
    }

    /**
     * Retrieves a provider by its ID from the database.
     * @param {number} id - The ID of the provider to retrieve.
     * @returns {Promise<Provider|null>} A promise that resolves with the retrieved provider or null if not found.
     */
    async getProviderById(id) {
        try {
            const provider = await this.providerModel.findByPk(id);
            return provider ? provider.dataValues : null; // Return null if provider not found
        } catch (error) {
            console.error("Error retrieving provider by ID:", error);
            throw new Error("Error al obtener el proveedor");
        }
    }

    /**
     * Retrieves a provider by its name from the database.
     * @param {string} name - The name of the provider to retrieve.
     * @returns {Promise<Provider|null>} A promise that resolves with the retrieved provider or null if not found.
     */
    async getProviderByName(name) {
        try {
            const provider = await this.providerModel.findOne({ where: { name } });
            return provider ? provider.dataValues : null; // Return null if provider not found
        } catch (error) {
            console.error("Error retrieving provider by name:", error);
            throw new Error("Error al obtener el proveedor");
        }
    }
}

export default ProviderRepository;
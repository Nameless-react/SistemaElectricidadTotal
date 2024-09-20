
class ProviderRepository {
    constructor(providerModel) {
        this.providerModel = providerModel;
    }

    /**
     * Retrieves all providers from the database.
     * @returns {Promise<Array>} A promise that resolves with an array of providers.
     * @throws {Error} Throws an error if providers cannot be retrieved.
    **/
    async getProviders() {
        try {
            const providers = await this.providerModel.findAll();
            if (!providers || providers.length === 0) {
                throw new Error("No se encontraron proveedor");
            }
            return providers;
        } catch (error) {
            console.error("Error al obtener los proveedor:", error);
            throw new Error("Error al obtener los proveedores");
        }
    }
    /**
     * Retrieves a provider by its ID from the database.
     * @param {number} id - The ID of the provider to retrieve.
     * @returns {Promise<Provider>} A promise that resolves with the retrieved provider.
     * @throws {Error} Throws an error if the provider cannot be retrieved.
     * */
    async getProviderById(id) {
        try {
            const provider = await this.providerModel.findByPk(id);
            if (!provider) {
                throw new Error("Proveedoredor no encontrado");
            }
            return provider.dataValues;
        } catch (error) {
            console.error("Error al obtener el proveedor:", error);
            throw new Error("Error al obtener el proveedor");
        }
    }
    /**
     * Retrieves a provider by its name from the database.
     * @param {string} name - The name of the provider to retrieve.
     * @returns {Promise<Provider>} A promise that resolves with the retrieved provider.
     *  @throws {Error} Throws an error if the provider cannot be retrieved.
     * */
    async getProviderByName(name) {
        try {
            const provider = await this.providerModel.findOne({ where: { name } });
            if (!provider) {
                throw new Error("Proveedoredor no encontrado");
            }
            return provider.dataValues;
        } catch (error) {
            console.error("Error al obtener el proveedor:", error);
            throw new Error("Error al obtener el proveedor");
        }
    }
}
export default ProviderRepository;
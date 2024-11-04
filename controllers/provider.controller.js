import { Provider } from "../models";

/**
 * Controller for handling provider-related operations.
 */
class ProviderController {
    /**
     * Retrieves all providers from the database.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<Array>} An array of provider data.
     * @throws Will throw an error if the retrieval process fails.
     */
    getProviders = async (req, res) => {
        try {
            // Fetch all providers from the database
            const providers = await Provider.findAll();

            // Extract dataValues from each provider object
            const providerData = providers.map(provider => provider.dataValues);

            // Return the array of provider data
            return providerData;
            
        } catch (error) {
            // Throw an error if there's an issue retrieving providers
            throw new Error("Error while getting providers");
        }
    };
}

export default ProviderController;

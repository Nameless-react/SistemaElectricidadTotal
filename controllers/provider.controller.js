import { Provider } from "../models";

class ProviderController {
    getProviders = async (req, res) => {
        try {
            const providers = await Provider.findAll();
            return providers;
        } catch (error) {
            throw new Error(error, "Error while getting providers");
        }
    }
}

export default ProviderController;
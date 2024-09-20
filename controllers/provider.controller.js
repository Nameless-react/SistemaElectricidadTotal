import { Provider } from "../models";

class ProviderController {
    getProviders = async (req, res) => {
      try {
        const providers = await Provider.findAll();
        

        const providerData = providers.map(provider => provider.dataValues);
        
        return providerData;
        
      } catch (error) {
        throw new Error("Error while getting providers");
      }
    };
  }

export default ProviderController;
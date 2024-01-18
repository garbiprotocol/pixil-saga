import BASE_CONTRACT_ARBITRUM_HELPER from "./base.contract.arbitrum.js";

class VE_GRB_HELPER extends BASE_CONTRACT_ARBITRUM_HELPER
{
    constructor(options)
    {
        let configs = options.configs;
        let abi = configs.Abi["veGRB"];
        options.abi = abi;
        super(options);
        this.storeHelper = options.storeHelper ? options.storeHelper : {};
    }

    async GetBalance(user)
    {
        let userAddress = user ? user : this.GetUserAddress();
        let contractAddress = this.configs.Token.GetTokenAddressByTokenName("veGRB");

        let actionContract = await this.GetReadContract(contractAddress);
        let result = await actionContract.methods.balanceOf(userAddress).call();
        let data = {}

        data.VeGRBBalance = result / 1e18;
        return data;
    }

}

export default VE_GRB_HELPER;
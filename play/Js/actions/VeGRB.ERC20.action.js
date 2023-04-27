import BASE_ACTION_HELPER from "./base.action.js";

class VE_GRB_ERC20_HELPER extends BASE_ACTION_HELPER
{
    constructor({configs, walletHelper, storeHelper})
    {
        super({
            configs , walletHelper, storeHelper
        })
    }

    async GetBalanceOf(user)
    {
        let CyberCreditcontract = this.GetContractHelper("VeGRB");
        let data = await CyberCreditcontract.GetBalance(user);
        
        this.SendDataToUnity("Wallet", "ResponseBanaceUserVeGRB", data);
    }

    // external function
    GetContractAddress()
    {
        return this.configs.Token.GetTokenAddressByTokenName("Cyber");
    }



}

export default VE_GRB_ERC20_HELPER;
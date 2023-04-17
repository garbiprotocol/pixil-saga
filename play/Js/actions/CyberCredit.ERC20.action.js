import BASE_ACTION_HELPER from "./base.action.js";

class CYBER_CREDIT_ERC20_HELPER extends BASE_ACTION_HELPER
{
    constructor({configs, walletHelper, storeHelper})
    {
        super({
            configs , walletHelper, storeHelper
        })
    }

    async GetBalanceOf(user)
    {
        let CyberCreditcontract = this.GetContractHelper("CyberCredit");
        let data = await CyberCreditcontract.GetBalance(user);
        this.SendDataToUnity("Wallet", "ResponseBanaceUserCyberCredit", data);
    }

    async GetAllowance(owner, spender)
    {
        let CyberCreditcontract = this.GetContractHelper("CyberCredit");
        let data = await CyberCreditcontract.GetAllowance(owner, spender);
        return data;
    }

    async ApproveToTreasury(user)
    {
        let treasuryContractAddress = this.configs.Contract.GetContractAddressByContractName("Treasury");
        let promiseResult = await this.approve(user, treasuryContractAddress);

        if(promiseResult.status == true)
        {
            Unity.SendMessage("Shop", "HideNotifiApprove");
        }
    }
    
    async ApproveToLearning(user)
    {
        let learningContractAddress = this.configs.Contract.GetContractAddressByContractName("Learning");
        
        let promiseResult = await this.approve(user, learningContractAddress);
        if(promiseResult.status == true)
        {
            Unity.SendMessage("Upgrade", "HideNotifiApprove");
        }
    }
    
    // internal function
    async approve(user, spender)
    {
        let CyberCreditcontract = this.GetContractHelper("CyberCredit");
        let promise = CyberCreditcontract.approve(user, spender);

        return promise;
    }

    // external function
    GetContractAddress()
    {
        return this.configs.Token.GetTokenAddressByTokenName("Cyber");
    }
    
    SaveDataUser(user, keyInfo, data)
    {
        try
        {
            if(data)
            {
                let storeHelper = this.GetStoreHelper("User");
                storeHelper.Set(user, keyInfo, {Code: 1, Data: data})
            }
        }
        catch(e)
        {
            console.log("[SAVE USER DATA ERROR] :" , e);
        }
    }

    GetDataUser(user, keyInfo)
    {
        let storeHelper = this.GetStoreHelper("User");
        let data = storeHelper.Get(user, keyInfo);
        if(!data || !Object.keys(data.Data).length) {
			data =
            {
                Code: 0,
                Data: {},
            }
		}
		return data;
    }
}

export default CYBER_CREDIT_ERC20_HELPER;
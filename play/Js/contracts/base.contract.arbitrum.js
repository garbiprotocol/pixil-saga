import { Delay } from "../utils/delay.util.js";
class BASE_CONTRACT_ARBITRUM_HELPER
{
    constructor(options)
    {
        this.abi = options.abi,
        this.walletHelper = options.walletHelper,
        this.configs = options.configs
        this.readContract = {},
        this.mainContract = {}
    };

    GetWalletHelper()
    {
        return this.walletHelper;
    }

    GetConfigs()
    {
        return this.configs;
    }

    GetAmountLimit()
    {
        return '115792089237316195423570985008687907853269984665640564039457584007913129639935';
    }

    GetUserAddress()
    {
        return this.walletHelper.GetActiveUser();
    }

    async GetMainContract(contract)
    {
        let self = this;
        let userAddress = this.GetUserAddress();
        self.mainContract[userAddress] = self.mainContract[userAddress] ? self.mainContract[userAddress]: {};
        if (self.mainContract[userAddress][contract]) 
        {
            return self.mainContract[userAddress][contract];
        }
        if(typeof(web3) == "undefined")
        {
            await Delay(100);
            return self.GetMainContract(contract);
        }
        try 
        {
            self.mainContract[userAddress][contract] = new web3.eth.Contract(self.abi, contract, { from: userAddress });
        } 
        catch(e) 
        {
            await Delay(3000);
            return self.GetMainContract(contract);
        }
        return self.mainContract[userAddress][contract];
    }

    async GetReadContract(contract)
    {
        let self = this;
        let Web3 = this.walletHelper.GetWeb3ToReadData();

        if(self.readContract[contract])
        {
            return self.readContract[contract];
        }

        try
        {
            self.readContract[contract] = new Web3.eth.Contract(self.abi, contract);
        }
        catch(e)
        {
            await Delay(3000);
            self.GetReadContract(contract);
        }
        return self.readContract[contract];
    }
    
    SendLogToUnity(ObjectName, functionName, messege)
    {
        if(messege)
        {
            Unity.SendMessage(ObjectName, functionName, messege);
            return;
        }
    }

}
export default BASE_CONTRACT_ARBITRUM_HELPER;
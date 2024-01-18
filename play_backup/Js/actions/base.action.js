import CONTRACT_HELPER from "../contracts/index.js";

class BASE_ACTION_HELPER {
    constructor(opt) {
        this.configs        = opt.configs ? opt.configs : {};
        this.storeHelper    = opt.storeHelper ? opt.storeHelper : {};
        this.contractHelper = opt.contractHelper ? opt.contractHelper : {};
        this.walletHelper = opt.walletHelper ? opt.walletHelper : {};
    }

    GetStoreHelper(key) {
		if (this.storeHelper[key]) {
            return this.storeHelper[key];
		}
        
        return false;
	}

    GetContractHelper(key)
    {
        let self = this;
        if(!this.contractHelper[key])
        {
            this.contractHelper[key] = new CONTRACT_HELPER[key]
            (
                {
                    configs: self.configs,
                    walletHelper: self.walletHelper,
                    storeHelper : self.storeHelper
                }
            )
        }
        return this.contractHelper[key];
    }

    SendDataToUnity(ObjectName, functionName, data)
    {
        if(data)
        {
            data = this.FormartData(data);
            Unity.SendMessage(ObjectName, functionName, JSON.stringify(data));
            return;
        }
        Unity.SendMessage(ObjectName, functionName);
        return;
    }

    SendLogToUnity(ObjectName, functionName, messege)
    {
        if(messege)
        {
            Unity.SendMessage(ObjectName, functionName, messege);
            return;
        }
    }

    FormartData(data)
    {
        return (data) ? {Code: 1, Data: data} : { Code: 0, Messege: "Error GetData"};
    }
}

export default BASE_ACTION_HELPER;


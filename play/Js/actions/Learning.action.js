import BASE_ACTION_HELPER from "./base.action.js";

class LEARNING_ACTION_HELPER extends BASE_ACTION_HELPER
{
    constructor({configs, walletHelper, storeHelper}, {tokenAction})
    {
        super({
            configs , walletHelper, storeHelper
        })

        this.tokenAction = tokenAction;
    }

    async StartLearn(user)
    {
        let learningContract = this.GetContractHelper("Learning");
        let promise = await learningContract.StartLearn(user);

        this.SendDataToUnity("LearningContract", "ResponseStartLearn", {status: (promise.status == true) ? "1" : "0"});
    }

    async StopLearn(user)
    {
        let learningContract = this.GetContractHelper("Learning");
        learningContract.StopLearn(user);
    }

    async UpgrateLevel(user, transactionKey)
    {
        let learningContract = this.GetContractHelper("Learning");
        let promise = await learningContract.UpgrateLevel(user, transactionKey);
        this.SendDataToUnity("LearningContract", "ResponseUpgrateLevel", {status: (promise.status == true) ? "1" : "0"});
    }

    async GetConfigSystem()
    {
        let learningContract = this.GetContractHelper("Learning");

        let data = await learningContract.GetConfigSystem();

        this.SendDataToUnity("LearningContract", "ResponseConfig", data);
    }

    async GetData()
    {
        let learningContract = this.GetContractHelper("Learning");

        let user = learningContract.GetUserAddress();
        let contractAddress = learningContract.GetContractAddress();
        
        let dataContract = await learningContract.GetData();
        
        let amountAllowanceOfUserToContract = await this.tokenAction.GetAllowance(user, contractAddress);

        let configSystem = await learningContract.GetConfigSystem();
        
        let MAX_UINT256 = "115792089237316195423570985008687907853269984665640564039457584007913129639935";

        let MAXIMUM_AMOUNT_OF_CONTRACT_USE = configSystem.priceUpgrateLevel[configSystem.priceUpgrateLevel.length - 1].Price;
        
        amountAllowanceOfUserToContract = 
            (amountAllowanceOfUserToContract == MAX_UINT256 ||
                (amountAllowanceOfUserToContract / 1e18 >= MAXIMUM_AMOUNT_OF_CONTRACT_USE)) ? 
                "MAX_UINT256" : amountAllowanceOfUserToContract / 1e18;
        
        let data = 
        {
            dataContract,
            amountAllowanceOfUserToContract,
        }

        this.SendDataToUnity("LearningContract", "ResponseDataUserLearn", data);
    }

    GetTransactionInfo(user, key)
    {
        let storeHelper = this.GetStoreHelper('Transaction');
        if(!storeHelper) return 0;
        
        let transaction = storeHelper.Get(user, 'transaction-info');
        let transactionProcess = transaction && transaction[key] ? transaction[key] : 0;
        return transactionProcess;
    }
}

export default LEARNING_ACTION_HELPER;
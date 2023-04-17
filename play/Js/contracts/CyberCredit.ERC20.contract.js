import BASE_CONTRACT_ARBITRUM_HELPER from "./base.contract.arbitrum.js";

class CYBER_CREDIT_HELPER extends BASE_CONTRACT_ARBITRUM_HELPER
{
    constructor(options)
    {
        let configs = options.configs;
        let abi = configs.Abi["CyberCredit"];
        options.abi = abi;
        super(options);
        this.storeHelper = options.storeHelper ? options.storeHelper : {};
    }

    async GetBalance(user)
    {
        let userAddress = user ? user : this.GetUserAddress();
        let contractAddress = this.configs.Token.GetTokenAddressByTokenName("Cyber");

        let actionContract = await this.GetReadContract(contractAddress);
        let result = await actionContract.methods.balanceOf(userAddress).call();
        let data = {}

        data.CyrberCreditBalance = result;
        return data;
    }

    async GetAllowance(owner, spender)
    {
        let contractAddress = this.configs.Token.GetTokenAddressByTokenName("Cyber");
        let actionContract = await this.GetReadContract(contractAddress);
        let result = await actionContract.methods.allowance(owner, spender).call();

        return result;
    }

    async approve(user, spender)
    {
        let contractAddress = this.configs.Token.GetTokenAddressByTokenName("Cyber");
        let actionContract = await this.GetMainContract(contractAddress);
        let amount = "115792089237316195423570985008687907853269984665640564039457584007913129639935";

        return actionContract
        .methods
        .approve(spender, amount)
        .send({from: user})
        .on('transactionHash', (hash) => {
            Unity.SendMessage("TransactionLog", "IncreaseLayerTransactionLogt");
            this.SendLogToUnity("TransactionLog", "SetTransactionLog", "approve: pending");                 
        })
        .on('confirmation', (confirmationNumber, receipt) => {             
        })
        .on('receipt', (receipt) => {
            Unity.SendMessage("TransactionLog", "DecreaseLayerTransactionLog");        
            this.SendLogToUnity("TransactionLog", "SetTransactionLog", "approve: success");
        })
        .on('error', (err, receipt) => {
            this.SendLogToUnity("TransactionLog", "SetTransactionLog", "approve: error");
            Unity.SendMessage("TransactionLog", "DecreaseLayerTransactionLog");        
        });
    }
}

export default CYBER_CREDIT_HELPER;
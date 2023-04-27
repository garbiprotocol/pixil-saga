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
            this.SendLogToUnity("TransactionLog", "SetTransactionLog", "Transaction sent - lift-off achieved! Keep exploring Pixil Saga's gamified DeFi world as your transaction travels the blockchain galaxy.");                 
        })
        .on('confirmation', (confirmationNumber, receipt) => {             
        })
        .on('receipt', (receipt) => {
            Unity.SendMessage("TransactionLog", "DecreaseLayerTransactionLog");        
        })
        .on('error', (err, receipt) => {   
        });
    }
}

export default CYBER_CREDIT_HELPER;
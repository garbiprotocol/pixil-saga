import BASE_CONTRACT_ARBITRUM_HELPER from "./base.contract.arbitrum.js";

class TREASURY_CONTRACT_HELPER extends BASE_CONTRACT_ARBITRUM_HELPER
{
    constructor(options)
    {
        let configs = options.configs;
        let abi = configs.Abi["Treasury"];
        options.abi = abi;
        super(options);

        this.storeHelper = options.storeHelper ? options.storeHelper : {};
    }

    async CallGetData()
    {
        let contractAddress = this.GetContractAddress();
        let actionContract = await this.GetReadContract(contractAddress);
        let result = await actionContract.methods.GetData().call();

        let data = {};
        data.balanceTreasury = result.balanceTreasury;

        data.amountPacket = [];
        let itemsLength = result.amountPacket.length;
        for(let indexPacket = 0; indexPacket < itemsLength; indexPacket++)
        {
            data.amountPacket[indexPacket] = result.amountPacket[indexPacket];
        }
        return data;
    }

    async CallBuyPacket(indexPacket)
    {
        let userAddress = this.GetUserAddress();
        let contractAddress = this.GetContractAddress();
        let actionContract = await this.GetMainContract(contractAddress);

        return actionContract.methods.BuyPacket(indexPacket).send({from: userAddress})
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
        });;
    }

    GetContractAddress()
    {
        return this.configs.Contract.GetContractAddressByContractName("Treasury");
    }

}

export default TREASURY_CONTRACT_HELPER;
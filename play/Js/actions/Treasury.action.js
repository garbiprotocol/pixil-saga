import BASE_ACTION_HELPER from "./base.action.js";

class TREASURY_ACTION_HELPER extends BASE_ACTION_HELPER
{
    constructor({configs, walletHelper, storeHelper}, {tokenAction})
    {
        super({
            configs , walletHelper, storeHelper
        })

        this.tokenAction = tokenAction;
    }

    async GetData()
    {
        let contract = this.GetContractHelper("Treasury");
        let contractAddress = contract.GetContractAddress();
        let user = contract.GetUserAddress();

        let dataContract = await contract.CallGetData();

        let amountAllowanceOfUserToContract = await this.tokenAction.GetAllowance(user, contractAddress);
        
        let MAX_UINT256 = "115792089237316195423570985008687907853269984665640564039457584007913129639935";

        let MAXIMUM_AMOUNT_OF_CONTRACT_USE = dataContract.amountPacket[dataContract.amountPacket.length - 1] * 49152;

        amountAllowanceOfUserToContract = 
            (amountAllowanceOfUserToContract == MAX_UINT256 || amountAllowanceOfUserToContract > MAXIMUM_AMOUNT_OF_CONTRACT_USE) ?
            "MAX_UINT256" : amountAllowanceOfUserToContract / 1e18;

        let data = 
        {
            dataContract,
            amountAllowanceOfUserToContract,
        }

        this.SendDataToUnity("TreasuryContract", "ResponeGetDataTreasury", data);
    }

    async BuyPacket(indexPacket)
    {
        let contract = this.GetContractHelper("Treasury");

        let promise = await contract.CallBuyPacket(indexPacket);

        if(promise.status == true)
        {
            this.SendLogToUnity("TransactionLog", "SetTransactionLog", "Congratulations! Your transaction has been confirmed, and you have successfully purchased veGRB using your hard-earned Cyber Credits. With your veGRB, you can participate in governance and help shape the future of Pixil Saga's gamified DeFi universe. Happy adventuring!");
            Unity.SendMessage("Shop", "ShowResultBuyPacket", `+${promise.events.OnBuyPacket.returnValues.amountTokenOutput / 1e18}`);
        }
    }
}

export default TREASURY_ACTION_HELPER;
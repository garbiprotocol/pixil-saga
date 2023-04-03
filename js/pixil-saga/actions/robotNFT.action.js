import BASE_ACTION_HELPER from "./base.action.js";

class ROBOT_NFT_ACTION extends BASE_ACTION_HELPER
{
    constructor({configs, walletHelper, storeHelper})
    {
        super({configs, walletHelper, storeHelper});
    }
    //to: GameController
    approve(to, robotId)
    {
        let contract = this.GetContractHelper("RobotNFT");

        contract.CallApprove(to, robotId);
    }

    async getApproved(robotId)
    {
        let contract = this.GetContractHelper("RobotNFT");

        return await contract.CallGetApproved(robotId);
    }

    async getAllRobotOfUser(user)
    {
        let contract = this.GetContractHelper("RobotNFT");
        return await contract.CallGetAllRobotIdOfUser(user);
    }

    async getInfoRobotByRobotId(robotId)
    {
        let contract = this.GetContractHelper("RobotNFT");
        return await contract.CallGetInfoRobotByRobotId(robotId);
    }
    
}

export default ROBOT_NFT_ACTION;
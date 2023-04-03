import BASE_CONTRACT_ARBITRUM_HELPER from "./base.contract.arbitrum.js";
import CONFIG_UI from "../../../configs/index.js";

class ROBOT_NFT_CONTRACT_HELPER extends BASE_CONTRACT_ARBITRUM_HELPER
{
    constructor(options)
    {
        let configs = options.configs;
        let abi = configs.Abi["RobotNFT"];
        options.abi = abi;
        super(options);

        this.configUI = CONFIG_UI;
        this.storeHelper = options.storeHelper ? options.storeHelper : {};
    }

    async CallGetAllRobotIdOfUser(user)
    {
        let userAddress = user ? user : this.GetUserAddress();
        let contractAddress = this.GetContractAddress();
        let contractAction = await this.GetReadContract(contractAddress);

        let data = {};
        let balanceOfUser = await this.CallGetBalanceOfUser(user);
        data.totalNFT = balanceOfUser;
        if(balanceOfUser == 0) return data;
        for (let index = 0; index < balanceOfUser; index++) {
            let robotIdOfUser = await contractAction.methods.tokenOfOwnerByIndex(userAddress, index).call();
            data[index] = await this.CallGetInfoRobotByRobotId(robotIdOfUser);
        }

        return data;
    }

    async CallGetInfoRobotByRobotId(robotId)
    {
        let Level =  await this.CallGetLevelRobot(robotId);
        let data = {}

        data.RobotId = robotId;
        data.level = Level;
        data.name = this.configUI["heroLevel"].getNameRobotByLevel(Level);
        data.rewardPerBlock = this.configUI["heroLevel"].getRewardPerBlockByLevel(Level);
        data.src = this.configUI["heroLevel"].getSrcRobotByLevel(Level);

        return data;
    }

    async CallGetApproved(robotId)
    {
        let contractAddress = this.GetContractAddress();

        let actionContact = await this.GetReadContract(contractAddress);

        return actionContact.methods.getApproved(robotId).call();
    }

    async CallApprove(to, robotId)
    {
        let userAddress = this.GetUserAddress();
        let contractAddress = this.GetContractAddress();

        let actionContact = await this.GetMainContract(contractAddress);

        actionContact.methods.approve(to, robotId).send({from: userAddress})
        .on('transactionHash', (hash) => {
            // html
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            // html
            $("#robot-join-game-modal .btn-approve").hide();
            $("#robot-join-game-modal .btn-set-in-game").show();
        })
        .on('receipt', (receipt) => {
            // html
            $("#robot-join-game-modal .btn-approve").hide();
            $("#robot-join-game-modal .btn-set-in-game").show();
        })
        .on('error', (err, receipt) => {
            // html
        });
    }

    async CallGetLevelRobot(robotId)
    {
        let contractAddress = this.GetContractAddress()
        let contractAction = await this.GetReadContract(contractAddress);

        return await contractAction.methods.Level(robotId).call();
    }

    async CallGetBalanceOfUser(user)
    {
        let userAddress = user ? user : this.GetUserAddress();
        let contractAddress = this.GetContractAddress();

        let contractAction = await this.GetReadContract(contractAddress);
        return await contractAction.methods.balanceOf(userAddress).call();
    }

    GetContractAddress()
    {
        return this.configs.Contract.GetRobotNFTContract();
    }
}

export default ROBOT_NFT_CONTRACT_HELPER;
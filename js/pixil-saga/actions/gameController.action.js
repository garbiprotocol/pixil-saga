import BASE_ACTION_HELPER from "./base.action.js"

class GAME_CONTROLLER_ACTION_HELPER extends BASE_ACTION_HELPER
{
    constructor({configs, walletHelper, storeHelper})
    {
        super(
        {
            configs , walletHelper, storeHelper
        })
    }

    async MintHeroNFT(teamId)
    {
        let contract = this.GetContractHelper("GameController");

        await contract.CallMintHeroNFT(teamId);
    }

    LetHeroNFTJoinToGame(heroId)
    {
        let contract = this.GetContractHelper("GameController");
        
        contract.CallLetHeroNFTJoinToGame(heroId);
    }

    LetHeroOutOfGame()
    {
        let contract = this.GetContractHelper("GameController");

        contract.CallLetHeroNFTOutOfGame();
    }

    LetRobotNFTJoinToGame(robotId)
    {
        let contract = this.GetContractHelper("GameController");

        contract.CallLetRobotNFTJoinToGame(robotId);
    }

    LetRobotNFTOutOfGame()
    {
        let contract = this.GetContractHelper("GameController");

        contract.CallLetRobotNFTOutOfGame();
    }

    async  GetDataUser(user)
    {
        let contract = this.GetContractHelper("GameController");

        return await contract.CallGetDataUser(user);
    }

    async PriceCreditMint()
    {
        let contract = this.GetContractHelper("GameController");
        return await contract.CallGetPriceCreditMint();
    }

}

export default GAME_CONTROLLER_ACTION_HELPER;
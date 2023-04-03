import BASE_CONTRACT_ARBITRUM_HELPER from "./base.contract.arbitrum.js";
import CONFIG_UI from "../../../configs/index.js";

class HERO_NFT_HELPER extends BASE_CONTRACT_ARBITRUM_HELPER
{
    constructor(options)
    {
        let configs = options.configs;
        let abi = configs.Abi["HeroNFT"];
        options.abi = abi;
        super(options);
        this.configUI = CONFIG_UI;
        this.storeHelper = options.storeHelper ? options.storeHelper : {};
    }

    // approve heroId to GameControllerAddress
    async CallApprove(to, heroId)
    {
        let userAddress = this.GetUserAddress();
        let contractAddress = this.GetContractAddress();
        let contractAction = await this.GetMainContract(contractAddress);

        contractAction.methods.approve(to, heroId).send({from: userAddress})
        .on('transactionHash', (hash) => {
            // html
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            // html
            $("#hero-join-game-modal .btn-approve").hide();
            $("#hero-join-game-modal .btn-set-avatar").show();
        })
        .on('receipt', (receipt) => {
            // html
            $("#hero-approve-modal .btn-approve").hide();
            $("#hero-approve-modal .btn-set-avatar").show();
        })
        .on('error', (err, receipt) => {
            // html
        });
    }

    async CallGetApproved(heroId)
    {
        let contractAddress = this.GetContractAddress();
        let contractAction = await this.GetReadContract(contractAddress);

        return await contractAction.methods.getApproved(heroId).call();
    }

    async CallGetAllHeroIdOfUser(user)
    {
        let userAddress = user ? user : this.GetUserAddress();
        let contractAddress = this.GetContractAddress();
        let contractAction = await this.GetReadContract(contractAddress);

        let data = {};
        let balanceOfUser = await this.CallGetBalanceOfUser(user);
        data.totalNFT = balanceOfUser;
        if(balanceOfUser == 0) return data;
        for (let index = 0; index < balanceOfUser; index++) {
            let heroIdOfUser = await contractAction.methods.tokenOfOwnerByIndex(userAddress, index).call();
            data[index] = await this.CallGetInfoHeroByHeroId(heroIdOfUser);
        }
        return data;
    }

    async CallGetInfoHeroByHeroId(heroId)
    {
        let teamId =  await this.CallGetTeamIdHero(heroId);
        let data = {}

        data.heroId = heroId;
        data.teamId = teamId;
        data.name = this.configUI["teamId"].GetNameOfTeamId(teamId);
        data.src = this.configUI["teamId"].GetSrcOfTeamId(teamId);

        return data;
    }

    async CallGetTeamIdHero(heroId)
    {
        let contractAddress = this.GetContractAddress()
        let contractAction = await this.GetReadContract(contractAddress);

        return await contractAction.methods.TeamId(heroId).call();
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
        return this.configs.Contract.GetHeroNFTContract();
    }
}

export default HERO_NFT_HELPER
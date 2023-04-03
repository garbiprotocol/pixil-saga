import BASE_ACTION_HELPER from "./base.action.js";

class HERO_NFT_ACTION extends BASE_ACTION_HELPER
{
    constructor({configs, walletHelper, storeHelper})
    {
        super({configs, walletHelper, storeHelper});
    }

    approve(to, HeroId)
    {
        let contract = this.GetContractHelper("HeroNFT");

        contract.CallApprove(to, HeroId);
    }

    async getApproved(heroId)
    {
        let contract = this.GetContractHelper("HeroNFT");
        return await contract.CallGetApproved(heroId);
    }

    async getAllHeroIdOfUser(user)
    {
        let contract = this.GetContractHelper("HeroNFT");
        return await contract.CallGetAllHeroIdOfUser(user);
    }
    async getTeamIdByHeroId (heroId)
    {
        let contract = this.GetContractHelper("HeroNFT");
        return await contract.CallGetTeamIdHero(heroId);
    }
    async getInfoHeroByHeroId(heroId)
    {
        let contract = this.GetContractHelper("HeroNFT");
        return await contract.CallGetInfoHeroByHeroId(heroId);
    }

}

export default HERO_NFT_ACTION;
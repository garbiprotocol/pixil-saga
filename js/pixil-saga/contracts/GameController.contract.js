import BASE_CONTRACT_ARBITRUM_HELPER from "./base.contract.arbitrum.js";

class GAME_CONTROLLER_CONTRACT_HELPER extends BASE_CONTRACT_ARBITRUM_HELPER
{
    constructor(options)
    {
        let configs = options.configs;
        let abi = configs.Abi["Gametroller"];
        options.abi = abi;

        super(options)

        this.storeHelper = options.storeHelper ? options.storeHelper : {};
    }

    async CallMintHeroNFT(teamId)
    {
        let userAddress = this.GetUserAddress();
        let contractAddress = this.GetContractAddress();
        let actionContract = await this.GetMainContract(contractAddress);

        actionContract.methods.MintHeroNFT(teamId).send({from: userAddress})
        .on('transactionHash', (hash) => {
            // html
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            // html
        })
        .on('receipt', (receipt) => {
            // html
        })
        .on('error', (err, receipt) => {
            // html
        });
    }

    async CallLetHeroNFTJoinToGame(heroId)
    {
        let userAddress = this.GetUserAddress();
        let contractAddress = this.GetContractAddress();
        let actionContract = await this.GetMainContract(contractAddress);

        actionContract.methods.LetHeroNFTJoinToGame(heroId).send({from: userAddress})
        .on('transactionHash', (hash) => {
            // html
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            // html
            $('#modalHeroNFTJoinGame #hero-join-game-modal').modal('hide');
        })
        .on('receipt', (receipt) => {
            // html
            $('#modalHeroNFTJoinGame #hero-join-game-modal').modal('hide');
        })
        .on('error', (err, receipt) => {
            // html
        });
    }

    async CallLetHeroNFTOutOfGame()
    {
        let userAddress = this.GetUserAddress();
        let contractAddress = this.GetContractAddress();
        let actionContract = await this.GetMainContract(contractAddress);

        actionContract.methods.LetHeroNFTOutOfGame().send({from: userAddress})
        .on('transactionHash', (hash) => {
            // html
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            // html
            $('.list-hero #pills-hero-in-game ').hide();
            $('#modalHeroNFTInGame #hero-in-game-modal').modal('hide');
        })
        .on('receipt', (receipt) => {
            // html
            $('.list-hero #pills-hero-in-game ').hide();
            $('#modalHeroNFTInGame #hero-in-game-modal').modal('hide');
        })
        .on('error', (err, receipt) => {
            // html
        });
    }

    async CallLetRobotNFTJoinToGame(robotId)
    {
        let userAddress = this.GetUserAddress();
        let contractAddress = this.GetContractAddress();
        let actionContract = await this.GetMainContract(contractAddress);

        actionContract.methods.LetRobotNFTJoinTheGame(robotId).send({from: userAddress})
        .on('transactionHash', (hash) => {
            // html
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            // html
            $('#modalRobotNFTJoinGame #robot-join-game-modal').modal('hide');
        })
        .on('receipt', (receipt) => {
            // html
            $('#modalRobotNFTJoinGame #robot-join-game-modal').modal('hide');
        })
        .on('error', (err, receipt) => {
            // html
        });
    }

    async CallLetRobotNFTOutOfGame()
    {
        let userAddress = this.GetUserAddress();
        let contractAddress = this.GetContractAddress();
        let actionContract = await this.GetMainContract(contractAddress);

        actionContract.methods.LetRobotNFTOutOfTheGame().send({from: userAddress})
        .on('transactionHash', (hash) => {
            // html
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            // html
            $('.list-hero #pills-robot-in-game ').hide();
            $('#modalRobotNFTInGame #robot-in-game-modal').modal('hide'); 
        })
        .on('receipt', (receipt) => {
            // html
            $('.list-hero #pills-robot-in-game ').hide();
            $('#modalRobotNFTInGame #robot-in-game-modal').modal('hide');
        })
        .on('error', (err, receipt) => {
            // html
        });
    }

    async CallGetDataUser(user)
    {
        let userAddress = user ? user : this.GetUserAddress();
        let contractAddress = this.GetContractAddress();
        let actionContract = await this.GetReadContract(contractAddress);

        let result = await actionContract.methods.GetDataUser(userAddress).call();
        return result;
    }

    async CallGetPriceCreditMint()
    {
        let contractAddress = this.GetContractAddress();
        let actionContract = await this.GetReadContract(contractAddress);

        return await actionContract.methods.PriceCreditMint().call();
    }

    GetContractAddress()
    {
        return this.configs.Contract.GetGameControllerContract();
    }
}

export default GAME_CONTROLLER_CONTRACT_HELPER;
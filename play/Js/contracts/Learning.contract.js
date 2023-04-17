import BASE_CONTRACT_ARBITRUM_HELPER from "./base.contract.arbitrum.js";

class LEARNING_CONTRACT_HELPER extends BASE_CONTRACT_ARBITRUM_HELPER
{
    constructor(options)
    {
        let configs = options.configs;
        let abi = configs.Abi["Learning"];
        options.abi = abi;
        super(options);

        this.storeHelper = options.storeHelper ? options.storeHelper : {};
    }

    async StartLearn(user)
    {
        let userAddress = user ? user : this.GetUserAddress();
        let contractAddress = this.GetContractAddress();

        let actionContract = await this.GetMainContract(contractAddress);
        return actionContract
        .methods.ForRobotNFTToLearn()
        .send({from: userAddress})
        .on('transactionHash', (hash) => {
            this.SendLogToUnity("TransactionLog", "SetTransactionLog", "Transaction sent - lift-off achieved! Keep exploring Pixil Saga's gamified DeFi world as your transaction travels the blockchain galaxy.");                 
            Unity.SendMessage("TransactionLog", "IncreaseLayerTransactionLogt");
        })
        .on('confirmation', (confirmationNumber, receipt) => {            
        })
        .on('receipt', (receipt) => {
            this.SendLogToUnity("TransactionLog", "SetTransactionLog", "Your transaction has been confirmed, and your robot has begun earning rewards on the blockchain. Watch as your robot grows smarter and earns more Cyber Credits with each successful mission. Happy adventuring!"); 
            Unity.SendMessage("TransactionLog", "DecreaseLayerTransactionLog");
        })
        .on('error', (err, receipt) => {              
        });
    }

    async StopLearn(user)
    {
        let userAddress = user ? user : this.GetUserAddress();
        let contractAddress = this.GetContractAddress();

        let actionContract = await this.GetMainContract(contractAddress);
        actionContract
        .methods.ForRobotNFTStopLearn()
        .send({from: userAddress})
        .on('transactionHash', (hash) => {
            Unity.SendMessage("TransactionLog", "IncreaseLayerTransactionLogt"); 
            this.SendLogToUnity("TransactionLog", "SetTransactionLog", "Transaction sent - lift-off achieved! Keep exploring Pixil Saga's gamified DeFi world as your transaction travels the blockchain galaxy.");                 
        })
        .on('confirmation', (confirmationNumber, receipt) => {             
        })
        .on('receipt', (receipt) => {
            Unity.SendMessage("TransactionLog", "DecreaseLayerTransactionLog");
            this.SendLogToUnity("TransactionLog", "SetTransactionLog", "Transaction Confirmed! Your robot's learning process has been successfully stopped. Your robot has earned rewards and will be ready for another mission soon. Happy adventuring!");
            Unity.SendMessage("RobotUI", "ShowResultSessionLearn", `+${receipt.events.OnBonusReward.returnValues.AmountTokenReward / 1e18}`);
        })
        .on('error', (err, receipt) => {       
        });
    }

    async UpgrateLevel(user, transactionKey)
    {
        let userAddress = user ? user : this.GetUserAddress();
        console.log(userAddress);
        let contractAddress = this.GetContractAddress();

        let actionContract = await this.GetMainContract(contractAddress);
        actionContract
        .methods.UpgradeLevelRobot()
        .send({from: userAddress})
        .methods.ForRobotNFTStopLearn()
        .send({from: userAddress})
        .on('transactionHash', (hash) => {
            this.SendLogToUnity("TransactionLog", "SetTransactionLog", "Transaction sent - lift-off achieved! Keep exploring Pixil Saga's gamified DeFi world as your transaction travels the blockchain galaxy.");                 
        })
        .on('confirmation', (confirmationNumber, receipt) => {             
        })
        .on('receipt', (receipt) => {
            this.SendLogToUnity("TransactionLog", "SetTransactionLog", "Transaction confirmed.");
        })
        .on('error', (err, receipt) => {       
        });
    }

    async GetConfigSystem()
    {
        let contractAddress = this.GetContractAddress();
        let actionContract = await this.GetReadContract(contractAddress);

        let result = await actionContract.methods.GetConfigSystem().call();

        let data = {};

        let maxLevel = result.maxLevelOfRobotNFTinGame;

        data.maxLevel = maxLevel;

        data.priceUpgrateLevel = [];
        for(let i = 0; i <= parseInt(maxLevel); i++)
        {
            data.priceUpgrateLevel[i] = 
            {
                "Level": i,
                "Price": result.priceUpgradeLevelRobotNFTLevel[i] / 1e18,
            }
        }

        data.rewardPerBlockOfLevel = [];
        for(let i = 0; i <= parseInt(maxLevel); i++)
        {
            data.rewardPerBlockOfLevel[i] = 
            {
                "Level": i,
                "Reward": result.rewardPerBlockOfLevel[i] / 1e18,
            }
        }

        data.blockUpgrateLevel = [];
        for(let i = 0; i <= parseInt(maxLevel); i++)
        {
            data.blockUpgrateLevel[i] = 
            {
                "Level": i,
                "Block": result.blockUpgradeLevelRobotNFT[i],
            }
        }

        data.totalBlockLearn = result.totalBlockLearnEachTime;

        return data;
    }

    async GetData(user)
    {
        let userAddress = user ? user : this.GetUserAddress();
        let contractAddress = this.GetContractAddress();
        let actionContract = await this.GetReadContract(contractAddress);

        let result = await actionContract.methods.GetData(userAddress).call();

        let data = {};

        data.blockNumber = result.blockNumber;

        data.cyberCreditBalance = result.cyberCreditBalance / 1e18;

        data.learning = (result.learning == true) ? "1" : "0";

        data.levelRobotJoin = result.levelRobotJoinGameOfUser;

        data.tokenId = result.tokenId

        data.pendingBlockLearn = result.pendingBlockLearn;

        data.pendingBlockUpgrate = result.pendingBlockUpgradeLevelRobotNFT;

        data.startBlockLearn = result.startBlockLearn;

        data.stopBlockLearn = result.stopBlockLearn;

        data.rewardPerDay = result.rewardPerDay / 1e18;

        return data;
    }

    SaveTransactionInfo(user, transactionKey, status)
    {
        // status
        // no transaction = 0;
        // pending = 1,
        // success = 2,
        // error = 3.
        if(transactionKey) 
        {
            let storeHelper          = this.GetStoreHelper('Transaction');
            let transactions          = storeHelper.Get(user, 'transaction-info');
            transactions              = transactions ? transactions : {};
            let newTransaction        = {...transactions}
            newTransaction[transactionKey]        = status;
            storeHelper.Set(user, 'transaction-info', newTransaction);
        }

	}

    GetContractAddress()
    {
        return this.configs.Contract.GetContractAddressByContractName("Learning");
    }

    GetStoreHelper(key) 
    {
		if (this.storeHelper[key]) {
            return this.storeHelper[key];
		}
        return {};
	}
}

export default LEARNING_CONTRACT_HELPER
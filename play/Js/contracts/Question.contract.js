import BASE_CONTRACT_ARBITRUM_HELPER from "./base.contract.arbitrum.js";

class QUESTION_HELPER extends BASE_CONTRACT_ARBITRUM_HELPER
{
    constructor(options)
    {
        let configs = options.configs;
        let abi = configs.Abi["Question"];
        options.abi = abi;
        super(options);

        this.storeHelper = options.storeHelper ? options.storeHelper : {};
    }

    async DoQuestionOnDay(user, transactionKey)
    {
        let userAddress = user ? user : this.GetUserAddress();
        let contractAddress = this.GetContractAddress();
        let actionContract = await this.GetMainContract(contractAddress);
        return actionContract.methods.DoQuestOnDay().send({from: userAddress})
        .on('transactionHash', (hash) => {
            this.SaveTransactionInfo(user, transactionKey, 1);    
            Unity.SendMessage("TransactionLog", "IncreaseLayerTransactionLogt");                             
            this.SendLogToUnity("TransactionLog", "SetTransactionLog", "Transaction sent - lift-off achieved! Keep exploring Pixil Saga's gamified DeFi world as your transaction travels the blockchain galaxy.");                                        
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            this.SaveTransactionInfo(user, transactionKey, 2);                 
        })
        .on('receipt', (receipt) => {
            this.SaveTransactionInfo(user, transactionKey, 2); 
            this.SendLogToUnity("TransactionLog", "SetTransactionLog", "Transaction confirmed.");
            Unity.SendMessage("TransactionLog", "DecreaseLayerTransactionLog");                               
        })
        .on('error', (err, receipt) => {
            this.SaveTransactionInfo(user, transactionKey, 3);                              
        });
    }

    async SubmitQuestions(user, results, transactionKey)
    {
        let userAddress = user ? user : this.GetUserAddress();
        let contractAddress = this.GetContractAddress();
        let actionContract = await this.GetMainContract(contractAddress);
        return actionContract.methods.SubmitQuestions(results).send({from: userAddress})
        .on('transactionHash', (hash) => {
            this.SaveTransactionInfo(user, transactionKey, 1);
            this.SendLogToUnity("TransactionLog", "SetTransactionLog", "Transaction sent - lift-off achieved! Keep exploring Pixil Saga's gamified DeFi world as your transaction travels the blockchain galaxy.Transaction sent - lift-off achieved!");   
            Unity.SendMessage("TransactionLog", "IncreaseLayerTransactionLogt");                             
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            this.SaveTransactionInfo(user, transactionKey, 2);               
        })
        .on('receipt', (receipt) => {
            this.SaveTransactionInfo(user, transactionKey, 2); 
            this.SendLogToUnity("TransactionLog", "SetTransactionLog", "Transaction Confirmed! Your quiz answers have been successfully recorded on the blockchain. Keep trying to earn those Cyber Credits, adventurer!");                               
            Unity.SendMessage("TransactionLog", "DecreaseLayerTransactionLog");
        })
        .on('error', (err, receipt) => {
            this.SaveTransactionInfo(user, transactionKey, 3);                               
        });
    }

    async GetDataQuestions(user)
    {
        let userAddress = user ? user : this.GetUserAddress();
        let contractAddress = this.GetContractAddress();

        let actionContract = await this.GetReadContract(contractAddress);
        let result = await actionContract.methods.GetDataQuest(userAddress).call();
        let totalQuestions = result.data.length;
        let data = {};

        data.BlockReturn = result.blockReturnDoQuestion;
        data.TimeTheNextToDoQuest = result.timeTheNextToDoQuest;
        data.DelayToDoQuest = result.delayToDoQuest;

        data.Questions = [];
        for(let indexQuestion = 0; indexQuestion < totalQuestions; indexQuestion++)
        {
            data.Questions[indexQuestion] = 
            {
                "Question" : result.data[indexQuestion].Question,
                "Answer0" : result.data[indexQuestion].Answer0,
                "Answer1" : result.data[indexQuestion].Answer1,
                "Answer2" : result.data[indexQuestion].Answer2,
                "Answer3" : result.data[indexQuestion].Answer3,
            }            
        }

        data.StatusQuiz = (result.timeTheNextSubmit < result.blockReturnDoQuestion) ? "0" : "1";

        return data;
    }

    async GetResultAnswers(user)
    {
        let userAddress = user ? user : this.GetUserAddress();
        let contractAddress = this.GetContractAddress();
        let actionContract = await this.GetReadContract(contractAddress);
        let results = await actionContract.methods.GetResultAnswers(userAddress).call();

        let data = {};
        data.BlockReturn = results.blockReturnSubmitQuestion;
        data.Result0 = results.data[0];
        data.Result1 = results.data[1];
        data.Result2 = results.data[2];

        let totalCorrectQuestion = 0;
        data.TotalReward = results.totalBonusToken;

        for (let index = 0; index < 3; index++) {
            if(results.data[index] == 1)
            {
                totalCorrectQuestion += 1;
            }
        }
        data.TotalCorrectQuestion = totalCorrectQuestion;
        
        return data;
    }

    GetContractAddress()
    {
        return this.configs.Contract.GetContractAddressByContractName("Question");
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

    GetStoreHelper(key) 
    {
		if (this.storeHelper[key]) {
            return this.storeHelper[key];
		}
        return {};
	}

}

export default QUESTION_HELPER;
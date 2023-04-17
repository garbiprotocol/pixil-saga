import BASE_ACTION_HELPER from "./base.action.js";

class QUESTION_HELPER extends BASE_ACTION_HELPER
{
    constructor({configs, walletHelper, storeHelper})
    {
        super({
            configs , walletHelper, storeHelper
        })

        this.DataQuestionDefault = 
        {
            DelayToDoQuest: "0",
            TimeTheNextToDoQuest: "0",
            Questions: {},
        }
    }

    async DoQuestionOnDay(user, transactionKey)
    {
        let ContractHelper = this.GetContractHelper("Question");
        ContractHelper.DoQuestionOnDay(user, transactionKey);
    }

    async SubmitQuestions(user, results, transactionKey)
    {
        let ContractHelper = this.GetContractHelper("Question");
        let promise = await ContractHelper.SubmitQuestions(user, results, transactionKey);

        if(promise.status == true)
        {
            let resultSubmitQuestions = await ContractHelper.GetResultAnswers(user);
            
            if(resultSubmitQuestions.TotalCorrectQuestion == 0)
            {
                let data = {};
                data.messege = ":)))))))))))))";
                Unity.SendMessage("ContentQuestionTask", "ShowResultSubmitQuestionLoser", JSON.stringify(data));
            }
            else
            {
                let data = {};
                data.totalCorrectQuestion = resultSubmitQuestions.TotalCorrectQuestion;
                data.messege =  `+ ${resultSubmitQuestions.TotalReward / 1e18}` ;
                
                Unity.SendMessage("ContentQuestionTask", "ShowResultSubmitQuestionWinner", JSON.stringify(data));
            }
        }
    }

    async SyncDataQuestions(user)
    {
        let ContractHelper = this.GetContractHelper("Question");

        let data =  await ContractHelper.GetDataQuestions(user);
        this.SaveDataUser(user,"user-question-data-info", data);
    }

    async SyncResultAnswers(user)
    {
        let ContractHelper = this.GetContractHelper("Question");
        let data =  await ContractHelper.GetResultAnswers(user);
        this.SaveDataUser(user, "user-answers-result-info", data);
    }

    SaveDataUser(user, keyInfo, data)
    {
        try
        {
            if(data)
            {
                let storeHelper = this.GetStoreHelper("User");
                storeHelper.Set(user, keyInfo, {Code: 1, Data: data})
            }
        }
        catch(e)
        {
            console.log("[SAVE USER DATA ERROR] :" , e);
        }
    }

    GetDataUser(user, keyInfo)
    {
        let storeHelper = this.GetStoreHelper("User");
        let data = storeHelper.Get(user, keyInfo);
        if(!data || !Object.keys(data.Data).length) {
			data =
            {
                Code: 0,
                Data: {},
            }
		}
		return data;
    }

    GetTransactionInfo(user, key)
    {
        let storeHelper = this.GetStoreHelper('Transaction');
        if(!storeHelper) return 0;
        
        let transaction = storeHelper.Get(user, 'transaction-info');
        let transactionProcess = transaction && transaction[key] ? transaction[key] : 0;
        return transactionProcess;
    }
}
export default QUESTION_HELPER
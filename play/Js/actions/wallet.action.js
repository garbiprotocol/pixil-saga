import BASE_ACTION_HELPER from './base.action.js';

class WALLET_ACTION_HELPER  extends BASE_ACTION_HELPER
{
	constructor({ configs, walletHelper, storeHelper }) 
    {
        super({
            configs, storeHelper, walletHelper
        })

        this.walletDefault = {
            Connect: 0,
            Data: {
                Message: " ",
                Nickname: " ",
                Signature: " "
            }
        };
        this.signatureDefault = {
            Connect: 0,
            Data: {
                Message: " ",
                Nickname: " ",
                Signature: " "
            }
        };
        // this.SetWallet(this.walletDefault);
	}   
	// 
	 /**
	* @Public
	* @Function Connect
	*/
	async Connect(wallet) 
    {
		await this.walletHelper.Connect(wallet);
        let isConnected = this.walletHelper.IsConnected();
        if (isConnected == false) 
        {
            console.log("[Connect]: false");
            return false;
        }
        await this.Sign();
        return true;
	}
     /**
	* @Public
	* @Function SyncWallet
	*/
	async SyncWallet() 
    {
		let isValidNode = await this.walletHelper.IsValidNode();
        let isConnected = this.walletHelper.IsConnected();
        let data                = this.GetWalletStore();
        data.Connect            = isConnected ? 1 : 0;
        data.Data.address       = this.walletHelper.GetActiveUser();
        data.Data.validNetwork  =  isValidNode ? 1 : 0;

        let accountChanged = data.Data.address && data.Data.signedAddr && data.Data.address != data.Data.signedAddr ? 1 : 0;
        data.Data.accountChanged = accountChanged;

        this.SetWallet(data);
	}

    async Disconnect()
    {
        await this.walletHelper.Disconnect();
        this.RemoveSign();
    }
    /**
	* @Public
	* @Function RemoveSign
	*/
    RemoveSign() 
    {
		let storeHelper = this.GetStoreHelper('Wallet');
		storeHelper.Set('wallet-signature', null);
    }
    /**
	* @Public
	* @Function GetWallet
	*/
    GetWallet() 
    {
		let walletObj = this.GetWalletStore();
        let signature = this.GetWalletStoreSignature();
        walletObj.Data.Message = signature.Message;
        walletObj.Data.Nickname = signature.Nickname;
        walletObj.Data.Signature = signature.Signature;
        return walletObj;
    }
    /**
	* @Private
	* @Function SetWallet
	*/
    SetWallet(walletObj) 
    {
        let storeHelper = this.GetStoreHelper('Wallet');
		return storeHelper.Set('wallet-info', walletObj);
    }
    /**
	* @Private
	* @Function GetWalletStore
	*/
    GetWalletStore() 
    {
        let storeHelper = this.GetStoreHelper('Wallet');
		let walletObj = storeHelper.Get('wallet-info');
        if (!walletObj) walletObj = this.walletDefault;
        return walletObj;
    }
    /**
	* @Private
	* @Function GetWalletStore
	*/
    GetWalletStoreSignature() 
    {
        let storeHelper = this.GetStoreHelper('Wallet');
		let signatureObj = storeHelper.Get('wallet-signature');
        if (!signatureObj) signatureObj = this.signatureDefault;
        return signatureObj;
    }
    /**
	* @Private
	* @Function Sign
	*/
    async Sign() 
    {
        if (typeof web3 == 'undefined') {
            console.log("[Sign] Invalid Web3");
            return false;
        }
        let self = this;
        let msg       = new Date().getTime();
        let signature = await web3.eth.personal.sign(msg.toString(), self.walletHelper.GetActiveUser());
        let data = {
            Message: msg.toString(),
            Nickname: self.walletHelper.GetActiveUser(),
            Signature: signature
        };
        
        // update sign Info
        let storeHelper = this.GetStoreHelper('Wallet');
		storeHelper.Set('wallet-signature', data);

        // update wallet info
        let walletInfo = this.GetWalletStore();
        walletInfo.Data.signedAddr = data.Nickname;
        this.SetWallet(walletInfo);

        return true;
        
    }
};
export default WALLET_ACTION_HELPER;

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
        
        let signature = await window.ethereum.request({
            method: "personal_sign",
            params: [this.hexer(msg.toString()), self.walletHelper.GetActiveUser()]
        })

        let data = {
            Message: this.hexer(msg.toString()),
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

    hexer (input) {
        const utf8 = this.toUTF8Array(input);
        const hex = utf8.map(n => n.toString(16));
        return '0x' + hex.join('');
      }
      
      // From https://stackoverflow.com/a/18729931
    toUTF8Array(str) {
        var utf8 = [];
        for (var i=0; i < str.length; i++) {
            var charcode = str.charCodeAt(i);
            if (charcode < 0x80) utf8.push(charcode);
            else if (charcode < 0x800) {
                utf8.push(0xc0 | (charcode >> 6),
                        0x80 | (charcode & 0x3f));
            }
            else if (charcode < 0xd800 || charcode >= 0xe000) {
                utf8.push(0xe0 | (charcode >> 12),
                        0x80 | ((charcode>>6) & 0x3f),
                        0x80 | (charcode & 0x3f));
            }
            // surrogate pair
            else {
                i++;
                // UTF-16 encodes 0x10000-0x10FFFF by
                // subtracting 0x10000 and splitting the
                // 20 bits of 0x0-0xFFFFF into two halves
                charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                        | (str.charCodeAt(i) & 0x3ff));
                utf8.push(0xf0 | (charcode >>18),
                        0x80 | ((charcode>>12) & 0x3f),
                        0x80 | ((charcode>>6) & 0x3f),
                        0x80 | (charcode & 0x3f));
            }
        }
        return utf8;
    }
};
export default WALLET_ACTION_HELPER;

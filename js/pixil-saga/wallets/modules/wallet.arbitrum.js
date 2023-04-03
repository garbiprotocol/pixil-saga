class WALLET_ARBITRUM_HELPER 
{
    constructor(options) 
    {
        this.chainName         = options.networkConfig.GetConfig("chainName");
        this.chainID           = options.networkConfig.GetConfig("chainId");
        this.rpcUrls           = options.networkConfig.GetConfig('rpcList');
        this.blockExplorerUrls = options.networkConfig.GetConfig('blockExplorerUrls');

        this.networkConfig   = options.networkConfig;
        this.providerConnect = null;
        this.isConnected = false;
        this.accountAddr = "";
        this.defaultAccount = "";
    }

    async Connect(_wallet) 
    {
        try 
        {
            let self = this;
            let provider = self.getProvider();
            if (!provider) 
            {
                return false;
            }

            let accounts = await provider.request({ method: 'eth_requestAccounts' });
            if(!accounts[0]) 
            {
                return false
            }
            provider.selectedAddress = accounts[0];
            await self._initUserWeb3();
            await self.SwitchNetWork();
            return true;


        } 
        catch(e) 
        {
            console.log("connect", e);
            return false;
        }
    }

    async Disconnect() 
    {
        try 
        {
            let self = this;
            let _provider = self.getProvider();
            if (!_provider) 
            {
                return false;
            }
            if (self.isConnected == false) 
            {
                return false;
            }
            self.providerConnect = null;
            self.isConnected = false;
            return true;
        }
        catch(e) 
        {
            console.log("Wallet:disconnect", e);
        }
    }

    async GetChainId() 
    {
        let self = this;
        try
        {
            let _provider = self.getProvider();

            if (!_provider)
            {
                return false;
            }

            if (self.IsConnected() == false)
            {
                return false;
            }
            let chainId = await _provider.request({ method: 'eth_chainId' });

            if(`${chainId.charAt(0)}${chainId.charAt(1)}` == '0x')
            {
                return parseInt(chainId.slice(2), 16);
            }
            else
            {
                return parseInt(chainId, 16);
            }

        }
        catch(e)
        {
            return false;
        }
    }

	GetActiveUser() 
    {
        return window.ethereum && window.ethereum.selectedAddress ? window.ethereum.selectedAddress : this.defaultAccount;
    }

    async GetAccount() 
    {
        let _default = "";
        try 
        {
            let _provider = this.getProvider();
            if (!_provider) 
            {
                return _default;
            }
            let _account = _provider.selectedAddress;
            if (this.isConnected && (!_account || _account == '')) 
            {
                let _accountList = await _provider.request({method: 'eth_accounts'});
                _account = _accountList[0];
            }
            return _account;
        } 
        catch(e) 
        {
            return _default;
        }
    }

    IsConnected() 
    {
        if (this.GetActiveUser() == this.defaultAccount) return false;
        return true;
    }

    async IsValidNode()
    {
        let chainId          = await this.GetChainId();
        let chainIdAlowed    = this.chainID;

        if(chainId != chainIdAlowed) 
        {
            return false;
        }
        return true;
    }

    async SwitchNetWork()
    {
        if(window.ethereum){
            if(await this.IsValidNode() == false) 
            {
                await this.switchToBinanceChain();
            }
        }
    }

    GetWeb3ToReadData() 
    {
        // let bscRpcEndPoint = 'https://arb-mainnet.g.alchemy.com/v2/eAgGBBNJUIxmvqkKrNl2-nhRB6Q_UJk-';
        // if (this._chainId != 42161) {
        //         bscRpcEndPoint = 'https://arb-goerli.g.alchemy.com/v2/EjDT3kxi1iFQMt16rz9BvNb7fTRnjc28';
        // }
        // return new Web3(bscRpcEndPoint);
        try 
        {
            if (
                1 == 1 ||
                typeof(web3) === 'undefined' ||
                !this.isConnected
                ) 
            {
                let _rpcUrl = this.networkConfig.GetRPC();
                let _web3 = new Web3(_rpcUrl);
                return _web3;
            }
            return web3;
        } 
        catch(e) 
        {
            return null;
        }
    }

    async switchToBinanceChain()
    {
        let provider      = this.getProvider();
        let chainId       = this.convertChainIdToHex();
        
        let params = 
        [{ 
            "chainId": chainId,
            "chainName": this.chainName,
            "nativeCurrency": {
                "name": 'Ethereum Coin',
                "symbol": 'ETH',
                "decimals": 18
            },
            "rpcUrls": this.rpcUrls,
            "blockExplorerUrls": this.blockExplorerUrls,
        }];
        
        try
        {
            await provider.request({ "method": 'wallet_addEthereumChain', "params": params, }); 
        }
        catch(e)
        {
            console.log('[switchToBinanceChain]', e);
            await web3.currentProvider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chainId }],
            }); 
        }
    }

    async _initUserWeb3() 
    {
        let self = this;
        try 
        {
            let _provider = this.getProvider();
            if (!_provider) 
            {
                return false;
            }
            window.web3 = new Web3(_provider);
            self.providerConnect = _provider;
            self.isConnected = true;
             return true;
        } 
        catch(e) 
        {
            return false;
        }
    }

    convertChainIdToHex() 
    {
        let chain = this.chainID; // 42161: main: 421613: test
        return `0x${parseInt(chain, 10).toString(16)}`;
    }

    getProvider() 
    {
        // set chainID will connect
        if (this.providerConnect) {
            if (this.providerConnect.isCoin98 == true) 
            {
                this.providerConnect = this.customProvider(this.providerConnect);
            }
            return this.providerConnect;
        }

        let provider;
        if (window.ethereum) 
        {
           provider = window.ethereum;
        } 
        else if (window.BinanceChain) 
        {
            provider = window.BinanceChain;
        }
        if (!provider) 
        {
            return false;
        }
        provider = this.customProvider(provider);

        return provider;
    }

    customProvider(_provider) 
    {
        _provider.chain    = this.chainName;
        if(window.isCoin98)
        {
            _provider.chainId  = this.chainID;
        }
        _provider.autoRefreshOnNetworkChange = false;

        return _provider;
    }
};
export default WALLET_ARBITRUM_HELPER;
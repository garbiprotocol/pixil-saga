class WALLET_ARBITRUM_HELPER {
    constructor(opts) 
    {
        this._chainName         = opts.networkConfig.GetConfig("chainName");
        this._chainID           = opts.networkConfig.GetConfig("chainId");
        this._rpcUrls           = opts.networkConfig.GetConfig('rpcList');
        this._blockExplorerUrls = opts.networkConfig.GetConfig('blockExplorerUrls');
        this._networkConfig   = opts.networkConfig;
        this._providerConnect = null;
        this._isConnected = false;
        this._accountAddr = '';
        this._defaultAccount = '';
    }

    async Connect(_wallet) 
    {
        try 
        {
            let self = this;
            let _provider = self._getProvider();
            if (!_provider) 
            {
                return false;
            }

            let accounts = await _provider.request({ method: 'eth_requestAccounts' });
            if(!accounts[0]) 
            {
                return false
            }
            _provider.selectedAddress = accounts[0];
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
            let _provider = self._getProvider();
            if (!_provider) 
            {
                return false;
            }
            if (self._isConnected == false) 
            {
                return false;
            }
            self._providerConnect = null;
            self._isConnected = false;
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
            let _provider = self._getProvider();

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
        return window.ethereum && window.ethereum.selectedAddress ? window.ethereum.selectedAddress : this._defaultAccount;
    }

    async GetAccount() 
    {
        let _default = "";
        try 
        {
            let _provider = this._getProvider();
            if (!_provider) 
            {
                return _default;
            }
            let _account = _provider.selectedAddress;
            if (this._isConnected && (!_account || _account == '')) 
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
        if (this.GetActiveUser() == this._defaultAccount) return false;
        return true;
    }

    async IsValidNode()
    {
        let chainId          = await this.GetChainId();
        let chainIdAlowed    = this._chainID;

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
                await this._switchToBinanceChain();
            }
        }
    }

    GetWeb3ToReadData() {
        let ArbAlchemyRpcEndPoint = 'https://arb-mainnet.g.alchemy.com/v2/eAgGBBNJUIxmvqkKrNl2-nhRB6Q_UJk-';
        if (this._chainID != 42161) 
        {
            ArbAlchemyRpcEndPoint = 'https://arb-goerli.g.alchemy.com/v2/EjDT3kxi1iFQMt16rz9BvNb7fTRnjc28';
        }
        return new Web3(ArbAlchemyRpcEndPoint);
    }

    async _switchToBinanceChain()
    {
        let _provider      = this._getProvider();
        let _chainId       = this._convertChainIdToHex();
        
        let _params = 
        [{ 
            "chainId": _chainId,
            "chainName": this._chainName,
            "nativeCurrency": {
                "name": 'Arbitrum Coin',
                "symbol": 'ETH',
                "decimals": 18
            },
            "rpcUrls": this._rpcUrls,
            "blockExplorerUrls": this._blockExplorerUrls,
        }];
        
        try
        {
            await _provider.request({ "method": 'wallet_addEthereumChain', "params": _params, }); 
        }
        catch(e)
        {
            console.log('[_switchToBinanceChain]', e);
            await web3.currentProvider.request(
            {
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: _chainId }],
            }); 
        }
    }

    async _initUserWeb3() 
    {
        let self = this;
        try 
        {
            let _provider = this._getProvider();
            if (!_provider) 
            {
                return false;
            }
            window.web3 = new Web3(_provider);
            self._providerConnect = _provider;
            self._isConnected = true;
             return true;
        } 
        catch(e) 
        {
            return false;
        }
    }

    _convertChainIdToHex() 
    {
        let _chain = this._chainID; // 56: main: 97: test
        return `0x${parseInt(_chain, 10).toString(16)}`;
    }

    _getProvider() 
    {
        // set chainID will connect
        if (this._providerConnect) 
        {
            if (this._providerConnect.isCoin98 == true) 
            {
                this._providerConnect = this._customProvider(this._providerConnect);
            }
            return this._providerConnect;
        }

        let _provider;
        if (window.ethereum) 
        {
           _provider = window.ethereum;
        } else if (window.BinanceChain) 
        {
            _provider = window.BinanceChain;
        }
        if (!_provider) 
        {
            return false;
        }
        _provider = this._customProvider(_provider);

        return _provider;
    }

    _customProvider(_provider) 
    {
        _provider.chain    = this._chainName;
        if(window.isCoin98)
        {
            _provider.chainId  = this._chainID;
        }
        _provider.autoRefreshOnNetworkChange = false;

        return _provider;
    }
};
export default WALLET_ARBITRUM_HELPER;
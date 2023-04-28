class NETWORK_HELPER 
{
	constructor({ mode }) 
	{
		this.mode = mode;
		this.configs = 
		{
			development: 
			{
				chainId : 421613,
				chainName : "Arbitrum Goerli Testnet",
				rpcList: ['https://goerli-rollup.arbitrum.io/rpc'],
				blockExplorerUrls: ['https://goerli.arbiscan.io/']
			},

			test: 
			{
				
			},

			beta: 
			{
				
			},

			production: 
			{
				chainId : 42161,
				chainName : "Arbitrum",
				rpcList: ['https://arb1.arbitrum.io/rpc'],
				blockExplorerUrls: ['https://arbiscan.io']
			}
		};
	}

    GetRPC() 
	{
        let _rpcList = this.GetConfig('rpcList');
        let _randomIndex = this.randomInRange(0, _rpcList.length - 1);
        return _rpcList[_randomIndex];
    }

    GetConfig(key) 
	{
    	return this.configs[this.mode][key];
    }

	randomInRange(start,end)
	{
        return Math.floor(Math.random() * (end - start + 1) + start);
    }
};
export default NETWORK_HELPER;
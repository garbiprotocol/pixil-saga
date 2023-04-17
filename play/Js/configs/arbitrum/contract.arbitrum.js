class CONTRACT_HELPER 
{
	constructor({ mode }) 
	{
		this.mode = mode;
		this.configs = 
		{
			development: 
			{
				Question: "0xEA7b3069B3a4eA8E4195594b9E8da27C68dA3835",
				Learning: "0xf0f5Ef2Ffe5bC7981E224e623c89EAb1589011fC",
				Treasury: "0x711468596308215966e3c9A9721AEC8E44628b91",
			},
			beta: 
			{
				
			},
			production: 
			{
				
			}
		};
	}

	GetContractAddressByContractName(nameContract) 
	{
		return this.configs[this.mode][nameContract];
	}

};
export default CONTRACT_HELPER;
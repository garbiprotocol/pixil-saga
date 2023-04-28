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
				Question: "0x48EbeBbEee39F54BF3aefb108BC5F555F9368448",
				Learning: "0xA721C6aF444Bf4e8A8cf418C54547494b0a7f950",
				Treasury: "0x78851Af360Dead9caFf50853D8548BA2d539ee99",
			}
		};
	}

	GetContractAddressByContractName(nameContract) 
	{
		return this.configs[this.mode][nameContract];
	}

};
export default CONTRACT_HELPER;
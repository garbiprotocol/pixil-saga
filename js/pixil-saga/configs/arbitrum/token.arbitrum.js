class TOKEN_HELPER 
{
	constructor({ mode }) 
	{
		this.mode = mode;
		this.configs = 
		{
			development: 
			{
				CyberCredit: 
				{
                    name: "Cyber",
                    address: "0xa55cb2d81e01773866f300c3d1c6fd7574cfa245".toLowerCase(),
                    logo: "",
                    decimals: 18
                },
				Grb:
				{
					name: "Mock GRB",
					address: "0x570A6cFA0e11f0Db8594E6a74B9106d5F21151C0",
					logo: "",
					decimals: 18
				}
			},
			test: 
			{
				
			},
			beta: 
			{
				
			},
			production: 
			{
				
			}
		};
	}

	GetToken(key) 
	{
		return this.configs[this.mode][key];
	}

	GetTokens() 
	{
		return this.configs[this.mode];
	}

	GetTokenAddrList() 
	{
		let tokens = this.GetTokens();
		let _data = [];
		for (let _idx in tokens) {
			_data.push(tokens[_idx].address);
		}
		return _data;
	}

	GetTokenNameList() 
	{
		let tokens = this.GetTokens();
		let data = [];
		for (let _idx in tokens) {
			data.push(tokens[_idx].name);
		}
		return data;
	}

	GetTokenNames() 
	{
		let tokens = this.GetTokens();
		let data   = {}
		for (let idx in tokens) 
		{
			let addr = tokens[idx].address;
			data[addr] = idx;
		}
		return data;
	}

	GetAddressTokenByName(name)
	{
		let tokens = this.GetTokens();
		return tokens[name].address;
	}
};
export default TOKEN_HELPER;
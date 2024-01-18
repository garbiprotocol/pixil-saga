class TOKEN_HELPER 
{
	constructor({ mode }) 
	{
		this.mode = mode;
		this.configs = 
		{
			development: 
			{
				Cyber: "0xa55cb2d81e01773866f300c3d1c6fd7574cfa245",
				veGRB: "0xD912cca034056115900F87C2DB8eF1a6B1a89143",
			},

			beta: 
			{
				
			},
			
			production: 
			{
				Cyber: "0x85Cf9E2fE7eEA7F362cfA940Cc4bfBb4D05e1D08",
				veGRB: "0x14c302dca44528a2b00b932afdf01e9d48100b7b",
			}
		};
	}

	GetTokenAddressByTokenName(tokenName) 
	{
		return this.configs[this.mode][tokenName];
	}
};
export default TOKEN_HELPER;
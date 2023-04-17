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
				
			}
		};
	}

	GetTokenAddressByTokenName(tokenName) 
	{
		return this.configs[this.mode][tokenName];
	}
};
export default TOKEN_HELPER;
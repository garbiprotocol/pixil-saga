class CONTRACT_HELPER 
{
	constructor({ mode }) 
	{
		this.mode = mode;
		this.configs = 
		{
			development: 
			{
				HeroNFT: "0xB00519845700513957e7763b8dcFB22d5b225741",
				RobotNFT: "0xe7335D1F80bF201D96d9E2CF29388A48191610D3",
				GameController: "0xc52C94930574221908a7b1b5894527B34F6Fe490",
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

	GetContract(key) 
	{
		return this.configs[this.mode][key];
	}

	GetHeroNFTContract()
	{
		let HeroNFT = this.configs[this.mode]["HeroNFT"];
		return HeroNFT;
	}

	GetRobotNFTContract()
	{
		let RobotNFT = this.configs[this.mode]["RobotNFT"];
		return RobotNFT;
	}

	GetGameControllerContract()
	{
		let GameController = this.configs[this.mode]["GameController"];
		return GameController;
	}

};
export default CONTRACT_HELPER;
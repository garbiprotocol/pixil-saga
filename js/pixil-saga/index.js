import Config from './configs/index.js';

const PixilSaga_NETWORK = 'arbitrum';
const PixilSaga_MODE = 'development'; //test, production

const PixilSaga_CONFIG = {
	ModeENV: PixilSaga_MODE,
	NetworkENV: PixilSaga_NETWORK,
	Abi: Config[PixilSaga_NETWORK].Abi,
	Network: new Config[PixilSaga_NETWORK].Network({ mode: PixilSaga_MODE }),
	Contract: new Config[PixilSaga_NETWORK].Contract({ mode: PixilSaga_MODE }),
	Token: new Config[PixilSaga_NETWORK].Token({ mode: PixilSaga_MODE })
};

import { initStore } from './store/index.js';

import WALLET_HELPER from './wallets/index.js';

import WAlLET_ACTION_HELPER from './actions/wallet.action.js';

import GAME_CONTROLLER_ACTION_HELPER from './actions/gameController.action.js';

import HERO_NFT_ACTION_HELPER from './actions/heroNFT.action.js';

import ROBOT_NFT_ACTION_HELPER from './actions/robotNFT.action.js';

import GRB_ACTION_HELPER from './actions/grb.action.js';


const StoreHelper  = initStore();

const WalletHelper = new WALLET_HELPER[PixilSaga_NETWORK]({ networkConfig: PixilSaga_CONFIG.Network, mode: PixilSaga_MODE  });

const WalletActionHelper = new WAlLET_ACTION_HELPER({ configs: PixilSaga_CONFIG, walletHelper: WalletHelper, storeHelper : StoreHelper });

const GameController = new GAME_CONTROLLER_ACTION_HELPER({configs: PixilSaga_CONFIG, walletHelper: WalletHelper, storeHelper: StoreHelper});

const HeroNFTHelper = new HERO_NFT_ACTION_HELPER({configs: PixilSaga_CONFIG, walletHelper: WalletHelper, storeHelper: StoreHelper});

const RobotNFTHelper = new ROBOT_NFT_ACTION_HELPER({configs: PixilSaga_CONFIG, walletHelper: WalletHelper, storeHelper: StoreHelper});

const GrbHelper = new GRB_ACTION_HELPER({configs: PixilSaga_CONFIG, walletHelper: WalletHelper});

window.PixilSaga = {
	Wallet: WalletActionHelper,
	GameController: GameController,
	HeroNFT: HeroNFTHelper,
	RobotNFT: RobotNFTHelper,
	Grb: GrbHelper,
};
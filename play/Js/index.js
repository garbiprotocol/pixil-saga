// import Util from './utils/index.js';
import Config from './configs/index.js';

const Pixiventure_NETWORK = 'arbitrum';
const Pixiventure_MODE = 'development'; //beta, production
const Pixiventure_CONFIG = {
	ModeENV: Pixiventure_MODE,
	NetworkENV: Pixiventure_NETWORK,
	Abi: Config[Pixiventure_NETWORK].Abi,
	Network: new Config[Pixiventure_NETWORK].Network({ mode: Pixiventure_MODE }),
	Contract: new Config[Pixiventure_NETWORK].Contract({ mode: Pixiventure_MODE }),
	Token: new Config[Pixiventure_NETWORK].Token({ mode: Pixiventure_MODE })
};

import WALLET_HELPER from './wallets/index.js';
import { initStore } from './store/index.js';

import QUESTION_ACTION_HELPER from './actions/Question.action.js';
import CYBER_CREDIT_ACTION_HELPER from './actions/CyberCredit.ERC20.action.js';
import VE_GRB_ACTION_HELPER from './actions/VeGRB.ERC20.action.js';
import WAlLET_ACTION_HELPER from './actions/wallet.action.js';
import LEARNING_ACTION_HELPER from './actions/Learning.action.js';
import TREASURY_ACTION_HELPER from './actions/Treasury.action.js';


const StoreHelper  = initStore();
const WalletHelper = new WALLET_HELPER[Pixiventure_NETWORK]({ networkConfig: Pixiventure_CONFIG.Network, mode: Pixiventure_MODE  });

const QuestionActionHelper = new QUESTION_ACTION_HELPER({ configs: Pixiventure_CONFIG, walletHelper: WalletHelper, storeHelper : StoreHelper });

const CyberCreditActionHelper = new CYBER_CREDIT_ACTION_HELPER({ configs: Pixiventure_CONFIG, walletHelper: WalletHelper, storeHelper : StoreHelper });

const VeGRBActionHelper = new VE_GRB_ACTION_HELPER({ configs: Pixiventure_CONFIG, walletHelper: WalletHelper, storeHelper : StoreHelper });

const WalletActionHelper = new WAlLET_ACTION_HELPER({ configs: Pixiventure_CONFIG, walletHelper: WalletHelper, storeHelper : StoreHelper });

const LearningAcctionHelper = new LEARNING_ACTION_HELPER({configs: Pixiventure_CONFIG, walletHelper: WalletHelper, storeHelper: StoreHelper}, {tokenAction: CyberCreditActionHelper});

const TreasuryActionHelper = new TREASURY_ACTION_HELPER({configs: Pixiventure_CONFIG, walletHelper: WalletHelper, storeHelper: StoreHelper}, {tokenAction: CyberCreditActionHelper});

window.Pixiventure = {
	Question: QuestionActionHelper,
	CyberCredit: CyberCreditActionHelper,
	VeGRB: VeGRBActionHelper,
	Wallet: WalletActionHelper,
	Learning: LearningAcctionHelper,
	Treasury: TreasuryActionHelper,
};
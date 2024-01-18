import STORE_HELPER from '../store.js';
/**
* @Key [{network}.wallet-info] 
* @Type: Object {
    Connect: Int, // 0 | 1
    Data: Object {
        Address   : String,
        Token     : String,
        ValidNetwork: Int // 0|1
    }
}
*/
class WALLET_HELPER extends STORE_HELPER 
{
	constructor({ network }) 
    {
		super({ name: 'DB_Wallet' });
		this.network = network;
		this.keys = 
        [
			'wallet-info',
            "wallet-signature"
		];
	}
	Set(key, value) {
		this.require(this.validate(key, this.keys), `[Invalid Key]:: ${key}`);
        this.set(`${this.network}.${key}`, value);
    }
	Get(key) {
		this.require(this.validate(key, this.keys), `[Invalid Key]:: ${key}`);
        return this.get(`${this.network}.${key}`);
    }
};
export default WALLET_HELPER;
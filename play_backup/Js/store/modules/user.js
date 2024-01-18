import STORE_HELPER from '../store.js';

class USER_HELPER extends STORE_HELPER 
{
	constructor({ network }) 
	{
		super({ name: 'DB_User' });
		this.network = network;
		this._keys = 
		[
			'user-question-data-info',
            'user-answers-result-info',
			'user-system-config-learning-info',
			'user-learning-data-info',
			'user-balance-cyber-credit-info',
		];
	}

	Set(user, key, value) 
	{
		// _user = _user.toLowerCase().trim();
		this.require(this.validate(key, this._keys), `[Invalid Key]:: ${key}`);
        this.set(`${this.network}.${key}-${user}`, value);
    }

	Get(user, key) 
	{
		// _user = _user.toLowerCase().trim();
		this.require(this.validate(key, this._keys), `[Invalid Key]:: ${key}`);
        return this.get(`${this.network}.${key}-${user}`);
    }
};
export default USER_HELPER;
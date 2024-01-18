class STORE_HELPER 
{
	constructor({ name }) 
	{
		this.name = name;
		this.data = {};
	}
	set(key, value) 
	{
        this.data[key] = value;
    }
	get(key) 
	{
        return this.data[key];
    }
    validate(key, allowKeys = []) 
	{
    	if (!key) return false;
    	if (!allowKeys.includes(key)) return false;
    	return true;
    }
    require(status, message) 
	{
    	if (status == false) throw new Error(message);
    }
};
export default STORE_HELPER;
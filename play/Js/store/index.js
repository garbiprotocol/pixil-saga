import Stores from "./modules/index.js";

export function initStore(network) 
{
    let stores = {};

    for (const key in Stores) 
    {
        stores[key] = new Stores[key]({network});
    }
	
    return stores;
}
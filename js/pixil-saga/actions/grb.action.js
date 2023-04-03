import BASE_ACTION_HELPER from "./base.action.js";

class GRB_ACTION_HELPER extends BASE_ACTION_HELPER
{
    constructor({configs, walletHelper})
    {
        super({configs, walletHelper});
    }

    approve(spender, amount)
    {
        let contract = this.GetContractHelper("Grb");

        contract.CallApprove(spender, amount);
    }

    allowance(owner, spender)
    {
        let contract = this.GetContractHelper("Grb");

        return contract.CallGetAllowance(owner, spender);
    }
}

export default GRB_ACTION_HELPER
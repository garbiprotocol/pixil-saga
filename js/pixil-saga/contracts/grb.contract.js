import BASE_CONTRACT_ARBITRUM_HELPER from "./base.contract.arbitrum.js";

class GRB_CONTRACT_HELPER extends BASE_CONTRACT_ARBITRUM_HELPER
{
    constructor(options)
    {
        let configs = options.configs;
        let abi = configs.Abi["Erc20"];
        options.abi = abi;

        super(options)
    }

    async CallApprove(spender, amount)
    {
        let userAddress = this.GetUserAddress();
        let contractAddress = this.GetGRBContract();
        let actionContract = await this.GetMainContract(contractAddress);

        actionContract.methods.approve(spender, amount).send({from: userAddress})
        .on('transactionHash', (hash) => {
            // html
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            // html
        })
        .on('receipt', (receipt) => {
            // html
        })
        .on('error', (err, receipt) => {
            // html
        });
    }

    async CallGetAllowance(owner, spender)
    {
        let userAddress = owner ? owner: this.GetUserAddress();
        let contractAddress = this.GetGRBContract();
        let actionContract = await this.GetReadContract(contractAddress);

        return await actionContract.methods.allowance(userAddress, spender).call()
    }

    GetGRBContract()
    {
        return this.configs.Token.GetAddressTokenByName("Grb");
    }
}

export default GRB_CONTRACT_HELPER;
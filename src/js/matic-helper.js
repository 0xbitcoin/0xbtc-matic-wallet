

  const MaticPOSClient = require("@maticnetwork/maticjs").MaticPOSClient;
  const config =require("./config-0xbtc")


var helper = {

   getMaticPOSClient (Web3,ethProvider,userAddress) {
    return new MaticPOSClient({
      network: "mainnet", // For testnet change this to testnet
      version: "v1", // For testnet change this to mumbai
      parentProvider: ethProvider,
      maticProvider:  new Web3.providers.HttpProvider(config.child.RPC) , //<network.Matic.RPC> OR new Web3.providers.HttpProvide(<network.Matic.RPC>)
      parentDefaultOptions: { from: userAddress }, // optional, can also be sent as last param while sending tx
      maticDefaultOptions: { from: userAddress }, // optional, can also be sent as last param while sending tx
    });
  }

}


export default helper



/*


// Approve ERC20 tokens for deposit using POS Portal
await maticPOSClient.approveERC20ForDeposit(
  rootToken, // RootToken address,
  amount, // Amount for approval (in wei)
  options // transaction fields, can be skipped if default options are set
)

// Deposit tokens into Matic chain using POS Portal.
// Remember to call `approveERC20ForDeposit` before this
await maticPOSClient.depositERC20ForUser(
  rootToken, // RootToken address
  user, // User address (in most cases, this will be sender's address),
  amount, // Amount for deposit (in wei)
  options // transaction fields, can be skipped if default options are set
)

*/

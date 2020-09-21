
  const MaticPlasmaClient = require("@maticnetwork/maticjs");
  const MaticPOSClient = require("@maticnetwork/maticjs").MaticPOSClient;
  const config =require("./config-0xbtc")
  var Web3 = require('web3');

//  var maticPlasmaClient;
  //var maticPlasmaConnection;

var helper = {

  initPlasmaClient(web3)
  {
    /*var web3Provider = new Web3.providers.HttpProvider(web3.givenProvider);//metamask

    console.log('init plasma client ', web3)
    // Create sdk instance
    maticPlasmaClient = new MaticPlasmaClient({
      network: 'mainnet', // set network name
      version: 'v1', // set network version

      // Set Matic provider - string or provider instance
      // Example: <network.Matic.RPC> OR new Web3.providers.HttpProvide(<network.Matic.RPC>)
      // Some flows like startExitFor[Metadata]MintableBurntToken, require a webSocket provider such as new web3 providers.WebsocketProvider('ws://localhost:8546')
      maticProvider: config.child.RPC,

      // Set Mainchain provider - string or provider instance
      // Example: 'https://ropsten.infura.io' OR new Web3.providers.HttpProvider('http://localhost:8545')
      parentProvider:  web3Provider,
      // set default options e.g { from }
      parentDefaultOptions: {   },
      // set default options
      maticDefaultOptions: {   },
    })

      // init matic

      maticPlasmaClient.initialize()

      maticPlasmaConnection = new MaticPlasmaClient({
        network: 'mainnet', // set network name
        version: 'v1', // set network version

        // Set Matic provider - string or provider instance
        // Example: <network.Matic.RPC> OR new Web3.providers.HttpProvide(<network.Matic.RPC>)
        // Some flows like startExitFor[Metadata]MintableBurntToken, require a webSocket provider such as new web3 providers.WebsocketProvider('ws://localhost:8546')
        maticProvider: web3Provider ,

        // Set Mainchain provider - string or provider instance
        // Example: 'https://ropsten.infura.io' OR new Web3.providers.HttpProvider('http://localhost:8545')
        parentProvider:  config.root.RPC,
        // set default options e.g { from }
        parentDefaultOptions: {   },
        // set default options
        maticDefaultOptions: {   },
      })

        // init matic

        maticPlasmaConnection.initialize()*/
  },

  //readonly
   getMaticPOSClient (ethProvider,userAddress) {   //metamask set to eth mainnet
    return new MaticPOSClient({
      network: "mainnet", // For testnet change this to testnet
      version: "v1", // For testnet change this to mumbai
      parentProvider: ethProvider,
      maticProvider:  new Web3.providers.HttpProvider(config.child.RPC) , //<network.Matic.RPC> OR new Web3.providers.HttpProvide(<network.Matic.RPC>)
      parentDefaultOptions: { from: userAddress }, // optional, can also be sent as last param while sending tx
      maticDefaultOptions: { from: userAddress }, // optional, can also be sent as last param while sending tx
    });
  },
  getMaticPOSConnection(maticProvider,userAddress) { //metamask set to matic mainnet
   return new MaticPOSClient({
     network: "mainnet", // For testnet change this to testnet
     version: "v1", // For testnet change this to mumbai
     parentProvider: new Web3.providers.HttpProvider(config.root.RPC),
     maticProvider: maticProvider  , //<network.Matic.RPC> OR new Web3.providers.HttpProvide(<network.Matic.RPC>)
     parentDefaultOptions: { from: userAddress }, // optional, can also be sent as last param while sending tx
     maticDefaultOptions: { from: userAddress }, // optional, can also be sent as last param while sending tx
   });
 },
 getMaticPlasmaClient(web3Provider){//metamask set to eth mainnet


       var maticPlasmaClient = new MaticPlasmaClient({
       network: 'mainnet', // set network name
       version: 'v1', // set network version

       // Set Matic provider - string or provider instance
       // Example: <network.Matic.RPC> OR new Web3.providers.HttpProvide(<network.Matic.RPC>)
       // Some flows like startExitFor[Metadata]MintableBurntToken, require a webSocket provider such as new web3 providers.WebsocketProvider('ws://localhost:8546')
       maticProvider: config.child.RPC,

       // Set Mainchain provider - string or provider instance
       // Example: 'https://ropsten.infura.io' OR new Web3.providers.HttpProvider('http://localhost:8545')
       parentProvider:  web3Provider,
       // set default options e.g { from }
       parentDefaultOptions: {   },
       // set default options
       maticDefaultOptions: {   },
     })

       // init matic

       maticPlasmaClient.initialize()

   return maticPlasmaClient;
 },
 getMaticPlasmaConnection(web3Provider)//metamask set to matic mainnet
 {

   var maticPlasmaConnection = new MaticPlasmaClient({
     network: 'mainnet', // set network name
     version: 'v1', // set network version

     // Set Matic provider - string or provider instance
     // Example: <network.Matic.RPC> OR new Web3.providers.HttpProvide(<network.Matic.RPC>)
     // Some flows like startExitFor[Metadata]MintableBurntToken, require a webSocket provider such as new web3 providers.WebsocketProvider('ws://localhost:8546')
     maticProvider: web3Provider ,

     // Set Mainchain provider - string or provider instance
     // Example: 'https://ropsten.infura.io' OR new Web3.providers.HttpProvider('http://localhost:8545')
     parentProvider:  config.root.RPC,
     // set default options e.g { from }
     parentDefaultOptions: {   },
     // set default options
     maticDefaultOptions: {   },
   })

   maticPlasmaConnection.initialize()

   return maticPlasmaConnection;
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



// Burn ERC20 tokens(deposited using POS Portal) on Matic chain and retrieve the Transaction hash
    await maticPOSClient.burnERC20(
      childToken, // ChildToken address
      amount, // Amount to burn (in wei)
      options // transaction fields, can be skipped if default options are set
    )

    // Exit funds from the POS Portal using the Transaction hash generated from the 'burnERC20' method
    // Can be called after checkpoint has been submitted for the block containing burn tx.
    await maticPOSClient.exitERC20(
      txHash, // Transaction hash generated from the 'burnERC20' method
      options // transaction fields, can be skipped if default options are set
    )
*/

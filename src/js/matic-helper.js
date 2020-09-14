const MaticPOSClient = require("@maticnetwork/maticjs").MaticPOSClient;
const config =require("./config-0xbtc")

const getMaticPOSClient = (ethProvider,userAddress) => {
  return new MaticPOSClient({
    network: "mainnet", // For testnet change this to testnet
    version: "v1", // For testnet change this to mumbai
    parentProvider: ethProvider,
    maticProvider:  new Web3.providers.HttpProvide(config.child.RPC) , //<network.Matic.RPC> OR new Web3.providers.HttpProvide(<network.Matic.RPC>)
    parentDefaultOptions: { from: userAddress }, // optional, can also be sent as last param while sending tx
    maticDefaultOptions: { from: userAddress }, // optional, can also be sent as last param while sending tx
  });
};

module.exports = {
  getMaticPOSClient,
};


<template>
    <div class="">
      <h3 class="text-lg font-bold">Wallet Balance</h3>

      <div class="p-12 text-xl w-full text-center">
        0
      </div>

      <div>

        <div class="p-6 bg-gray-500 w-full text-sm">
          <input v-on:keyup="updateFormMode" type="text" v-model="swapAmount" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline inline-block mr-4" size="8"/>

          <button v-if="formMode=='none'"  class="bg-white text-sm text-gray-200 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-block">
            Swap {{assetName}} To {{otherNetworkName()}}
          </button>

          <button v-if="formMode=='approve'" @click="approve" class="bg-white text-sm hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-block ">
            Approve {{assetName}} To {{otherNetworkName()}}
          </button>

          <button v-if="formMode=='swap'" @click="swap" class="bg-white  text-sm hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-block">
            Swap {{assetName}} To {{otherNetworkName()}}
          </button>
        </div>





      </div>
    </div>
</template>

<script>
import Web3Helper from '../js/web3-helper.js'
import MaticHelper from '../js/matic-helper.js'
import CryptoAssets from '../js/cryptoassets.js'

export default {
  name: 'TransactionForm',
  props: ['activeNetwork','acctAddress','assetName'],
  data() {
    return {
      swapAmount: 0,
      formMode: "none"
    }
  },
  onCreated()
  {
    this.updateFormMode();
    setInterval(this.updateFormMode, 5000);
  },
  methods: {
    otherNetworkName(){
      if(this.activeNetwork == "matic"){ return "Ethereum" }else{ return "Matic" }
    },
    async updateFormMode()
    {
      console.log('updateFormMode');
      var numApproved = await Web3Helper.getTokensAllowance(CryptoAssets.assets['0xBTC']['EthereumContract'], this.acctAddress, CryptoAssets.assets['0xBTC']['EthereumPredicateContract'] )

      console.log('num Approved ', numApproved)

      if(this.swapAmount <= 0 )
      {
          this.formMode= "none"
          return;
      }

      if(numApproved < this.swapAmount)
      {
        this.formMode= "approve"
      }else{
        this.formMode= "swap"
      }




    },
    async getAmountApproved()
    {

    },
    async approve()
    {

      var Web3 = require('web3');
      var web3provider = new Web3(Web3.givenProvider || 'ws://localhost:8546');

      console.log('swap');
      var userAddress = this.acctAddress;

      var maticClient = MaticHelper.getMaticPOSClient(Web3,web3provider,userAddress);

    //  console.log(CryptoAssets.assets['0xBTC']['EthereumContract'], this.swapAmount, userAddress );

      var result = await maticClient.approveERC20ForDeposit(
        CryptoAssets.assets['0xBTC']['EthereumContract'],
        CryptoAssets.assets['0xBTC']['MaxSupply'] * CryptoAssets.assets['0xBTC']['DecimalMultiplier'],
        {from: userAddress}
      )


    },
    async swap()
    {

      var Web3 = require('web3');
      var web3provider = new Web3(Web3.givenProvider || 'ws://localhost:8546');

      console.log('swap');
      var userAddress = this.acctAddress;

      var maticClient = MaticHelper.getMaticPOSClient(Web3,web3provider,userAddress);

    //  console.log(CryptoAssets.assets['0xBTC']['EthereumContract'], this.swapAmount, userAddress );


      var result = await maticClient.depositERC20ForUser(
        CryptoAssets.assets['0xBTC']['EthereumContract'],
        userAddress,
        this.swapAmount  * CryptoAssets.assets['0xBTC']['DecimalMultiplier'],
        {from: userAddress}
      )
    }

  }
}
</script>

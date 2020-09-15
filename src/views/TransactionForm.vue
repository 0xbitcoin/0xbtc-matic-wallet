
<template>
    <div class="">
      <h3 class="text-lg font-bold">Wallet Balance</h3>

      <div class="p-12 text-xl w-full text-center">
        {{currentBalance}} {{assetName}}
      </div>

      <div>

        <div class="p-6 bg-gray-500 w-full text-sm">
          <input v-on:keyup="updateFormMode" type="text" v-model="swapAmount" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline inline-block mr-4" size="8"/>

          <button v-if="formMode=='none'"  class="bg-white text-sm text-gray-200 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-block">
            Swap To {{otherNetworkName()}}
          </button>

          <button v-if="formMode=='approve'" @click="approve" class="bg-white text-sm hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-block ">
            Approve
          </button>

          <button v-if="formMode=='swap'" @click="swap" class="bg-white  text-sm hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-block">
            Swap To {{otherNetworkName()}}
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
      formMode: "none",
      currentBalance: '0.0',
      burnTXHash: null
    }
  },
  mounted()
  {

    this.updateFormMode();
    this.updateBalance();
    setInterval(this.updateFormMode, 2000);
    setInterval(this.updateBalance, 2000);
  },
  updated()
  {
    //    this.updateBalance();
  },
  methods: {
    otherNetworkName(){
      if(this.activeNetwork == "matic"){ return "Ethereum" }else{ return "Matic" }
    },
    async updateBalance()
    {
      if(this.activeNetwork == "ethereum"){
        var balanceRaw = await Web3Helper.getTokensBalance(
          CryptoAssets.assets[this.assetName]['EthereumContract'],
           this.acctAddress
         )
        this.currentBalance =  Web3Helper.rawAmountToFormatted(balanceRaw, CryptoAssets.assets[this.assetName]['Decimals']);
      }
      if(this.activeNetwork == "matic"){
        var web3provider = new Web3(Web3.givenProvider || 'ws://localhost:8546');
        var userAddress = this.acctAddress;

        var maticClient = MaticHelper.getMaticPOSClient(web3provider,userAddress);
        var balanceRaw = await maticClient.balanceOfERC20(
          userAddress,
          CryptoAssets.assets[this.assetName]['MaticContract'],
          {}

        )
        this.currentBalance =  Web3Helper.rawAmountToFormatted(balanceRaw, CryptoAssets.assets[this.assetName]['Decimals']);

      }

    },
    async updateFormMode()
    {
      console.log('updateFormMode');

      if(this.swapAmount <= 0 )
      {
          this.formMode= "none"
          return;
      }

      if(this.activeNetwork == "ethereum"){

          var numApproved = await Web3Helper.getTokensAllowance(CryptoAssets.assets['0xBTC']['EthereumContract'], this.acctAddress, CryptoAssets.assets['0xBTC']['EthereumPredicateContract'] )

          console.log('num Approved ', numApproved)



          if(numApproved < this.swapAmount)
          {
            this.formMode= "approve"
          }else{
            this.formMode= "swap"
          }
        }

        if(this.activeNetwork == "matic"){
          this.formMode= "approve"
        }




    },
    async getAmountApproved()
    {

    },
    async approve()
    {

      if(this.activeNetwork == "ethereum"){

        var Web3 = require('web3');
        var web3provider = new Web3(Web3.givenProvider || 'ws://localhost:8546');
        var userAddress = this.acctAddress;

        var maticClient = MaticHelper.getMaticPOSClient(web3provider,userAddress);

        var result = await maticClient.approveERC20ForDeposit(
          CryptoAssets.assets[this.assetName]['EthereumContract'],
          Web3Helper.formattedAmountToRaw(this.swapAmount, CryptoAssets.assets[this.assetName]['Decimals']),
          {from: userAddress}
        )
      }

      if(this.activeNetwork == "matic"){

        var Web3 = require('web3');
        var web3provider = new Web3(Web3.givenProvider || 'ws://localhost:8546');
        var userAddress = this.acctAddress;

        var maticClient = MaticHelper.getMaticPOSConnection(web3provider,userAddress);

        var result = await maticClient.burnERC20(
          CryptoAssets.assets[this.assetName]['MaticContract'],
            Web3Helper.formattedAmountToRaw(this.swapAmount, CryptoAssets.assets[this.assetName]['Decimals']),
          {from: userAddress}
        )
        console.log(result)



      }


    },
    async swap()
    {

      if(this.activeNetwork == "ethereum"){

          var Web3 = require('web3');
          var web3provider = new Web3(Web3.givenProvider || 'ws://localhost:8546');
          var userAddress = this.acctAddress;

          var maticClient = MaticHelper.getMaticPOSClient(web3provider,userAddress);

        //  console.log(CryptoAssets.assets['0xBTC']['EthereumContract'], this.swapAmount, userAddress );


          var result = await maticClient.depositERC20ForUser(
            CryptoAssets.assets[this.assetName]['EthereumContract'],
            userAddress,
              Web3Helper.formattedAmountToRaw(this.swapAmount  * CryptoAssets.assets[this.assetName]['Decimals']),
            {from: userAddress}
          )

          // get burn tx hash
        }

        if(this.activeNetwork == "matic"){

          var Web3 = require('web3');
          var web3provider = new Web3(Web3.givenProvider || 'ws://localhost:8546');
          var userAddress = this.acctAddress;

          var maticClient = MaticHelper.getMaticPOSClient(web3provider,userAddress);

          var result = await maticClient.exitERC20(
            this.burnTXHash,
            {from: userAddress}
          )



        }



    }

  }
}
</script>

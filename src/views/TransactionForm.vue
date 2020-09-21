
<template>
    <div class="">
      <h3 class="text-lg font-bold">Wallet Balance (On {{currentNetworkName()}} Network)</h3>

      <div class="p-12 text-xl w-full text-center">
        {{currentBalance}} {{assetName}}
      </div>

      <div>

        <div v-if="networkProviderIdError" class="p-8 bg-red-200">
          {{networkProviderIdError}}
        </div>

        <div class="p-6 bg-gray-500 w-full text-sm">
          <h3 class="text-lg text-white mb-8">Bridge {{assetName}} To {{otherNetworkName()}} Network</h3>

          <input v-if="formMode=='none'||formMode=='approve'||formMode=='swapin'" v-on:keyup="updateFormMode" type="text" v-model="swapAmount" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline inline-block mr-4" size="8"/>


          <button v-if="formMode=='none'"  class="bg-white text-sm text-gray-200 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full mt-2">

            Swap To {{otherNetworkName()}}
          </button>


            <button v-if="formMode=='approve'" @click="approveForSwap" class="bg-white text-sm hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full mt-2 ">
              Approve
            </button>

            <button v-if="formMode=='swapin'" @click="swapin" class="bg-white  text-sm hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full mt-2">
              Swap To {{otherNetworkName()}}
            </button>




          <div v-if="formMode=='swapout'">
            <input v-on:keyup="updateFormMode" type="text" v-model="swapOutAmount" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline inline-block mr-4" size="8"/>

            <button @click="startexit" class="bg-white text-sm hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-block ">
              Start Exit
            </button>
          </div>

          <br>

          <div v-if="formMode=='swapout'">

            <p>  Startexit TX Hash  </p>
            <input v-on:keyup="updateFormMode" type="text" placeholder="0x2134..." v-model="burnTXHash" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline inline-block mr-4" size="8"/>

            <button v-if="!loading" @click="swapout" class="bg-white  text-sm hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-block">
              Swap To {{otherNetworkName()}}
            </button>

            <div class="inline-block">
              <div v-if="loading" class="loader "></div>
            </div>
          </div>


          <div class="m-4">
            <div v-if="txError">{{txError}}</div>

          </div>

        </div>



        <div class="p-6 bg-gray-500 w-full text-sm">
          <h3 class="text-lg text-white mb-8">Transfer {{assetName}} Within the {{currentNetworkName()}} Network</h3>


          <div class="my-4">
            <input type="text" v-model="transferTo" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline inline-block mr-4" size="8" placeholder="to (address)"/>
            <input type="text" v-model="transferAmount" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline inline-block mr-4" size="8" placeholder="amount"/>

            <button   @click="standardTransfer" class="bg-white  text-sm hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-block">
              Transfer
            </button>
          </div>

          <div class="my-4">
            <input type="text" v-model="approveTo" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline inline-block mr-4" size="8" placeholder="to (address)"/>
            <input type="text" v-model="approveAmount" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline inline-block mr-4" size="8" placeholder="amount"/>

            <button   @click="standardApprove" class="bg-white  text-sm hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-block">
              Approve
            </button>
          </div>



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
  props: ['activeNetwork','acctAddress','assetName','providerNetworkID'],
  data() {
    return {
      swapAmount: 0,
      swapOutAmount: 0,
      transferTo:null,
      transferAmount:null,
      approveTo:null,
      approveAmount:null,
      formMode: "none",
      currentBalance: '0.0',
      burnTXHash: null,
      txError: null,
      loading: false,
      networkProviderIdError: null
    }
  },
  mounted()
  {

    this.updateAll();
    setTimeout(this.updateFormMode, 2000);
    setTimeout(this.updateBalance, 2000);
  },
  updated()
  {

    this.updateAll();
  },
  methods: {
    updateAll()
    {
        console.log('form updated')
      this.updateFormMode();
      this.updateBalance();
    },
    currentNetworkName(){
      if(this.activeNetwork == "matic"){ return "Matic" }else{ return "Ethereum" }
    },
    otherNetworkName(){
      if(this.activeNetwork == "matic"){ return "Ethereum" }else{ return "Matic" }
    },
    checkNetworkProviderIdValid(){

      if(this.activeNetwork == "ethereum")
      {
        if(this.providerNetworkID != Web3Helper.ethereumChainID())
        {
          this.networkProviderIdError = "Please switch your Web3 Provider to Ethereum Mainnet to call these methods."
          return false
        }
      }

      //this.networkProviderIdError = null;
      return true;
    },
    async updateBalance()
    {
      if(this.activeNetwork == "ethereum"){
        var balanceRaw = await Web3Helper.getTokensBalance(
          CryptoAssets.assets[this.assetName]['EthereumContract'],
           this.acctAddress
         )
        this.currentBalance =  Web3Helper.rawAmountToFormatted(balanceRaw, CryptoAssets.assets[this.assetName]['Decimals']);

        this.burnTXHash = null;
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



      if(this.activeNetwork == "ethereum"){


        if(this.swapAmount <= 0 )
        {
            this.formMode= "none"
            return;
        }


        var hasAllowance = await Web3Helper.hasEnoughAllowance(this.acctAddress,this.assetName,this.swapAmount);

          if(hasAllowance)
          {
            this.formMode= "swapin"
          }else{
            this.formMode= "approve"
          }
        }

        if(this.activeNetwork == "matic"){


            this.formMode= "swapout"


        }

        this.checkNetworkProviderIdValid()

        //this.networkProviderIdError = null;


    },
    async getAmountApproved()
    {

    },
    async standardApprove()
    {

      this.networkProviderIdError=null;


      var web3 = window.web3
      var userAddress = this.acctAddress;
      var amt  = Web3Helper.formattedAmountToRaw(this.approveAmount, CryptoAssets.assets[this.assetName]['Decimals']);



      if(this.activeNetwork == "ethereum"){
        if(this.providerNetworkID == 0x1){

          var contractAddress = CryptoAssets.assets[this.assetName]['EthereumContract'];


          var tokenContract = await Web3Helper.getTokenContract(web3,contractAddress,userAddress);

          tokenContract.approve(this.approveTo,amt).send({from: userAddress})
          .then(function(receipt){
              // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
          });

        }else{
          this.networkProviderIdError = "Please switch your Web3 Provider to Ethereum Mainnet to call this method."
        }
      }

      if(this.activeNetwork == "matic"){
        if(this.providerNetworkID == 0x89){

          var contractAddress = CryptoAssets.assets[this.assetName]['MaticContract'];


          var tokenContract = await Web3Helper.getTokenContract(web3,contractAddress,userAddress);

          tokenContract.approve(this.approveTo,amt).send({from: userAddress})
          .then(function(receipt){
              // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
          });

        }else{
          this.networkProviderIdError = "Please switch your Web3 Provider to Ethereum Mainnet to call this method."
        }
      }
    },
    async standardTransfer()
    {
      this.networkProviderIdError=null;


      var web3 = window.web3
      var userAddress = this.acctAddress;

      var amt  = Web3Helper.formattedAmountToRaw(this.transferAmount, CryptoAssets.assets[this.assetName]['Decimals']);



       console.log('xferring amt',amt)


      if(this.activeNetwork == "ethereum"){
        if(this.providerNetworkID == 0x1){

          var contractAddress = CryptoAssets.assets[this.assetName]['EthereumContract'];


          var tokenContract = await Web3Helper.getTokenContract(web3,contractAddress,userAddress);

          console.log(tokenContract)
          console.log('meep',tokenContract.methods)

          tokenContract.transfer(this.transferTo,amt).send({from: userAddress})
          .then(function(receipt){
              // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
          });

        }else{
          this.networkProviderIdError = "Please switch your Web3 Provider to Ethereum Mainnet to call this method."
        }
      }

      if(this.activeNetwork == "matic"){
        if(this.providerNetworkID == 0x89){

          var contractAddress = CryptoAssets.assets[this.assetName]['MaticContract'];

          var maticValue = 0;

          if(contractAddress == CryptoAssets.assets['Matic']['MaticContract'] )
          {
            maticValue = amt;

            web3.eth.sendTransaction({from:userAddress,to:this.transferTo, value:amt  }, function(err, transactionHash) {
              if (!err)
                console.log(transactionHash);
              });

          }else{

            var tokenContract = await Web3Helper.getTokenContract(web3,contractAddress,userAddress);
            tokenContract.transfer(this.transferTo,amt).send({from: userAddress,value:maticValue})
            .then(function(receipt){
                // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
            });

          }






        }else{
          this.networkProviderIdError = "Please switch your Web3 Provider to Ethereum Mainnet to call this method."
        }
      }
    },

    async approveForSwap()
    {

      this.networkProviderIdError=null;

      if(this.providerNetworkID == 0x1){

        var Web3 = require('web3');
        var web3provider = new Web3(Web3.givenProvider || 'ws://localhost:8546');
        var userAddress = this.acctAddress;

        var maticClient = MaticHelper.getMaticPOSClient(web3provider,userAddress);

        var result = await maticClient.approveERC20ForDeposit(
          CryptoAssets.assets[this.assetName]['EthereumContract'],
          Web3Helper.formattedAmountToRaw(this.swapAmount, CryptoAssets.assets[this.assetName]['Decimals']),
          {from: userAddress}
        )
      }else{
        this.networkProviderIdError = "Please switch your Web3 Provider to Ethereum Mainnet to call this method."

      }





    },
    async startexit()
    {

          this.networkProviderIdError=null;

        if(this.providerNetworkID == 0x89){

        var Web3 = require('web3');
        var web3provider = new Web3(Web3.givenProvider || 'ws://localhost:8546');
        var userAddress = this.acctAddress;

        var maticClient = MaticHelper.getMaticPOSConnection(web3provider,userAddress);

        var result = await maticClient.burnERC20(
          CryptoAssets.assets[this.assetName]['MaticContract'],
            Web3Helper.formattedAmountToRaw(this.swapOutAmount, CryptoAssets.assets[this.assetName]['Decimals']),
          {from: userAddress}
        )
        console.log(result)

        var txHash = result.transactionHash;

        this.burnTXHash = txhash;

      }else{
        this.networkProviderIdError = "Please switch your Web3 Provider to Matic Mainnet (chain id 137) to call this method."

      }

    },
    async swapin()
    {

        this.networkProviderIdError=null;

      if(this.providerNetworkID == 0x1){


          var Web3 = require('web3');
          var web3provider = new Web3(Web3.givenProvider || 'ws://localhost:8546');
          var userAddress = this.acctAddress;

          var maticClient = MaticHelper.getMaticPOSClient(web3provider,userAddress);



          //console.log('meep',Web3Helper.formattedAmountToRaw(this.swapAmount, CryptoAssets.assets[this.assetName]['Decimals']))

          var rawAmount = Web3Helper.formattedAmountToRaw(this.swapAmount, CryptoAssets.assets[this.assetName]['Decimals']);

            console.log('swapin', userAddress, rawAmount ,  CryptoAssets.assets[this.assetName]['EthereumContract'])

          var result = await maticClient.depositERC20ForUser(
            CryptoAssets.assets[this.assetName]['EthereumContract'],
            userAddress,
            rawAmount,
           {from: userAddress}
          )

          // get burn tx hash
        }else{
          this.networkProviderIdError = "Please switch your Web3 Provider to Ethereum Mainnet to call this method."

        }





    },
    async swapout()   //this is not working ?
    {



      this.networkProviderIdError=null;

      if(this.providerNetworkID == 0x1){

          this.loading = true;

        var Web3 = require('web3');
        var web3provider = new Web3(Web3.givenProvider || 'ws://localhost:8546');
        var userAddress = this.acctAddress;

        var maticClient = MaticHelper.getMaticPOSClient(web3provider,userAddress);

        var result = await maticClient.exitERC20(this.burnTXHash,{
            fastProof: true,
            from: userAddress,
            gasPrice: 500000000000
          })

        this.loading=false;
        console.log(result.transactionHash)


        this.burnTXHash = null;



      }else{
        this.networkProviderIdError = "Please switch your Web3 Provider to Ethereum Mainnet to call this method."

      }
    }

  }
}
</script>

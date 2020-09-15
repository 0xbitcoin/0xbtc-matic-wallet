<template>
<div>

<nav id="header" class="w-full z-10 pin-t">

	<div id="progress" class="h-1 z-20 pin-t" style="background:linear-gradient(to right, #4dc0b5 var(--scroll), transparent 0);"></div>

		<div class="w-full mx-auto flex flex-wrap items-center justify-between mt-0 py-3 bg-white px-4">

			<div class="pl-4">
				<a class="text-black text-base no-underline hover:no-underline font-extrabold text-xl"  href="#">
					0xBTC Matic Wallet
				</a>
      </div>


			<div class="  flex items-center w-auto mt-2 lg:mt-0 bg-grey-lightest md:bg-transparent z-20" id="nav-content">
				<div class="  lg:flex justify-end flex-1 items-center">
					<MetamaskDropdown
            :acctAddress= "activeAccountAddress"
          />
				</div>
			</div>
		</div>
	</nav>



  <div class="flex mb-4">
    <div class="w-1/3 bg-gray-300 overflow-y-scroll ">
      <div class="m-6 p-4 bg-gray-100">


				<TransactionForm
				:acctAddress= "activeAccountAddress"
				:activeNetwork= "network"
				:assetName= "assetName"
				/>

      </div>
    </div>
    <div class="w-2/3 bg-gray-300  ">
      <div class="m-6 p-4 bg-gray-100">

				<ul class="flex m-6">
				  <li class="flex-1 mr-2">
				    <a @click="setNetwork('ethereum')" :class="network=='ethereum' ? 'bg-blue-500  text-white' : 'bg-transparent hover:border-gray-200 hover:bg-gray-200 text-gray-500'" class="text-center block border border-blue-500 rounded py-2 px-4 " href="#">Ethereum Network</a>
				  </li>
				  <li class="flex-1 mr-2">
				    <a @click="setNetwork('matic')" :class="network=='matic' ? 'bg-blue-500  text-white' : 'bg-transparent hover:border-gray-200 hover:bg-gray-200 text-gray-500'" class="text-center block border border-blue-500 rounded py-2 px-4 " href="#">Matic Network</a>
				  </li>
				</ul>

				<h3 class="text-lg font-bold">Your Assets</h3>


				<div class="container mt-8">

					<a href="#" @click="selectAsset('0xBTC')" class="flex width-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ">
						<div class="text-md w-1/2"> 0xBTC </div>
						<div class="text-md w-1/2 text-right"> {{ assetBalances["0xBTC"] }} </div>


					</a>

				</div>

	  </div>
    </div>
  </div>




</div>
</template>


<script>
import MetamaskDropdown from './MetamaskDropdown.vue'
import TransactionForm from './TransactionForm.vue'
import Web3Helper from '../js/web3-helper.js'
import CryptoAssets from '../js/cryptoassets.js'

export default {
  name: 'Home',
  components: {
     MetamaskDropdown,TransactionForm
  },
  data () {
    return {
      activeAccountAddress: null,
			network: 'ethereum',
			assetName: '0xBTC',
			assetBalances: {"0xBTC": 0}
    }
  },
  created () {

    this.checkSignedIn()

    Web3Helper.init();

    this.readWeb3Data();



  },
  methods: {
   async checkSignedIn () {
      if (typeof window.ethereum == 'undefined') {
          this.$router.replace('/login');
          return;
      }

      await window.ethereum

      var connected = await window.ethereum.isConnected()
      console.log("connected? ",connected)
      if(!connected)
      {
         this.$router.replace('/login');
         return;
      }


    },
   async readWeb3Data () {
     var accounts = await Web3Helper.getConnectedAccounts();

     this.activeAccountAddress = accounts[0]

		 this.updateBalances()
   },
	 setNetwork(networkName)
	 {
		 this.network = networkName;
	 },
	 selectAsset(assetName)
	 {
		 this.assetName = assetName;
	 },

	 async updateBalances()
	 {

		 var balanceRaw = await Web3Helper.getTokensBalance(CryptoAssets.assets["0xBTC"]['EthereumContract'], this.activeAccountAddress )
		 console.log(balanceRaw)
		 this.assetBalances["0xBTC"] = balanceRaw / CryptoAssets.assets["0xBTC"]['DecimalMultiplier'];

	 },


  }

}
</script>

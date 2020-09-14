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
        <h3 class="text-lg font-bold">Wallet Balance</h3>

				<div>
				</div>

				<div>
					<button>
						Deposit
					</button>

					<button>
						Withdraw
					</button>
				</div>

      </div>
    </div>
    <div class="w-2/3 bg-gray-300  ">
      <div class="m-6 p-4 bg-gray-100">
				<h3 class="text-lg font-bold">Your Tokens</h3>
				<p class="text-md text-gray-600 tracking-wider uppercase font-bold">Interactive component examples</p>
    </div>
    </div>
  </div>




</div>
</template>


<script>
import MetamaskDropdown from './MetamaskDropdown.vue'
import Web3Helper from '../js/web3-helper.js'

export default {
  name: 'Home',
  components: {
     MetamaskDropdown
  },
  data () {
    return {
      activeAccountAddress: null
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
   }


  }

}
</script>

<template>
  <div class="about">

    <nav id="header" class="w-full z-10 pin-t">

    	<div id="progress" class="h-1 z-20 pin-t" style="background:linear-gradient(to right, #4dc0b5 var(--scroll), transparent 0);"></div>

    		<div class="w-full mx-auto flex flex-wrap items-center justify-between mt-0 py-3 bg-white px-4">

    			<div class="pl-4">
    				<a class="text-black text-base no-underline hover:no-underline font-extrabold text-xl"  href="#">
    					0xBTC Matic Wallet
    				</a>
          </div>



    		</div>
    	</nav>




      <div class="flex mb-4">
        <div class="w-1/3 bg-gray-300 overflow-y-scroll ">
          <div class="m-6 p-4 bg-gray-100">

            <ul>
              <li> <a href="#" @click="setContent('purpose')"> Purpose Statement </a> </li>
              <li> <a href="#" @click="setContent('connecting')"> Connecting with Metamask </a> </li>
          </ul>

          </div>
        </div>
        <div class="w-2/3 bg-gray-300  ">
          <div class="m-6 p-4 bg-gray-100">


            <div v-if="activeContent == 'purpose'">
              <h3 class="text-lg"> 0xBTC Matic Wallet </h3>
              <br>

              <p> The purpose of this applicaton is to provide a simple front-end user experience that allows users to transfer ERC20 tokens from the Ethereum Mainnet blockchain to the Matic blockchain, a 'Layer 2' network with lower transacting fees and higher bandwidth.  These tokens can also be moved back from the Matic chain back to Ethereum. </p>

            </div>

            <div v-if="activeContent == 'connecting'">
              <h3 class="text-lg"> Getting Connected </h3>
              <br>

              <p> To connect to this Dapp, you will need a Web3 compatible browser or extension such as Metamask.    </p>

            </div>



          </div>
        </div>
      </div>



  </div>
</template>


<script>

export default {
  name: 'Docs',
  props: [],
  data() {
    return {
      activeContent: 'purpose'
    }
  },
  methods: {

    setContent (contentName) {
      console.log('set content', contentName)
      this.activeContent = contentName;
    }
  }
}
</script>

<template>
<div>

<nav id="header" class="w-full z-10 pin-t">

	<div id="progress" class="h-1 z-20 pin-t" style="background:linear-gradient(to right, #4dc0b5 var(--scroll), transparent 0);"></div>

		<div class="w-full mx-auto flex flex-wrap items-center justify-between mt-0 py-3 bg-white">

			<div class="pl-4">
				<a class="text-black text-base no-underline hover:no-underline font-extrabold text-xl"  href="#">
					0xBTC Matic Wallet
				</a>
            </div>





			<div class="  flex items-center w-auto mt-2 lg:mt-0 bg-grey-lightest md:bg-transparent z-20" id="nav-content">
				<div class="  lg:flex justify-end flex-1 items-center">
					<MetamaskDropdown />
				</div>
			</div>
		</div>
	</nav>


  <div class="flex justify-center items-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold">Vue + Tailwind</h1>
      <p class="text-xl text-gray-600 tracking-wider uppercase font-bold">Interactive component examples</p>
    </div>
  </div>
</div>
</template>


<script>
import MetamaskDropdown from './MetamaskDropdown.vue'

export default {
  name: 'Home',
  components: {
     MetamaskDropdown
  },
  data() {
    return {
      open: false
    }
  },
}
</script>

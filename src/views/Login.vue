<template>
  <div class="flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-md px-6 py-6">
      <h2 class="font-semibold text-gray-900 text-2xl leading-tight border-b-2 border-gray-200 pb-4">Connect to Web3</h2>
      <p class="mt-4 text-gray-700">Please select a Web3 Provider below to continue.</p>
      <div class="mt-6">
        <button @click="open = true" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          <img src="@/assets/img/metamask.svg" class="inline mr-4"/>  Continue with Metamask
        </button>

        <Modal :open="open" @close="open = false">
          <div class="max-w-lg w-full bg-white rounded-lg shadow-2xl px-6 py-6">
            <h2 class="font-semibold text-gray-900 text-2xl leading-tight border-b-2 border-gray-200 pb-4">Delete account</h2>
            <p class="mt-4 text-gray-700">Are you absolutely sure you want to cancel your subscription and delete your account? This action cannot be undone.</p>
            <div class="mt-6">
              <button type="button" @click="open = false" class="px-4 py-2 text-white font-semibold bg-red-500 hover:bg-red-600 border border-transparent rounded focus:outline-none focus:shadow-outline">
                Delete my account
              </button>
              <button @click="open = false" class="ml-4 px-4 py-2 text-gray-800 font-semibold bg-white hover:bg-gray-100 border rounded focus:outline-none focus:shadow-outline">
                Cancel
              </button>
            </div>
          </div>
        </Modal>

      </div>
    </div>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'

export default {
  components: {
    Modal
  },
  data() {
    return {
      open: false
    }
  },
}
</script>

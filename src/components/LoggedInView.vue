<script setup>
import { ref } from 'vue'
import axios from 'axios'
import QrcodeVue from 'qrcode.vue'

const first_name = ref('')
const last_name = ref('')

const isMFA = ref(false)
const codeMFA = ref('')
const mfa = ref(false)
const qr = ref('')

const getUserData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/sec/api/user/', {
      withCredentials: true,
    })
    console.log(response.data)
    first_name.value = response.data.first_name
    last_name.value = response.data.last_name
    isMFA.value = response.data.isMFAEnabled
  } catch (error) {
    console.error(error)
  }
}

const activateMFA = async () => {
  try {
    const response = await axios.post(
      'http://localhost:8000/sec/api/mfa/activate/',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': document.cookie.match(/csrftoken=([^\s]*)/)[1],
        },
        withCredentials: true,
      },
    )
    console.log(response.data)
    if (response.status === 200) {
      mfa.value = true
      qr.value = response.data.qr_uri
    }
  } catch (error) {
    console.error(error)
  }
}

const verifyMFA = async () => {
  try {
    const response = await axios.post(
      'http://localhost:8000/sec/api/mfa/activate/check/',
      {
        mfa_code: codeMFA.value,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': document.cookie.match(/csrftoken=([^\s]*)/)[1],
        },
        withCredentials: true,
      },
    )
    console.log(response.data)
    if (response.status === 200) {
      mfa.value = false
    }
  } catch (error) {
    console.error(error)
  }
}
getUserData()
</script>

<template>
  <h1>Welcome, you're logged in. Yey!!!</h1>
  <!-- Mostrar nombre completo del usuario logueado -->
  <h2>Full name: {{ first_name }} {{ last_name }}</h2>
  <button
    v-if="!isMFA"
    @click="activateMFA"
    class="bg-blue-200 w-1/3 my-5 mx-60 hover:cursor-pointer rounded-2xl border-2"
  >
    Activate MFA authenticator
  </button>
  <button
    v-else
    @click="activateMFA"
    class="bg-red-200 w-1/3 my-5 mx-60 hover:cursor-pointer rounded-2xl border-2"
  >
    Update MFA authenticator
  </button>
  <div v-if="mfa" class="border-2 w-1/2 my-25 mx-90 px-5 py-5">
    <qrcode-vue :value="qr" :size="200" />
    <h2>Enter your code from your authenticator:</h2>
    <form class="mt-5" @submit.prevent="verifyMFA">
      <div class="relative">
        <input
          class="peer placeholder-transparent h-10 w-full border-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-300"
          autocomplete="off"
          type="text"
          id="user-code"
          name="user-code"
          placeholder="Your secret code"
          v-model="codeMFA"
        />
        <button
          type="submit"
          class="bg-blue-200 w-1/3 my-5 mx-60 hover:cursor-pointer rounded-2xl border-2"
        >
          Verify
        </button>
      </div>
    </form>
  </div>
</template>

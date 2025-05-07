<script setup>
import { ref } from 'vue'
import EventBus from '@/EventBus'
import axios from 'axios'
import { BACKEND_URL } from '@/handy'

const email = ref('')
const emit = defineEmits(['state'])
const recoveryPass = async () => {
  console.log(email.value)
  try {
    const response = await axios.post(
      BACKEND_URL + '/sec/api/recovery/',
      {
        email: email.value,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    console.log(response.data)
    if (response.status === 200) {
      EventBus.emit('recovery', email.value)
      emit('state', 'sent')
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="border-2 w-1/2 my-25 mx-90 px-5 py-5">
    <h2>Enter your email for password recovery:</h2>
    <form class="mt-5" @submit.prevent="recoveryPass">
      <div class="relative">
        <input
          class="peer placeholder-transparent h-10 w-full border-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-300"
          autocomplete="off"
          type="email"
          id="user-email"
          name="user-email"
          placeholder="Your email"
          v-model="email"
        />

        <label
          class="absolute left-0 -top-5.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5.5 peer-focus:text-gray-600 peer-focus:text-sm"
          for="user-email"
          >Recovery email</label
        >
      </div>
      <button
        type="submit"
        class="bg-blue-200 w-1/3 my-5 mx-60 hover:cursor-pointer rounded-2xl border-2"
      >
        Send
      </button>
    </form>
  </div>
</template>

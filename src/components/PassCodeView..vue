<script setup>
import EventBus from '@/EventBus'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { BACKEND_URL } from '@/handy'

const code = ref('')
const email = ref('')

const emit = defineEmits(['state'])

onMounted(() => {
  EventBus.on('recovery', (mail) => {
    email.value = mail
  })
})

const submitCode = async () => {
  console.log(code.value)
  try {
    const response = await axios.post(
      BACKEND_URL + '/sec/api/recovery/check/',
      {
        email: email.value,
        code: code.value,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    console.log(response.data)
    if (response.status === 200) {
      emit('state', {
        codeReceived: 'received',
        email: email.value,
      })
    }
  } catch (error) {
    console.error(error)
  }
}

//const recoveryPass = () => {
// console.log(email.value)
//}
</script>

<template>
  <div class="border-2 w-1/2 my-25 mx-90 px-5 py-5">
    <h2>Enter the code sent to your email:</h2>
    <form class="mt-5" @submit.prevent="submitCode">
      <div class="relative">
        <input
          class="peer placeholder-transparent h-10 w-full border-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-300"
          autocomplete="off"
          type="text"
          id="user-code"
          name="user-code"
          placeholder="Your secret code"
          v-model="code"
        />

        <label
          class="absolute left-0 -top-5.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5.5 peer-focus:text-gray-600 peer-focus:text-sm"
          for="user-code"
          >Recovery code</label
        >
      </div>
      <button
        type="submit"
        class="bg-blue-200 w-1/3 my-5 mx-60 hover:cursor-pointer rounded-2xl border-2"
      >
        Continue
      </button>
      <button
        type="button"
        class="bg-blue-900 from-stone-50 w-1/3 my-5 mx-60 hover:cursor-pointer rounded-2xl border-2"
        @click="emit('state', 'start')"
      >
        Wrong email? Go back
      </button>
    </form>
  </div>
</template>

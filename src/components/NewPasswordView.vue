<script setup>
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'

const props = defineProps({
  email: String,
})

const password = ref('')
const confirmPass = ref('')

//send both passwords to backend for back verification
//const savePass = (password, confirmPass) => {
//}
const newPass = async () => {
  if (password.value === confirmPass.value && password.value != '' && props.email != 'none') {
    console.log('correito: ', props.email)
    try {
      const response = await axios.post(
        'http://localhost:8000/sec/api/recovery/reset/',
        {
          email: props.email,
          password: password.value,
          password2: confirmPass.value,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      console.log(response.data)
      if (response.status === 200) {
        router.push({ name: 'home' })
      }
    } catch (error) {
      console.error(error)
    }
    //savePass(password.value, confirmPass.value)
  } else {
    console.log('Passwords do not match')
  }
}
</script>

<template>
  <div class="border-2 w-1/2 my-25 mx-90 px-5 py-5">
    <h2>Enter your new password:</h2>
    <form class="mt-5" @submit.prevent="newPass">
      <div class="relative">
        <input
          class="peer placeholder-transparent h-10 w-full border-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-300"
          autocomplete="off"
          type="password"
          id="user-pass"
          name="user-pass"
          placeholder="Your new password"
          v-model="password"
        />

        <label
          class="absolute left-0 -top-5.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5.5 peer-focus:text-gray-600 peer-focus:text-sm"
          for="user-pass"
          >New password</label
        >
      </div>
      <div class="relative mt-7">
        <input
          class="peer placeholder-transparent h-10 w-full border-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-300"
          autocomplete="off"
          type="password"
          id="user-repass"
          name="user-repass"
          placeholder="Repeat your new password"
          v-model="confirmPass"
        />

        <label
          class="absolute left-0 -top-5.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5.5 peer-focus:text-gray-600 peer-focus:text-sm"
          for="user-repass"
          >Write your password again</label
        >
      </div>
      <button
        type="submit"
        class="bg-blue-200 w-1/3 my-5 mx-60 hover:cursor-pointer rounded-2xl border-2"
      >
        Save
      </button>
    </form>
  </div>
</template>

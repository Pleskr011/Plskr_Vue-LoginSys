<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import EventBus from '@/EventBus'
import axios from 'axios'

const email = ref('')
const password = ref('')

const emit = defineEmits(['login'])

const loginUser = async () => {
  console.log(email.value, password.value)
  //send data to backend
  try {
    const response = await axios.post(
      'http://localhost:8000/sec/api/auth/',
      {
        email: email.value,
        password: password.value,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    console.log(response.data)
    if (response.status === 200) {
      EventBus.emit('login', email.value)
      if (response.data.mfa) {
        EventBus.emit('mfa', response.data.mfa)
      }
      emit('login', true)
    }
  } catch (error) {
    console.error(error)
  }
}
</script>
<template>
  <div>
    <div
      class="w-1/2 py-40 sm:max-w-xl ml-5 after:absolute after:w-0.5 after:top-1/6 after:left-1/2 after:bg-black after:h-1/2"
    >
      <form class="px-4 py-8 bg-white ring sm:max-w-xl sm:mx-auto" @submit.prevent="loginUser">
        <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
          <div class="relative">
            <input
              class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
              autocomplete="off"
              type="email"
              id="user-email"
              name="user-email"
              placeholder="example@mail.com"
              v-model="email"
            />

            <label
              class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              for="user-email"
              >Email</label
            >
          </div>
          <div class="relative">
            <input
              class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
              type="password"
              id="user-pass"
              name="user-pass"
              placeholder="*********"
              v-model="password"
            />
            <label
              class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              for="user-pass"
              >Password</label
            >
          </div>
          <div class="relative left-50 top-4">
            <button
              class="bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-violet-600 hover:cursor-pointer"
              type="submit"
            >
              Sign in
            </button>
          </div>
        </div>
      </form>

      <RouterLink class="underline hover:cursor-pointer" to="/recovery"
        >I forgot my password</RouterLink
      >
      <RouterLink class="px-6 py-3 underline hover:cursor-pointer" to="/register"
        >I don't have an account</RouterLink
      >
    </div>

    <div class="w-1/2 sm:max-w-xl ml-5 col-span-2 absolute top-60 right-10">
      <img
        class="w-20 float-right m-3"
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F007%2F397%2F629%2Flarge_2x%2Fcyber-security-icon-security-symbol-artificial-intelligence-keyhole-icon-free-vector.jpg&f=1&nofb=1&ipt=e7e059d284461317d17c81c62a5510f7102b45b7cfcf199ab317c1121cf1ba42&ipo=images"
      />
      <p class="font-serif text-right">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt minima voluptatibus
        quasi! Saepe velit minima eos vero, eveniet, commodi cumque voluptate vel modi adipisci et
        unde impedit omnis tenetur nihil?
      </p>
    </div>
  </div>
</template>

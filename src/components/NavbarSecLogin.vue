<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { isLogged } from '@/handy'
import axios from 'axios'
import router from '@/router'
import EventBus from '@/EventBus'

const isAuth = ref(false)

onMounted(() => {
  EventBus.on('auth', (auth) => {
    isAuth.value = auth
  })
})

isLogged().then((response) => {
  isAuth.value = response
})

const logout = async () => {
  try {
    const response = await axios.post(
      'http://localhost:8000/sec/api/logout/',
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
      router.push({ name: 'home' })
      isAuth.value = false
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <nav class="relative select-none bg-blue-700 lg:flex lg:items-stretch w-full">
    <div class="flex flex-no-shrink items-stretch h-15">
      <RouterLink
        to="/"
        class="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white no-underline font-bold text-xl flex items-center hover:bg-blue-900"
        >SecLogin</RouterLink
      >
      <button class="block lg:hidden cursor-pointer ml-auto relative w-12 h-12 p-4">
        <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
        <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path
            d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
          />
        </svg>
      </button>
    </div>
    <div class="lg:flex lg:items-stretch lg:flex-no-shrink lg:flex-grow">
      <div class="lg:flex lg:items-stretch lg:justify-end ml-auto">
        <a
          href="#"
          class="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white text-lg no-underline flex items-center hover:bg-blue-900"
          >Projects</a
        >
        <a
          href="#"
          class="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white text-lg no-underline flex items-center hover:bg-blue-900"
          >About Us</a
        >
        <a
          href="#"
          class="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white text-lg no-underline flex items-center hover:bg-blue-900"
          >Github</a
        >
        <a
          v-if="isAuth"
          @click="logout()"
          href="#"
          class="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white text-lg no-underline flex items-center hover:bg-blue-900"
          >Logout</a
        >
      </div>
    </div>
  </nav>
</template>

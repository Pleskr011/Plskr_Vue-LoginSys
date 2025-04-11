<script setup>
import { ref } from 'vue'
import LoggedInView from '@/components/LoggedInView.vue'
import axios from 'axios'

const isAuth = ref(false)

const isLogged = async () => {
  try {
    const response = await axios.get('http://localhost:8000/sec/api/auth/check/', {
      withCredentials: true,
    })
    console.log(response.data)
    if (response.status === 200) {
      isAuth.value = true
    } else {
      isAuth.value = false
    }
  } catch (error) {
    console.error(error)
  }
}

isLogged()
</script>

<template>
  <div>
    <LoggedInView v-if="isAuth" />
    <div v-else>
      <h1>Not logged in. You fool.</h1>
    </div>
  </div>
</template>

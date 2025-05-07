<script setup>
import { ref } from 'vue'
import LoggedInView from '@/components/LoggedInView.vue'
/* import axios from 'axios' */
import { isLogged } from '@/handy'
/* const backendUrl = window.location.origin */

const isAuth = ref(false)

/* const isLogged = async () => {
  try {
    const response = await axios.get(backendUrl + '/sec/api/auth/check/', {
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
} */

isLogged().then((response) => {
  isAuth.value = response
})
console.log('Is authenticated?: ', isAuth.value)
</script>

<template>
  <div>
    <LoggedInView v-if="isAuth" />
    <div v-else>
      <h1>Not logged in. Go back.</h1>
    </div>
  </div>
</template>

<script setup>
import LoginView from '@/components/LoginWelcomeView.vue'
import MfaView from '@/components/MfaView.vue'
import { ref } from 'vue'

const isLoginValid = ref(false)
</script>

<template>
  <div>
    <LoginView @login="(loginStatus) => (isLoginValid = loginStatus)" v-show="!isLoginValid" />
    <MfaView v-show="isLoginValid" />
  </div>
</template>

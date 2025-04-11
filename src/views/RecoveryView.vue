<script setup>
import { ref } from 'vue'

import PasswordRecoveryView from '@/components/PasswordRecoveryView.vue'
import NewPasswordView from '@/components/NewPasswordView.vue'
import PassCodeView from '@/components/PassCodeView..vue'

const codeReceived = ref('start')
const recoveryEmail = ref('none')
</script>

<template>
  <NewPasswordView v-if="codeReceived === 'received'" :email="recoveryEmail" />
  <!--Acceder a esta vistadespues de autenticar con la clave anteriormente ingresada para mayor seguridad-->
  <PassCodeView
    v-show="codeReceived === 'sent'"
    @state="(status) => ((codeReceived = status.codeReceived), (recoveryEmail = status.email))"
  />
  <PasswordRecoveryView
    v-show="codeReceived === 'start'"
    @state="(status) => (codeReceived = status)"
  />
</template>

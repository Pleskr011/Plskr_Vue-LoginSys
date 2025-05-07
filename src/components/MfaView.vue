<script setup>
import { ref, onMounted } from 'vue'
import EventBus from '@/EventBus'
import axios from 'axios'
import router from '@/router'
import { BACKEND_URL } from '@/handy'

const emit = defineEmits(['login'])
const codeMFA = ref(['', '', '', '', '', ''])

const mail = ref('nada')
const mfa = ref(false)

onMounted(() => {
  EventBus.on('login', (email) => {
    mail.value = email
  })
})

onMounted(() => {
  EventBus.on('mfa', (value) => {
    mfa.value = value
  })
})

function inputFocus(event) {
  const inputIndex = parseInt(event.target.id.slice(-1)) - 1

  if (event.key === 'Backspace') {
    codeMFA.value[inputIndex] = ''
    event.preventDefault()
    if (inputIndex !== 0) {
      document.getElementById(`input${inputIndex}`).focus()
    }
  } else {
    if (event.keyCode > 47 && event.keyCode < 58) {
      codeMFA.value[inputIndex] = event.key
      if (inputIndex !== 5) {
        document.getElementById(`input${inputIndex + 2}`).focus()
      }
      event.preventDefault()
    } else {
      event.preventDefault()
    }
  }
}

const verifyMFA = async () => {
  console.log(codeMFA.value)
  try {
    const response = await axios.post(
      BACKEND_URL + '/sec/api/login/',
      {
        mfa_code: codeMFA.value.join(''),
        email: mail.value,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    )
    console.log(response.data)
    if (response.status === 200) {
      // route to new view
      EventBus.emit('auth', true)
      router.push({ name: 'start' })
      emit('login', false)
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="border-2 w-1/2 my-25 mx-90 px-5 py-5">
    <h2 v-if="mfa">Enter your code from your authenticator:</h2>
    <h2 v-else>Enter your authorization code:</h2>
    <div class="mb-2 py-4 text-center">
      <div id="otp" class="flex justify-center">
        <input
          class="m-2 bg-gray-100 text-center form-control form-control-solid rounded size-16 border-2 focus:border-blue-400 focus:shadow-outline"
          type="text"
          id="input1"
          maxlength="1"
          v-model="codeMFA[0]"
          @keydown="inputFocus"
        />
        <input
          class="m-2 bg-gray-100 text-center form-control form-control-solid rounded size-16 border-2 focus:border-blue-400 focus:shadow-outline"
          type="text"
          id="input2"
          maxlength="1"
          v-model="codeMFA[1]"
          @keydown="inputFocus"
        />
        <input
          class="m-2 bg-gray-100 text-center form-control form-control-solid rounded size-16 border-2 focus:border-blue-400 focus:shadow-outline"
          type="text"
          id="input3"
          maxlength="1"
          v-model="codeMFA[2]"
          @keydown="inputFocus"
        />
        <input
          class="m-2 ml-10 bg-gray-100 text-center form-control form-control-solid rounded size-16 border-2 focus:border-blue-400 focus:shadow-outline"
          type="text"
          id="input4"
          maxlength="1"
          v-model="codeMFA[3]"
          @keydown="inputFocus"
        />
        <input
          class="m-2 bg-gray-100 text-center form-control form-control-solid rounded size-16 border-2 focus:border-blue-400 focus:shadow-outline"
          type="text"
          id="input5"
          maxlength="1"
          v-model="codeMFA[4]"
          @keydown="inputFocus"
        />
        <input
          class="m-2 bg-gray-100 text-center form-control form-control-solid rounded size-16 border-2 focus:border-blue-400 focus:shadow-outline"
          type="text"
          id="input6"
          maxlength="1"
          v-model="codeMFA[5]"
          @keydown="inputFocus"
        />
      </div>
      <button
        @click="verifyMFA"
        type="submit"
        class="bg-blue-200 w-1/3 my-5 mx-60 hover:cursor-pointer rounded-2xl border-2"
      >
        Confirm
      </button>
      <p class="flex justify-center">{{ mail }}</p>
    </div>
  </div>
</template>

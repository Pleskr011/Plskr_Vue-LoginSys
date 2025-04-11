<script setup>
import Navbar from '@/components/NavbarSecLogin.vue'
import Footbar from '@/components/FootbarLogin.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <Navbar />
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition || 'fade'" mode="out-in">
      <div :key="route.name">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
  <Footbar />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

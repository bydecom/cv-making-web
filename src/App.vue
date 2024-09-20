<template>
  <div class="flex flex-col min-h-screen">
    <HeaderView />
    <main class="flex-grow">
      <router-view></router-view>
    </main>
    <FooterView />
  </div>
</template>

<script setup>
import HeaderView from '@/views/HeaderView.vue'
import FooterView from '@/views/FooterView.vue'
</script>

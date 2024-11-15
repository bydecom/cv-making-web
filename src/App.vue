<template>
  <div class="flex flex-col min-h-screen">
    <HeaderView />
    <main class="flex-grow">
      <router-view></router-view>
    </main>
    <FooterView />
    <TutorialPopup />
  </div>
</template>

<script setup>
import HeaderView from '@/views/HeaderView.vue'
import FooterView from '@/views/FooterView.vue'
import TutorialPopup from '@/components/TutorialPopup.vue'
</script>

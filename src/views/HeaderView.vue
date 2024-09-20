<template>
  <header class="bg-blue-500 text-white p-4">
    <nav class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-2xl font-bold">My App</router-link>
      <ul class="flex space-x-4">
        <li><router-link to="/" class="hover:underline">Home</router-link></li>
        <li><router-link to="/example" class="hover:underline">Example</router-link></li>
        <li><router-link to="/reader" class="hover:underline">Reader</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
// Nếu cần thêm logic, bạn có thể thêm vào đây
</script>

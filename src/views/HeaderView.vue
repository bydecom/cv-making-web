<template>
  <div
    :class="[
      'fixed w-full z-50 transition-transform duration-300',
      { '-translate-y-full': !isHeaderVisible }
    ]"
  >
    <header class="bg-white shadow-sm">
      <nav class="container mx-auto px-4 py-6">
        <div class="flex justify-between items-center">
          <router-link to="/" class="flex items-center">
            <img src="@/assets/icons/easy-builder.png" alt="Logo" class="h-8 w-auto mr-2" />
            <span class="text-xl font-semibold text-gray-800">bestcv.io</span>
          </router-link>
          <nav class="hidden lg:flex items-center space-x-6">
            <a class="flex items-center hover:text-gray-800" href="/templates">
              Resume
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 20 20"
                width="20"
                class="ml-1"
              >
                <path
                  clip-rule="evenodd"
                  d="m10.2 10.4 2.9-2.8 1.4 1.4-4.3 4.2-4.2-4.2 1.4-1.4z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </a>
            <a class="flex items-center hover:text-gray-800" href="/cover-letter-templates">
              Cover Letter
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 20 20"
                width="20"
                class="ml-1"
              >
                <path
                  clip-rule="evenodd"
                  d="m10.2 10.4 2.9-2.8 1.4 1.4-4.3 4.2-4.2-4.2 1.4-1.4z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </a>
            <a class="hover:text-gray-800" href="/example">Example</a>
            <a class="hover:text-gray-800" href="#" target="_blank" rel="noopener noreferrer"
              >FAQ</a
            >
            <div class="w-px h-6 bg-gray-300 mx-2"></div>
            <div>
              <a
                class="bg-white text-blue-500 font-semibold px-6 py-2 rounded-md border border-blue-500 hover:bg-blue-50 transition duration-300"
                href="/app"
              >
                My Account
              </a>
            </div>
          </nav>
          <div class="lg:hidden">
            <button
              @click="toggleMenu"
              class="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  v-if="!isMenuOpen"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-if="isMenuOpen" class="lg:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/templates" class="block text-gray-600 hover:text-gray-800 py-2">Resume</a>
            <a href="/cover-letter-templates" class="block text-gray-600 hover:text-gray-800 py-2"
              >Cover Letter</a
            >
            <a href="/example" class="block text-gray-600 hover:text-gray-800 py-2">Example</a>
            <a href="https://help.resume.io" class="block text-gray-600 hover:text-gray-800 py-2"
              >FAQ</a
            >
            <a
              href="/app"
              class="block bg-white text-blue-500 font-semibold px-4 py-2 rounded-md border border-blue-500 hover:bg-blue-50 transition duration-300 mt-2"
            >
              My Account
            </a>
          </div>
        </div>
      </transition>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)
const isHeaderVisible = ref(true)
let lastScrollPosition = 0

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleScroll = () => {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
  if (currentScrollPosition < lastScrollPosition) {
    isHeaderVisible.value = true
  } else {
    isHeaderVisible.value = false
  }
  lastScrollPosition = currentScrollPosition
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
<style scoped>
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.z-50 {
  z-index: 50;
}

.transition-transform {
  transition-property: transform;
}

.duration-300 {
  transition-duration: 100ms;
}

.-translate-y-full {
  transform: translateY(-100%);
}
</style>

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
            <router-link to="/templates" class="flex items-center hover:text-gray-800">
              Resume
            </router-link>
            <router-link to="/emaileditor" class="flex items-center hover:text-gray-800">
              Cover Letter
            </router-link>
            <router-link to="/convert" class="hover:text-gray-800">Convert CV</router-link>
            <a class="hover:text-gray-800" href="#" target="_blank" rel="noopener noreferrer">
              CV Review
            </a>
            <div class="w-px h-6 bg-gray-300 mx-2"></div>
            <router-link
              to="/about"
              class="bg-blue-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              About Us
            </router-link>
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
            <router-link to="/templates" class="block text-gray-600 hover:text-gray-800 py-2">
              Resume
            </router-link>
            <router-link to="/emaileditor" class="block text-gray-600 hover:text-gray-800 py-2">
              Cover Letter
            </router-link>
            <router-link to="/convert" class="block text-gray-600 hover:text-gray-800 py-2">
              Convert CV
            </router-link>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              class="block text-gray-600 hover:text-gray-800 py-2"
            >
              CV Review
            </a>
            <router-link
              to="/about"
              class="block bg-white text-blue-500 font-semibold px-4 py-2 rounded-md border border-blue-500 hover:bg-blue-50 transition duration-300 mt-2"
            >
              About Us
            </router-link>
          </div>
        </div>
      </transition>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const isMenuOpen = ref(false)
const isHeaderVisible = ref(true)
const showUserMenu = ref(false)
let lastScrollPosition = 0

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const handleLogout = async () => {
  authStore.logout()
  showUserMenu.value = false
  router.push('/login')
}

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

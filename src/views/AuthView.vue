<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {{ isLogin ? 'Sign in to your account' : 'Create an account' }}
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="isLogin ? handleLogin() : handleSignUp()">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <div class="mt-1">
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1">
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ isLogin ? 'Sign In' : 'Sign Up' }}
            </button>
          </div>
        </form>

        <div class="mt-6">
          <p class="text-center text-sm text-gray-600">
            <span v-if="isLogin">Don't have an account? </span>
            <span v-else>Already have an account? </span>
            <button @click="toggleAuthMode" class="font-medium text-blue-600 hover:text-blue-500">
              {{ isLogin ? 'Sign Up' : 'Sign In' }}
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()
const email = ref('')
const password = ref('')
const isLogin = ref(true) // Biến để xác định chế độ đăng nhập hay đăng ký

const handleLogin = async () => {
  const auth = getAuth()
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push({ name: 'Home' }) // Chuyển hướng đến trang chính sau khi đăng nhập thành công
  } catch (error) {
    console.error('Error during login:', error)
    alert(error.message) // Hiển thị thông báo lỗi
  }
}

const handleSignUp = async () => {
  const auth = getAuth()
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    router.push({ name: 'Home' }) // Chuyển hướng đến trang chính sau khi đăng ký thành công
  } catch (error) {
    console.error('Error during sign up:', error)
    alert(error.message) // Hiển thị thông báo lỗi
  }
}

const toggleAuthMode = () => {
  isLogin.value = !isLogin.value // Chuyển đổi giữa chế độ đăng nhập và đăng ký
}
</script>

<style scoped>
/* Thêm các style tùy chỉnh nếu cần */
</style>

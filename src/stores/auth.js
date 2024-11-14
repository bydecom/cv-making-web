import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem('token') || null
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated && state.token !== null
  },

  actions: {
    async login(email, password) {
      try {
        // Here you would make an API call to your backend
        // For demo purposes:
        if (email === 'demo@example.com' && password === 'password') {
          const token = 'demo-token'
          this.token = token
          this.isAuthenticated = true
          this.user = { email, name: 'Demo User' }
          localStorage.setItem('token', token)
          return true
        }
        throw new Error('Invalid credentials')
      } catch (error) {
        this.logout()
        throw error
      }
    },

    logout() {
      this.token = null
      this.isAuthenticated = false
      this.user = null
      localStorage.removeItem('token')
    },

    checkAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        this.isAuthenticated = true
        return true
      }
      return false
    }
  }
})

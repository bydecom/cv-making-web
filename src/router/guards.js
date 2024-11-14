import { useAuthStore } from '@/stores/auth'

export function requireAuth(to, from, next) {
  const authStore = useAuthStore()

  if (!authStore.isLoggedIn) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export function redirectIfAuthenticated(to, from, next) {
  const authStore = useAuthStore()

  if (authStore.isLoggedIn) {
    next('/')
  } else {
    next()
  }
}

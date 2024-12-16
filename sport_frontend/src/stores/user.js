// src/stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.user,
    getUserInfo: (state) => state.user,
    getAuthStatus: (state) => state.isAuthenticated
  },
  
  actions: {
    setUser(user) {
      this.user = user
      this.isAuthenticated = true
    },
    
    resetUser() {
      this.user = null
      this.isAuthenticated = false
    }
  }
})
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
      // 確保狀態更新後觸發事件
      window.dispatchEvent(new Event('user-login-state-changed'));
    },
    
    resetUser() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.dispatchEvent(new Event('user-login-state-changed'));
    }
  }
})
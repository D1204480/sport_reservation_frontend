<template>
  <nav class="navbar">
    <a href="#" class="brand">
      <div class="brand-title">運動中心</div>
      <div class="brand-subtitle">Sports Center</div>
    </a>
    <div class="auth-buttons">
      <a href="#" class="register-btn">註冊</a>
      <a href="#" class="login-btn">登入</a>
    </div>
    <button 
      class="hamburger" 
      :class="{ active: isMenuOpen }"
      @click="toggleMenu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div 
      class="mobile-menu"
      :class="{ active: isMenuOpen }"
    >
      <a href="#" class="register-btn">註冊</a>
      <a href="#" class="login-btn">登入</a>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0.5rem;
  background-color: rgb(249, 249, 249);
  position: relative;
}

.brand {
  text-decoration: none;
  color: black;
}

.brand-title {
  font-size: 1.5rem;
  margin-bottom: 0.2rem;
}

.brand-subtitle {
  font-size: 1rem;
  color: #666;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.register-btn {
  text-decoration: none;
  color: #333;
  font-size: 1.2rem;
}


.login-btn {
  background-color: #FF7452;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 1.2rem;
}

.login-btn:hover {
  background-color: #FF6242;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  border: none;
  background: none;
  padding: 5px;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background-color: #333;
  transition: transform 0.3s ease;
}

.mobile-menu {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 200px;
  padding: 1rem;
}

.mobile-menu.active {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

@media (max-width: 425px) {
  .auth-buttons {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .mobile-menu .register-btn,
  .mobile-menu .login-btn {
    display: block;
    text-align: center;
  }

  .mobile-menu .login-btn {
    margin-top: 0.5rem;
  }
}
</style>
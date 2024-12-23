<template>
  <nav class="navbar">
    <a href="#" class="brand">
      <div class="brand-title">運動中心</div>
      <div class="brand-subtitle">Sports Center</div>
    </a>

    <!-- 會員登入頭像和下拉選單 -->
    <div v-if="userStore.isLoggedIn" class="d-flex align-items-center" style="margin-right: 15px;">
      <div class="dropdown">
        <a class="d-flex align-items-center text-gray text-decoration-none dropdown-toggle" id="userDropdown"
          data-bs-toggle="dropdown" aria-expanded="false">
          <img :src="userStore.user?.avatar || 'https://picsum.photos/id/684/600/400'" alt="user-avatar" width="40"
            height="40" class="rounded-circle border" style="border-width: 8px; ">

          <h5 style="margin-left: 10px; color: #4A4A4A;">{{ userStore.user?.name || userStore.user?.username || "Hi,
            Welcome"}}</h5>
        </a>


        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
          <li>
            <RouterLink to="/userInfo" class="dropdown-item" href="#">會員資訊</RouterLink>
          </li>
          <li>
            <RouterLink to="/userOrder" class="dropdown-item" href="#">租借紀錄</RouterLink>
          </li>
          <li>
            <hr class="dropdown-divider">
          </li>
          <li><a class="dropdown-item" href="#" @click="handleLogout">登出</a></li>
        </ul>
      </div>
    </div>

    <div class="auth-buttons">
      <RouterLink to="/register" href="#" class="register-btn">註冊</RouterLink>
      <!-- <a href="#" class="">登入</a> -->
      <button type="button" class="btn login-btn me-2" data-bs-toggle="modal" data-bs-target="#loginModal">
        登入
      </button>
    </div>
    <button class="hamburger" :class="{ active: isMenuOpen }" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="mobile-menu" :class="{ active: isMenuOpen }">
      <RouterLink to="/register" class="register-btn">註冊</RouterLink>
      <a href="#" class="login-btn">登入</a>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router'

const isMenuOpen = ref(false);
const router = useRouter()

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
  font-size: 1rem;
}


.login-btn {
  background-color: #FF7452;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 1rem;
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
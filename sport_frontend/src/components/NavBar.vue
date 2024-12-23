<!-- <template>
  <nav class="navbar">
    <a href="#" class="brand">
      <div class="brand-title">運動中心</div>
      <div class="brand-subtitle">Sports Center</div>
    </a>

    
    <div class="auth-buttons">
      <RouterLink to="/register" href="#" class="register-btn">註冊</RouterLink>
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
</template> -->
<template>
  <nav class="navbar">
    <a href="#" class="brand">
      <div class="brand-title">運動中心</div>
      <div class="brand-subtitle">Sports Center</div>
    </a>

    <div class="auth-buttons">
      <!-- 未登入時顯示 -->
      <template v-if="!isLoggedIn">
        <RouterLink to="/register" class="register-btn">註冊</RouterLink>
        <button type="button" class="btn login-btn me-2" data-bs-toggle="modal" data-bs-target="#loginModal">
          登入
        </button>
      </template>

      <!-- 登入後顯示會員資訊和下拉選單 -->
      <div v-else class="user-profile" @click="toggleDropdown">
        <div class="user-info">
          <img :src="userAvatar" alt="user avatar" width="40" height="40" class="avatar rounded-circle border"
            style="border-width: 8px; ">
          <span class="user-name">{{ userName }}</span>
        </div>
        <div class="dropdown-menu" :class="{ show: isDropdownOpen }">
          <RouterLink to="/userInfo" class="dropdown-item">會員資訊</RouterLink>
          <RouterLink to="/userOrder" class="dropdown-item">租借紀錄</RouterLink>
          <hr class="dropdown-divider">
          <a class="dropdown-item" href="#" @click="handleLogout">登出</a>
        </div>
      </div>
    </div>

    <!-- 漢堡選單 -->
    <button class="hamburger" :class="{ active: isMenuOpen }" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="mobile-menu" :class="{ active: isMenuOpen }">
      <template v-if="!isLoggedIn">
        <RouterLink to="/register" class="register-btn">註冊</RouterLink>
        <a href="#" class="login-btn">登入</a>
      </template>
      <template v-else>
        <div class="mobile-user-info">{{ userName }}</div>
        <RouterLink to="/userInfo" class="menu-item">會員資訊</RouterLink>
        <RouterLink to="/userOrder" class="menu-item">租借紀錄</RouterLink>
        <a href="#" class="menu-item" @click="handleLogout">登出</a>
      </template>
    </div>
  </nav>
</template>

<!-- <script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router'

const isMenuOpen = ref(false);
const router = useRouter()

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script> -->

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()
const isMenuOpen = ref(false)
const isDropdownOpen = ref(false)
const isLoggedIn = ref(false)
const userAvatar = ref('https://picsum.photos/id/684/600/400')
const userName = ref('')

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleLogout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  isLoggedIn.value = false;
  userName.value = '';
  isDropdownOpen.value = false;
  router.push('/');
};

const checkLoginStatus = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      const userData = JSON.parse(userStr);
      isLoggedIn.value = true;
      userName.value = userData.name || '使用者';
    } catch (error) {
      console.error('解析使用者資料失敗:', error);
    }
  }
};

const closeDropdownOnClickOutside = (event) => {
  if (isDropdownOpen.value && !event.target.closest('.user-profile')) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  checkLoginStatus();
  document.addEventListener('click', closeDropdownOnClickOutside);
});
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

/* 會員頭像相關樣式 */
.user-profile {
  position: relative;
  cursor: pointer;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  min-width: 150px;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-item {
  display: block;
  padding: 8px 16px;
  color: #333;
  text-decoration: none;
  text-align: center;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.dropdown-divider {
  margin: 4px 0;
  border-top: 1px solid #ddd;
}

/* 手機版選單項目樣式 */
.mobile-menu .menu-item {
  display: block;
  padding: 10px 15px;
  color: #333;
  text-decoration: none;
  border-bottom: 1px solid #eee;
}

.mobile-menu .menu-item:last-child {
  border-bottom: none;
}

/* 新增的使用者資訊樣式 */
.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-name {
  font-size: 18px;
  color: #333;
}

.mobile-user-info {
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid #eee;
  font-weight: bold;
}

/* 其他原有的樣式保持不變 */
.user-profile {
  position: relative;
  cursor: pointer;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: FFEFE9;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  min-width: 150px;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-item {
  display: block;
  padding: 8px 16px;
  color: #333;
  text-decoration: none;
}

.dropdown-item:hover {
  background-color: #ffc9b5;
}

.dropdown-divider {
  margin: 4px;
  border-top: 2px solid #666666;
}

.mobile-menu .menu-item {
  display: block;
  padding: 10px 15px;
  color: #333;
  text-decoration: none;
  border-bottom: 1px solid #eee;
}

.mobile-menu .menu-item:last-child {
  border-bottom: none;
}
</style>
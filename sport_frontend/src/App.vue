
<template>

  <div id="app">

    <div class="main-content">


      <NavBar />


      <HorizontalCard />

        <!-- 登入模組 -->
        <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="loginModalLabel"><img src="/img/logo.svg" alt="Logo" style="height: 35px;" />
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <Login @login-success="handleLoginSuccess" />
            </div>
          </div>
        </div>
      </div>


      <!-- <RouterLink/> -->
      <RouterView />

    </div>

    <Foot />

  </div>



</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue';
import Foot from '@/components/Foot.vue';
import HorizontalCard from '@/components/HorizontalNav.vue';
import { onMounted } from 'vue'
import Login from './components/Login.vue'
import { useUserStore } from '@/stores/user'
import { provide } from 'vue'

const showLoginModal = () => {
  const loginModal = document.getElementById('loginModal')
  const modal = new bootstrap.Modal(loginModal)
  modal.show()
}
// 提供給子組件使用
provide('showLoginModal', showLoginModal)

const userStore = useUserStore()

// 初始化函數
const initializeApp = () => {
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    userStore.setUser(JSON.parse(savedUser))
    console.log('已恢復用戶狀態:', userStore.user)
  }
}

// 在組件掛載時初始化
onMounted(() => {
  initializeApp()
})

const handleLoginSuccess = (userInfo) => {
  console.log('使用者登入成功:', userInfo)
  // 處理登入成功後的邏輯
}
</script>

<style scoped>
/* 設置 footer 隨內容自適應底部 */

.main-content {
  flex: 1;
  /* 主內容填滿多餘空間 */
  margin-left: 30px;
  margin-right: 30px;
}

html,
body {
  height: 100%;
  /* 設定 html 和 body 滿高 */
  margin: 0;
  display: flex;
  flex-direction: column;

}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* 確保內容至少佔滿視窗高度 */
  background-color: rgb(249, 249, 249);
}

@media (max-width: 560px) {
  .main-content {
    margin-left: 20px;
    margin-right: 20px;
  }
}

/* 加入新的響應式設計 */
@media (max-width: 425px) {
  .main-content {
    margin-left: 15px;
    margin-right: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* 水平置中 */
  }
}

@media (max-width: 375px) {
  .main-content {
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 320px) {
  .main-content {
    margin-left: 5px;
    margin-right: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

/* 確保所有子元件在小尺寸下都能置中 */
@media (max-width: 425px) {
  .main-content>* {
    width: 100%;
    max-width: 395px;
    /* 425px - 30px margin */
  }
}

@media (max-width: 375px) {
  .main-content>* {
    width: 100%;
    max-width: 355px;
    /* 375px - 20px margin */
  }
}

@media (max-width: 320px) {
  .main-content>* {
    width: 100%;
    max-width: 310px;
    /* 320px - 10px margin */
  }
}
</style>

<!-- Footer.vue -->
<template>
    <footer class="footer-container">
      <div class="decorative-left"></div>
      <div class="decorative-right"></div>
      <div class="footer-content">
        <!-- <div class="footer-links">
          <a v-for="(link, index) in links" :key="index" :href="link.url" class="footer-link">{{ link.text }}</a>
        </div> -->
        <div class="footer-address">
          {{ teamName }}
        </div>
        <div class="footer-browser">
          請使用{{ supportedBrowsers.join('、') }} 瀏覽器
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
//   const links = ref([
//     { text: '政府網站資料開放宣告', url: 'https://tcpass.taichung.gov.tw/openInfo/index' },
//     { text: '資訊安全政策', url: 'https://tcpass.taichung.gov.tw/security/index' },
//     { text: '隱私權政策', url: 'https://tcpass.taichung.gov.tw/privacy/index' },
//     { text: '市民卡客服信箱', url: 'https://tcpass.taichung.gov.tw/contact/index' },
//     { text: '市政信箱', url: 'https://talk.taichung.gov.tw/' }
//   ])
  
  const teamName = ref('© DevilWoops')
  const supportedBrowsers = ref(['Chrome', 'FireFox', 'Edge', 'Safari'])
  </script>
  
  <style scoped>
  
  .footer-container {
    position: relative;
    background-color: #ffc9b5;
    padding: 20px 0;
    text-align: center;
    font-family: Arial, sans-serif;
    flex-shrink: 0;
    margin-top: 10px;
    overflow: hidden; /* 防止裝飾元素溢出  */
  }
  
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .footer-links {
    margin-bottom: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
  
  .footer-link {
    color: #2956B6;
    text-decoration: none;
    font-size: 15px;
    padding: 5px 10px;
    white-space: nowrap;
  }
  
  .footer-link:hover {
    text-decoration: underline;
  }
  
  .footer-address {
    color: #666;
    margin: 10px 0;
    font-size: 14px;
    padding: 0 10px;
    word-break: break-all;
  }
  
  .footer-browser {
    color: #666;
    font-size: 14px;
    padding: 0 10px;
  }
  
  .decorative-left {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 150px;
    height: 100px;
    background-image: url('/FootImg/image02.svg');
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 1; 
    transition: opacity 0.3s ease;
  }
  
  .decorative-right {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 150px;
    height: 100px;
    background-image: url('/FootImg/image1.svg');
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 1;
    transition: opacity 0.3s ease;
  }
  
  /* 響應式設計 */
  @media screen and (max-width: 1024px) {
  
    .decorative-left,
    .decorative-right {
      width: 120px;
      height: 80px;
    }
  
    .footer-content {
      padding: 0 30px;
    }
  }
  
  @media screen and (max-width: 768px) {
  
    .decorative-left,
    .decorative-right {
      width: 100px;
      height: 70px;
    }
  
    .footer-link {
      font-size: 13px;
    }
  
    .footer-address,
    .footer-browser {
      font-size: 13px;
    }
  }
  
  @media screen and (max-width: 576px) {
  
    .decorative-left,
    .decorative-right {
      width: 80px;
      height: 60px;
      opacity: 1;
      /* 在小螢幕上可以降低裝飾圖片透明度 */
    }
  
    .footer-links {
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
  
    .footer-link {
      font-size: 12px;
      padding: 3px 8px;
    }
  
    .footer-address,
    .footer-browser {
      font-size: 12px;
    }
  
    .footer-content {
      padding: 0 15px;
    }
  }
  
  /* 超小螢幕 */
  @media screen and (max-width: 375px) {
  
    .decorative-left,
    .decorative-right {
      display: none;
      /* 在極小螢幕上隱藏裝飾圖片 */
    }
  
    .footer-content {
      padding: 0 10px;
    }
  }
  </style>
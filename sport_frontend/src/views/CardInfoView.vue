<template>

  <div class="pageTitle">
    <h3>籃球場</h3>
  </div>
  <div class="container">
    <div class="image-container">
      <ImageGallery :images="images" />
    </div>

    <div class="info-container">
      <div class="section">
        <div class="section-title">
          <div class="dot"></div>
          <h2>{{ businessHours.title }}</h2>
        </div>
        <div class="content">
          {{ businessHours.time }}
        </div>
      </div>

      <div class="section">
        <div class="section-title">
          <div class="dot"></div>
          <h2>{{ pricing.title }}</h2>
        </div>
        <div class="content">
          <div v-for="(item, index) in pricing.items" :key="index" class="price-item">
            <strong v-if="item.title">【{{ item.title }}】</strong>
            <template v-if="item.subtitle">({{ item.subtitle }})</template>
            <p v-for="(detail, detailIndex) in item.details" :key="detailIndex">
              {{ detail }}
            </p>
          </div>
        </div>

        <div class="note">
          {{ note }}
        </div>
      </div>
    </div>
  </div>

  <div class="button-group">
    <button class="back-button" @click="router.back()">
      回上一頁
    </button>
    <button class="book-button" @click="router.push('/bookingCardView')">
      前往預約
    </button>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import ImageGallery from '../components/ImageGallery.vue'

// 圖片數組
const images = ref([
  '/sports/bs01.png',
  '/sports/bs02.png',
  '/sports/bs03.png',
  '/sports/bs04.png',
  '/sports/bs05.png',
  '/sports/bs06.png'
])

// 數據
const businessHours = ref({
  title: '營業時間',
  time: '每日06:00-22:00'
})

const pricing = ref({
  title: '收費標準',
  items: [
    {
      title: '全場租用',
      subtitle: '一面籃球全場',
      details: [
        '體育性活動：【例如:員工運動會,團康活動,趣味競賽,運動比賽】',
        '尖峰時段：每面2,000元/小時。(平日1800-2200；假日1200-2200)',
        '離峰時段：每面1,500元/小時。(平日0600-1800；假日0600-1200)'
      ]
    },
    {
      details: [
        '商業性活動：4,000元/小時。(行銷公司、顧問公司等代辦公司，以商業活動計)'
      ]
    },
    {
      title: '籃球活動',
      details: [
        '尖峰時段：每面1,500元/時(平日1800-2200；假日1200-2200)',
        '離峰時段：每面1,000元/時(平日0600-1800；假日0600-1200)'
      ]
    },
    {
      title: '租借服務',
      details: [
        '籃球：50元/次(球具損壞需照價賠償)'
      ]
    }
  ]
})

const note = ref('※身心障礙者預約場地，若經本中心發現將場地轉租或非本人使用，將暫停其預約使用權一個月。')
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 標題 */
.pageTitle {
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 40px 0px 10px 0px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.image-container {
  flex: 1;
  min-width: 0;
}

.info-container {
  flex: 1;
  background-color: rgb(249, 249, 249);
  padding: 32px;
  border-radius: 12px;
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
  min-width: 0;
}

.section {
  margin-bottom: 32px;
}

.section:last-child {
  margin-bottom: 0;
}

.section-title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: #ffd700;
  border-radius: 50%;
  margin-right: 12px;
}

h2 {
  font-size: 20px;
  color: #333;
  font-weight: 600;
}

.content {
  color: #444;
  font-size: 16px;
}

.price-item {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #eee;
}

.price-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.price-item strong {
  display: block;
  margin-bottom: 12px;
  color: #222;
}

.price-item p {
  margin-bottom: 8px;
}

.price-item p:last-child {
  margin-bottom: 0;
}

.note {
  font-size: 14px;
  color: #666;
  padding-top: 24px;
  margin-top: 24px;
  border-top: 1px solid #eee;
  line-height: 1.5;
}

/* 按鈕樣式 */

.button-group {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin: 20px 0;
}

.back-button,
.book-button {
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.back-button {
  background-color: white;
  border: 1px solid #333;
  color: #333;
}

.back-button:hover {
  background-color: #f5f5f5;
}

.book-button {
  background-color: #FF6242;
  border: none;
  color: white;
}

.book-button:hover {
  background-color: #ff4f2b;
}

/* 在你現有的媒體查詢中加入 */
@media screen and (max-width: 768px) {
  .button-group {
    flex-direction: column;
    padding: 0 16px;
  }

  .back-button,
  .book-button {
    width: 100%;
    padding: 14px;
  }
}

/* 1024px - 1200px 的螢幕 */
@media screen and (max-width: 1200px) {
  .container {
    max-width: 960px;
    padding: 20px;
    gap: 32px;
  }

  .info-container {
    padding: 28px;
  }
}

/* 768px - 1024px 的平板 */
@media screen and (max-width: 1024px) {
  .container {
    max-width: 768px;
    padding: 16px;
    gap: 24px;
  }

  .info-container {
    padding: 24px;
  }

  h2 {
    font-size: 18px;
  }

  .content {
    font-size: 15px;
  }
}

/* 小於 768px 的手機 */
@media screen and (max-width: 768px) {
  .container {
    flex-direction: column;
    padding: 16px;
    gap: 20px;
  }

  .image-container,
  .info-container {
    width: 100%;
  }

  .info-container {
    padding: 20px;
  }

  .section {
    margin-bottom: 24px;
  }

  .section-title {
    margin-bottom: 16px;
  }

  .price-item {
    margin-bottom: 20px;
    padding-bottom: 20px;
  }

  .note {
    padding-top: 20px;
    margin-top: 20px;
    font-size: 13px;
  }
}

/* 小於 480px 的小螢幕手機 */
@media screen and (max-width: 480px) {
  .container {
    padding: 12px;
    gap: 16px;
  }

  .info-container {
    padding: 16px;
  }

  h2 {
    font-size: 16px;
  }

  .content {
    font-size: 14px;
  }

  .price-item {
    margin-bottom: 16px;
    padding-bottom: 16px;
  }

  .note {
    padding-top: 16px;
    margin-top: 16px;
    font-size: 12px;
  }

  .dot {
    width: 6px;
    height: 6px;
    margin-right: 8px;
  }
}
</style>
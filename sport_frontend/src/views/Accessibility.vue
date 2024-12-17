<!-- AccessibilityFacilities.vue -->
<template>
  <div class="pageTitle">
    <h3>運動中心無障礙設施</h3>
  </div>
  <div class="accessibility-facilities">


    <div class="main-content">
      <!-- 左欄：設施列表 - 2x3網格 -->
      <div class="left-column">
        <div class="facility-grid">
          <div v-for="(facility, index) in facilities" :key="index" class="facility-card">
            <div class="facility-icon">
              <i :class="facility.icon"></i>
            </div>
            <div class="facility-content">
              <h3>{{ facility.name }}</h3>
              <p>{{ facility.description }}</p>
              <p class="facility-details">
                {{ facility.details.join('、') }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 右欄：地圖和聯絡資訊 -->
      <div class="right-column">
        <section class="location-map">
          <h2>設施位置圖</h2>
          <div class="map-container">
            <img src="/floor/map.png" alt="">
          </div>
        </section>

        <section class="contact-info">
          <h2>協助服務</h2>
          <div class="contact-details">
            <p>服務台電話：(02) 1234-5678</p>
            <p>服務時間：週一至週日 06:00-22:00</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const facilities = ref([
  {
    name: '無障礙停車空間',
    icon: 'fas fa-wheelchair',
    description: '提供寬敞的無障礙停車位，靠近主要入口',
    details: ['4個無障礙車位', '配備斜坡道', '24小時照明']
  },
  {
    name: '無障礙電梯',
    icon: 'fas fa-elevator',
    description: '寬敞電梯提供所有樓層便利通行',
    details: ['語音提示系統', '緊急求助鈕', '標準扶手高度']
  },
  {
    name: '無障礙廁所',
    icon: 'fas fa-restroom',
    description: '每層樓皆設有無障礙廁所',
    details: ['扶手設施', '緊急求救鈴', '適合輪椅使用']
  },
  {
    name: '無障礙更衣室',
    icon: 'fas fa-tshirt',
    description: '專門設計的無障礙更衣空間',
    details: ['寬敞空間', '防滑地板', '適高置物櫃']
  },
  {
    name: '輪椅坡道',
    icon: 'fas fa-road',
    description: '完善的坡道系統連接各區域',
    details: ['標準坡度', '防滑設計', '雙側扶手']
  },
  {
    name: '服務鈴',
    icon: 'fas fa-bell',
    description: '各區域設有服務鈴供緊急求助',
    details: ['清晰標示', '即時通報', '專人服務']
  }
])
</script>

<style scoped>
.pageTitle {
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 40px 0px 10px 0px;
}

.accessibility-facilities {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
}

.main-content {
  display: flex;
  gap: 1.5rem;
}

/* 左欄樣式 */
.left-column {
  flex: 3;
}

.facility-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* 2列 */
  grid-template-rows: repeat(3, 1fr);
  /* 3行 */
  gap: 1rem;
  height: 100%;
}

.facility-card {
  background: #eaeaea;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1rem;
  height: 100%;
  align-items: center;
}

.facility-icon {
  font-size: 1.5rem;
  color: #3498db;
  min-width: 40px;
  text-align: center;
}

.facility-content {
  flex: 1;
}

.facility-content h3 {
  color: #2c3e50;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
}

.facility-content p {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.3rem;
}

.facility-details {
  font-size: 0.85rem;
  color: #666;
}

.facility-icon {
  color: #89abab;
  font-size: 1.8rem;
}

/* 右欄樣式 */
.right-column {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.location-map,
.contact-info {
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.map-container {
  height: 300px;
  background: #f5f5f5;
  border-radius: 8px;
  margin-top: 0.5rem;
}

h2 {
  color: #2c3e50;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.contact-details p {
  margin: 0.3rem 0;
  color: #666;
  font-size: 0.9rem;
}

/* 響應式設計 */
@media (max-width: 1023px) {
  .main-content {
    flex-direction: column;
  }

  .facility-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
}

@media (min-width: 640px) and (max-width: 1023px) {
  .facility-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
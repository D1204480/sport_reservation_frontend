<!-- FloorIntroduction.vue -->
<template>

  <div class="pageTitle">
    <h3>樓層介紹</h3>
  </div>
  <div class="floor-container">
    <!-- 左側導航欄 -->
    <div class="sidebar">
      <h2 class="sidebar-title">樓層導覽</h2>
      <ul class="floor-list">
        <li v-for="floor in floors" :key="floor.id" :class="{ active: selectedFloor.id === floor.id }"
          @click="selectFloor(floor)">
          {{ floor.name }}
        </li>
      </ul>
    </div>

    <!-- 右側內容區域 -->
    <div class="content">
      <div class="floor-info">
        <h3>{{ selectedFloor.name }}</h3>

        <div class="floor-content-wrapper">
          <!-- 左側輪播區域 -->
          <div class="content-left">
            <div class="carousel-container">
              <div class="carousel">
                <div class="carousel-main">
                  <img :src="selectedFloor.images[currentImageIndex]" alt="設施圖片" class="main-image">
                </div>
                <div class="carousel-thumbnails">
                  <img v-for="(image, index) in selectedFloor.images" :key="index" :src="image"
                    :class="{ active: currentImageIndex === index }" @click="currentImageIndex = index"
                    class="thumbnail" alt="縮圖">
                </div>
                <button class="carousel-btn prev" @click="prevImage">&lt;</button>
                <button class="carousel-btn next" @click="nextImage">&gt;</button>
              </div>
            </div>
          </div>

          <!-- 右側資訊區域 -->
          <div class="content-right">
            <div class="info-card">
              <h3>設施介紹</h3>
              <p>{{ selectedFloor.description }}</p>
            </div>
            <div class="facilities">
              <h3>主要設施</h3>
              <ul>
                <li v-for="facility in selectedFloor.facilities" :key="facility">
                  {{ facility }}
                </li>
              </ul>
            </div>
            <div class="opening-hours">
              <h3>開放時間</h3>
              <p>{{ selectedFloor.openingHours }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FloorIntroduction',
  data() {
    return {
      currentImageIndex: 0,
      selectedFloor: null,
      floors: [
        {
          id: 1,
          name: '1F - 主入口大廳',
          description: '一樓為主要入口及服務區域，設有服務台、置物櫃及休息區。',
          facilities: ['服務台', '置物櫃區', '休息區', '飲水機'],
          openingHours: '週一至週日 06:00-22:00',
          images: [
            '/floor/101.jpg',
            '/floor/102.jpg',
            '/floor/103.png',
            '/floor/104.jpg'
          ]
        },
        {
          id: 2,
          name: '2F - 綜合球場區',
          description: '二樓為綜合球場區域，配有籃球場、排球場及桌球室。',
          facilities: ['休息區', '飲水機', '更衣室', '淋浴間'],
          openingHours: '週一至週日 06:00-22:00',
          images: [
            '/floor/201.png',
            '/floor/202.png',
            '/floor/203.png',
            '/floor/204.png'
          ]
        },
        {
          id: 3,
          name: '3F - 羽毛球場區',
          description: '三樓設有羽球場(6面)，提供羽球教學課程。',
          facilities: ['休息區', '飲水機', '更衣室', '淋浴間'],
          openingHours: '週一至週日 06:00-22:00',
          images: [
            '/floor/302.jpg',
            '/floor/301.jpg',
            '/floor/303.jpg',
            '/floor/304.jpg'
          ]
        },
        {
          id: 4,
          name: '4F - 多功能教室',
          description: '四樓設有多個專業教室，提供各種課程活動使用。',
          facilities: ['重訓室', '舞蹈教室', '飛輪教室', '休息區'],
          openingHours: '依課程時間',
          images: [
            '/floor/401.png',
            '/floor/402.png',
            '/floor/403.png',
            '/floor/404.png'
          ]
        },
        {
          id: 5,
          name: '5F - 室內游泳池',
          description: '五樓為室內溫水游泳池，配備專業水療設施。',
          facilities: ['25米溫水游泳池', '兒童池', 'SPA池', '蒸氣室'],
          openingHours: '週一至週日 06:00-21:30',
          images: [
            '/floor/501.png',
            '/floor/502.jpg',
            '/floor/503.jpg',
            '/floor/504.jpg'
          ]
        }
      ]
    }
  },
  created() {
    // 初始化時選擇第一個樓層
    this.selectedFloor = this.floors[0]
  },
  methods: {
    selectFloor(floor) {
      this.selectedFloor = floor
      this.currentImageIndex = 0 // 重置圖片索引
    },
    prevImage() {
      this.currentImageIndex = this.currentImageIndex === 0
        ? this.selectedFloor.images.length - 1
        : this.currentImageIndex - 1
    },
    nextImage() {
      this.currentImageIndex = this.currentImageIndex === this.selectedFloor.images.length - 1
        ? 0
        : this.currentImageIndex + 1
    }
  }
}
</script>

<style scoped>
.pageTitle {
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 40px 0px 0px 0px;
}

/* 基礎布局 */
.floor-container {
  display: flex;
  min-height: 100vh;
  background-color: rgb(249, 249, 249);
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  gap: 40px;
}

/* 側邊欄樣式 */
.sidebar {
  width: 250px;
  background-color: #d7e6e6;
  color: rgb(39, 39, 39);
  padding: 20px;
  border-radius: 10px;
  margin: 30px 0 30px 15px;
  font-size: large;
}

.sidebar-title {
  font-size: 1.5em;
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: center;
}

.floor-list {
  list-style: none;
  padding: 0;
}

.floor-list li {
  padding: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 5px;
  margin-bottom: 5px;

  white-space: nowrap;
  /* 防止文字換行 */
  overflow: hidden;
  /* 隱藏溢出內容 */
  text-overflow: ellipsis;
  /* 顯示省略號 */
}

.floor-list li:hover {
  background-color: #95b8b8;
}

.floor-list li.active {
  background-color: #739090;
  color: white;
}

/* 主要內容區域 */
.content {
  flex: 1;
  padding: 30px;
}

.floor-info {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.floor-info h1 {
  margin-bottom: 30px;
  color: #333;
}

/* 左右兩欄布局 */
.floor-content-wrapper {
  display: flex;
  gap: 30px;
  margin-top: 20px;
}

.content-left {
  flex: 1;
  min-width: 0;
}

.content-right {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 輪播區域樣式 */
.carousel-container {
  margin-bottom: 0;
}

.carousel {
  position: relative;
  width: 100%;
  margin: 0 auto;
}

.carousel-main {
  width: 100%;
  height: 400px;
  overflow: hidden;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-thumbnails {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.thumbnail {
  width: 80px;
  height: 80px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 4px;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.thumbnail:hover {
  opacity: 0.8;
}

.thumbnail.active {
  opacity: 1;
  border: 2px solid #333;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.carousel-btn:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.carousel-btn.prev {
  left: 10px;
}

.carousel-btn.next {
  right: 10px;
}

/* 右側資訊區域 */
.info-card,
.facilities,
.opening-hours {
  background-color: #eaeaea;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 0;
}

.info-card h3,
.facilities h3,
.opening-hours h3 {
  color: #666;
  margin-bottom: 15px;
  font-size: 1.2em;
}

.facilities ul {
  list-style: disc;
  margin-left: 20px;
}

.facilities li {
  margin-bottom: 10px;
  color: #555;
}

.opening-hours {
  background-color: #eaeaea;
  border-radius: 5px;
}

/* 響應式設計 */
@media (max-width: 1400px) {
  .floor-container {
    max-width: 100%;
    padding: 16px;
    gap: 24px;
  }
}

@media (max-width: 1200px) {
  .floor-content-wrapper {
    gap: 20px;
  }

  .carousel-main {
    height: 350px;
  }

  .thumbnail {
    width: 70px;
    height: 70px;
  }
}

@media (max-width: 1024px) {
  .floor-container {
    padding: 12px;
    gap: 16px;
  }

  .sidebar {
    width: 200px;
    margin: 20px 0;
    padding: 16px;
  }

  .content {
    padding: 20px;
  }

  .floor-info {
    padding: 20px;
  }

  .floor-content-wrapper {
    flex-direction: column;
    gap: 24px;
  }

  .content-left,
  .content-right {
    flex: none;
    width: 100%;
  }

  .carousel-main {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .floor-container {
    flex-direction: column;
    padding: 12px;
  }

  .sidebar {
    width: 100%;
    margin: 0 0 16px 0;
  }

  .floor-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .floor-list li {
    flex: 1;
    min-width: 140px;
    margin-bottom: 0;
    text-align: center;
  }

  .content {
    padding: 0;
  }

  .carousel-main {
    height: 300px;
  }

  .carousel-thumbnails {
    gap: 8px;
  }

  .thumbnail {
    width: 60px;
    height: 60px;
  }

  .carousel-btn {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .floor-container {
    padding: 8px;
  }

  .sidebar {
    padding: 12px;
  }

  .floor-list li {
    min-width: 120px;
    padding: 12px 8px;
    font-size: 14px;
  }

  .floor-info {
    padding: 16px;
  }

  .carousel-main {
    height: 250px;
  }

  .thumbnail {
    width: 50px;
    height: 50px;
  }

  .info-card,
  .facilities,
  .opening-hours {
    padding: 16px;
  }

  .info-card h3,
  .facilities h3,
  .opening-hours h3 {
    font-size: 1.1em;
  }

  .facilities li {
    margin-bottom: 8px;
    font-size: 14px;
  }
}

/* Touch 設備優化 */
@media (hover: none) {
  .carousel-btn {
    opacity: 0.8;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .floor-list li:hover {
    background-color: transparent;
  }

  .thumbnail:hover {
    opacity: 0.6;
  }
}
</style>
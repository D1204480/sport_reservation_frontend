<template>

  <div>
    <div class="pageTitle">
      <h3>交通資訊</h3>
    </div>
  </div>
  <div class="traffic-info-container">

    <!-- 左側交通資訊 -->
    <div class="info-section">

      <div class="info-grid">
        <div class="info-block">
          <h2>地址資訊</h2>
          <p>{{ address }}</p>
        </div>

        <div class="info-block">
          <h2>大眾運輸</h2>
          <h3>公車</h3>
          <ul>
            <li>300、307、324、325</li>
            <li>最近站點：朝馬轉運站</li>
          </ul>
        </div>

        <div class="info-block">
          <h2>開車資訊</h2>
          <p>提供車位資訊：備有地下停車場</p>
          <ul>
            <li>國道一號：西屯交流道下往市區方向</li>
            <li>台灣大道、朝馬路交叉口往朝貴路方向</li>
          </ul>
        </div>

        <div class="info-block">
          <h2>營業時間</h2>
          <p>週一至週日 06:00-22:00</p>
          <p>例假日照常營業</p>
        </div>
      </div>
    </div>

    <!-- 右側地圖 -->
    <div class="map-section">
      <iframe :src="mapUrl" width="100%" height="100%" frameborder="0" style="border:0;" allowfullscreen=""
        loading="lazy" referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrafficInfo',
  data() {
    return {
      address: '407台中市西屯區朝貴路199號'
    }
  },
  computed: {
    mapUrl() {
      const encodedAddress = encodeURIComponent(this.address);
      return `https://maps.google.com/maps?q=${encodedAddress}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
    }
  }
}
</script>

<style scoped>
.traffic-info-container {
  display: flex;
  min-height: 600px;
  gap: 2rem;
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.info-section {
  flex: 1;
  padding: 0.5rem;
}

.pageTitle {
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 40px 0px 10px 0px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  height: calc(100% - 60px);
  /* 減去標題的高度 */
}

.info-block {
  background-color: #eaeaea;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.info-block h2 {
  color: #2c3e50;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
}

.info-block h3 {
  color: #486581;
  margin: 0.75rem 0;
  font-size: 1.1rem;
}

.info-block ul {
  list-style-type: none;
  padding-left: 0.5rem;
}

.info-block li {
  margin-bottom: 0.5rem;
  color: #4a5568;
}

.map-section {
  flex: 1;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 1024px) {
  .info-grid {
    gap: 0.75rem;
  }

  .info-block {
    padding: 0.75rem;
  }
}

@media (max-width: 768px) {
  .traffic-info-container {
    flex-direction: column;
    height: auto;
  }

  .info-grid {
    grid-template-columns: 1fr;
    /* 手機版改為單欄 */
    gap: 1rem;
  }

  .map-section {
    height: 300px;
  }
}
</style>
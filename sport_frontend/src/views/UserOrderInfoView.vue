<template>
  <div class="booking-finish-view">
    <h2>訂單詳細資訊</h2>

    <!-- 左側訂單資訊區域 -->
    <div class="order-info-section">
      <div class="info-card">
        <h4>預約人資料</h4>
        <div class="info-item">
          <label>預約人：</label>
          <span>{{ bookingData.name }}</span>
        </div>
        <div class="info-item">
          <label>聯絡電話：</label>
          <span>{{ bookingData.phone }}</span>
        </div>
        <!-- <div class="info-item">
            <label>預約場地日期：</label>
            <span>{{ bookingData.reservationDate }}</span>
          </div> -->
      </div>

      <div class="info-card">
        <h4 class="section-title">租借資訊</h4>
        <div class="section-content">
          <div class="info-item">
            <span>預約日期：<span class="info-value">{{ bookingData.reservationDate }}</span></span>
          </div>
          <div class="info-item">
            <span>租借場地：<span class="info-value">{{ bookingData.venueName }}</span></span>
          </div>
          <div class="info-item">
            <span>租借類型：<span class="info-value">{{ bookingData.venueType }}</span></span>
          </div>
          <div class="info-item">
            <span>預約時段：<span class="info-value">{{ formatTimeSlots }}</span></span>
          </div>
          <div class="info-item">
            <span>租借器材：<span class="info-value">{{ formatEquipments }}</span></span>
          </div>
          <div class="info-item">
            <span>場地費用總計：<span class="info-value">{{ bookingData.totalAmount }}元</span></span>
          </div>
        </div>
      </div>


      <div class="info-card">
        <h4>繳費方式</h4>
        <div class="info-item">
          <label>付款方式：</label>
          <span>{{ bookingData.paymentMethod }}</span>
        </div>
      </div>
    </div>

    <!-- 右側 QR Code 區域 -->
    <div class="qr-code-section">
      <div class="qr-code-container">
        <p>場地保留10分鐘，逾期報到需重新預約。</p>
        <p>您可以依 QR code 報到進場</p>
        <img :src="qrCodeUrl" alt="QR Code" />
        <div class="qr-code-footer">
          <p>有效期限倒數：<strong>{{ countdown }}</strong> 秒</p>
          <button @click="manualUpdateQRCode" class="update-button">立即更新 QR Code</button>
        </div>
      </div>
    </div>
  </div>

  <p v-if="qrCodeUrl === null && latestOrder === null" class="error">
    無法載入最新的 QR Code 或訂單資訊，請稍後再試。
  </p>

  <div class="button-group">
    <button class="btn btn-book" @click="goNext">返回歷史訂單紀錄</button>
  </div>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 獲取路由參數
const orderId = computed(() => route.params.orderId)

// 訂單資料
const bookingData = ref({
  name: '王小明',
  phone: '0912345678',
  reservationDate: '2024-01-15',
  venueName: '籃球場 A',
  venueType: '室內場地',
  timeSlots: ['09:00-10:00', '10:00-11:00'],
  equipments: ['籃球 x2', '球網 x1'],
  totalAmount: 1200,
  paymentMethod: '線上信用卡'
})

// QR Code 相關
const qrCodeUrl = ref('https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=DEMO123456')
const countdown = ref(600) // 10分鐘倒數
let countdownTimer

// 格式化時段顯示
const formatTimeSlots = computed(() => {
  return bookingData.value.timeSlots?.join('、') || '無資料'
})

// 格式化器材顯示
const formatEquipments = computed(() => {
  return bookingData.value.equipments?.join('、') || '無租借器材'
})

// 更新 QR Code
const manualUpdateQRCode = () => {
  // 這裡可以加入更新 QR Code 的邏輯
  qrCodeUrl.value = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=DEMO${Date.now()}`
  countdown.value = 600 // 重置倒數時間
}

// 倒數計時
const startCountdown = () => {
  countdownTimer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(countdownTimer)
      manualUpdateQRCode() // 時間到自動更新 QR Code
    }
  }, 1000)
}

// 返回歷史訂單紀錄
const goNext = () => {
  router.push({
    name: 'userOrderView'
  })
}

// 組件掛載時啟動倒數計時
onMounted(async () => {
  if (orderId.value) {
    // 這裡可以加入加載訂單數據的邏輯
    console.log('正在加載訂單:', orderId.value)
  }

  startCountdown();
})

// 組件卸載時清除計時器
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})
</script>

<style scoped>
.booking-finish-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;

  display: flex;
  /* 使用 flex 布局 */
  flex-wrap: wrap;
  /* 在小屏幕時允許換行 */
  gap: 30px;
  /* 區塊間距 */
}

/* 主標題獨占一行 */
.booking-finish-view>h2 {
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
}

h2,
h4 {
  text-align: center;
  margin-bottom: 30px;
}

h4 {
  font-weight: normal;
}

.content-container {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

/* 左側 QR Code 區域 */
.qr-code-section {
  flex: 2;
  /* 佔據空間 */
  align-self: flex-start;
  /* 靠上對齊 */
  position: sticky;
  /* 固定位置 */
  top: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
}

.qr-code-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  text-align: center;
}

.qr-code-container img {
  max-width: 250px;
  height: auto;
  margin: 20px 0;
  border: 2px solid #ccc;
  border-radius: 10px;
}

.qr-code-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.qr-code-footer p {
  margin: 0;
}

.update-button {
  padding: 6px 12px;
  font-size: 14px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
}

.update-button:hover {
  background-color: #45a049;
}

/* 左側訂單資訊區域 */
.order-info-section {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px
    /*20px 20px 140px*/
  ;
}

.info-card {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
}

.info-card h2 {
  margin-bottom: 20px;
  color: #2c3e50;
  font-size: 1.2em;
}

.info-card h4 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.2em;
  font-weight: bold;
}

.info-item {
  /* display: flex; */
  margin-bottom: 15px;
  font-size: 16px;
}

.info-item label {
  min-width: 100px;
  color: #666;
  display: inline-block;
}

.info-item span {
  color: #2c3e50;
  font-weight: 500;
}

.info-value {
  font-weight: 500;
  color: #2c3e50;
}

/* .update-button {
  padding: 10px 20px;
  font-size: 14px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.update-button:hover {
  background-color: #45a049;
} */

.error {
  color: red;
  font-size: 16px;
  text-align: center;
  margin: 20px 0;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.btn {
  padding: 12px 24px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
}

.btn-book {
  background: #FF6242;
  color: white;
  border: none;
}

.btn-book:hover {
  background-color: #ff4f2b;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .content-container {
    flex-direction: column;
  }

  .info-item {
    flex-direction: column;
  }

  .info-item label {
    margin-bottom: 5px;
  }
}
</style>
<template>
  <progress-steps :current-step="3" />
  <div class="booking-finish-view">
    <h2>預約完成</h2>

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
        <!-- <div class="info-item">
            <label>匯款帳號：</label>
            <span>{{ latestOrder.accountingNumber || '- -' }}</span>
          </div>
          <div class="info-item">
            <label>繳款期限：</label>
            <span>{{ paymentDueDate }}</span>
          </div> -->
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

  <div class="button-group">
    <button class="btn btn-book" @click="goNext">返回首頁</button>
  </div>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ProgressSteps from '../components/ProgressSteps_Jo.vue'

const router = useRouter()
const route = useRoute()

// 檢查收到的資料
console.log('Route query:', route.query)

// 取得付款方式顯示文字
const displayPaymentMethod = computed(() => {
 const paymentMethods = {
   'ONLINE_PAYMENT': '線上繳費',
   'BANK_TRANSFER': 'ATM/銀行臨櫃 轉帳繳費'
 }
 return paymentMethods[route.query.paymentMethod] || route.query.paymentMethod
})

// 從路由獲取資料
const bookingData = ref({
  name: JSON.parse(localStorage.getItem('user'))?.name || '未登入',  // 從 localStorage 獲取名字
  phone: JSON.parse(localStorage.getItem('user'))?.phone || '未登入',
  reservationDate: route.query.date,
  venueName: route.query.title && route.query.courtId 
   ? `${route.query.title} ${route.query.courtId}場` 
   : '未選擇場地',
  venueType: route.query.title || '未選擇類型',
  timeSlots: JSON.parse(route.query.selectedTime || '[]'),
  totalAmount: route.query.totalAmount,
  paymentMethod: displayPaymentMethod.value
})

// 格式化時段顯示
const formatTimeSlots = computed(() => {
 return bookingData.value.timeSlots
   .map(slot => slot.time)
   .join('、')
})

// 暫時空的器材列表
const formatEquipments = computed(() => '無')

// QR Code 相關
const countdown = ref(600) // 10分鐘倒數
const qrCodeUrl = ref('https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=DEMO123456') // 假QR碼圖片

// 更新QR Code
const manualUpdateQRCode = () => {
 // 這裡可以添加更新QR Code的邏輯
 countdown.value = 600 // 重置倒數計時
}

// 設定倒數計時
onMounted(() => {
 const timer = setInterval(() => {
   if (countdown.value > 0) {
     countdown.value--
   } else {
     clearInterval(timer)
   }
 }, 1000)
})

const goNext = () => {
 // 清除暫存資料
 localStorage.removeItem('bookingData')
 localStorage.removeItem('paymentMethod')
 localStorage.removeItem('reservationInfo')
 
 // 導航到首頁
 router.push({
   name: 'home'
 })
}
</script>

<style scoped>
.booking-finish-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;

  display: flex; /* 使用 flex 布局 */
  flex-wrap: wrap; /* 在小屏幕時允許換行 */
  gap: 30px; /* 區塊間距 */
}

/* 主標題獨占一行 */
.booking-finish-view > h2 {
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
}

h2 {
  text-align: center;
}

h4 {
  text-align: left;
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
/* .qr-code-section {
  flex: 1;
  padding: 20px */
    /*100px 20px 20px*/
  /* ;
  background-color: #f8f9fa;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
} */
.qr-code-section {
  flex: 2; /* 佔據空間 */
  align-self: flex-start; /* 靠上對齊 */
  position: sticky; /* 固定位置 */
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
/* .order-info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px */
    /*20px 20px 140px*/
  /* ;
} */
.order-info-section {
  flex: 2; /* 佔據空間 */
  display: flex;
  flex-direction: column;
  gap: 20px;
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

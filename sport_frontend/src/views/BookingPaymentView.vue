<template>
  <progress-steps :current-step="2" />
  <div class="container">

    <div class="rental-form">
      <!-- 申請人資料區塊 -->
      <div class="form-section">
        <h2 class="section-title">預約人資料</h2>
        <div class="section-content">
          <div class="info-row">
            <span>預約人：<span class="info-value">{{ bookingData.name }}</span></span>
            <span>聯絡電話：<span class="info-value">{{ bookingData.phone }}</span></span>
          </div>
        </div>
      </div>

      <!-- 租借資訊區塊 -->
      <div class="form-section">
        <h2 class="section-title">租借資訊</h2>
        <div class="section-content">
          <div class="info-row">
            <span>預約日期：<span class="info-value">{{ bookingData.reservationDate }}</span></span>
            <span>租借場地：<span class="info-value">{{ bookingData.venueName }}</span></span>
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

      <!-- 繳費方式區塊 -->
      <div class="form-section">
        <h2 class="section-title">繳費方式</h2>
        <div class="section-content">
          <label class="radio-label">
            <input type="radio" name="payment" v-model="paymentMethod" value="ONLINE_PAYMENT">
            <span class="radio-text">線上繳費</span>
          </label>
          <label class="radio-label">
            <input type="radio" name="payment" v-model="paymentMethod" value="BANK_TRANSFER">
            <span class="radio-text">ATM/銀行臨櫃 轉帳繳費</span>
          </label>
        </div>
      </div>
    </div>

    <div class="button-group">
      <button class="btn btn-back" @click="goBack">上一步</button>
      <button class="btn btn-book" @click="goNext">下一步</button>
    </div>
  </div>
</template>

<!-- <script>
export default {
  name: 'bookingPayment',
  components: {
    ProgressSteps
  },

  data() {
    return {
      
    }
  },

  computed: {
    formatTimeSlots() {
      return this.bookingData.timeSlots
        .map(slot => slot.time)
        .join('、')
    },
    
  },

  created() {
    // 保存進入頁面時的查詢參數
    this.originalQuery = { ...this.$route.query }

    try {
      // 載入使用者資料
      const userData = localStorage.getItem('user')
      if (userData) {
        this.userId = JSON.parse(userData).userId
      }

      // 載入預約資料
      
    } catch (error) {
      console.error('Error loading booking data:', error)
    }
  },

  methods: {
    async submitBooking() {
      

        
    },

    goBack() {
      this.$router.push({
        name: "BookingDateView",
        params: { },
        query: this.originalQuery
      })
    },

    goNext() {
      // 送出資料
      this.submitBooking(),

        // 導航到付款頁面
        this.$router.push({
          name: "BookingFinishView",
          params: {  },
          query: this.originalQuery
        })
    },
  },

  watch: {
    paymentMethod: {
      handler(newValue) {
        try {
          this.bookingData.paymentMethod = newValue
          localStorage.setItem('bookingData', JSON.stringify(this.bookingData))
        } catch (error) {
          console.error('Error saving booking data:', error)
        }
      }
    }
  }
}
</script> -->
<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ProgressSteps from '../components/ProgressSteps_Jo.vue'

const router = useRouter()
const route = useRoute()

// 檢查收到的資料
console.log('Route query:', route.query)

// 從路由獲取資料
const bookingData = ref({
 name: '林林七',  // 這裡可以從 localStorage 或其他地方獲取用戶資料
 phone: '0912345678',
 reservationDate: route.query.date,
 venueName: route.query.title && route.query.courtId 
   ? `${route.query.title} ${route.query.courtId}場` 
   : '未選擇場地',
 venueType: route.query.title || '未選擇類型',
 timeSlots: JSON.parse(route.query.selectedTime || '[]'),
 totalAmount: Number(route.query.totalHours) * 200  // 假設每小時 200 元
})

const paymentMethod = ref('ONLINE_PAYMENT')
const originalQuery = ref(route.query)

// 格式化時段顯示
const formatTimeSlots = computed(() => {
 return bookingData.value.timeSlots
   .map(slot => slot.time)
   .join('、')
})

// 暫時空的器材列表
const formatEquipments = computed(() => '無')

const goBack = () => {
 router.push({
   name: 'bookingDateView',
   params: {
     id: route.params.id,
   },
   query: originalQuery.value
 })
}

const submitBooking = async () => {
 // 這裡添加提交預約的邏輯
 console.log('提交預約:', bookingData.value)
}

const goNext = () => {
  // 先檢查是否選擇付款方式
  if (!paymentMethod.value) {
    alert('請選擇繳費方式');
    return;
  }

 submitBooking();

 router.push({
   name: 'bookingFinishView',
   params: {
     id: route.params.id
   },
   query: {
     ...originalQuery.value,   // 保留原有資料
     courtId: route.query.courtId,  // 運動種類id
     title: route.query.title,  // 場地名稱
     date: route.query.date,  // 預約日期
     selectedTime: route.query.selectedTime,  // 預約時段
     totalHours: route.query.totalHours,  // 總時數
     paymentMethod: paymentMethod.value,   // 付款方式
     totalAmount: bookingData.value.totalAmount,  // 總金額
   }
 })
}

// 監聽 paymentMethod 的變化
watch(paymentMethod, (newValue) => {
 try {
   bookingData.value.paymentMethod = newValue
   localStorage.setItem('bookingData', JSON.stringify(bookingData.value))
 } catch (error) {
   console.error('Error saving booking data:', error)
 }
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  /* 增加左右邊距，避免貼齊螢幕 */
}

.rental-form {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
  /* background-color: #ffffff; */
  /* border: 1px solid #e5e7eb; */
  border-radius: 8px;
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); */
}

.form-section {
  margin-bottom: 32px;
}

.form-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 16px;
  color: #2563eb;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
}

.section-content {
  padding-left: 12px;
}

.info-row {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  margin-bottom: 8px;
}

.info-item {
  margin-bottom: 8px;
}

.info-value {
  font-weight: 500;
  color: #1f2937;
  margin-left: 4px;
}

.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 12px;
}

.radio-label:last-child {
  margin-bottom: 0;
}

.radio-label input[type="radio"] {
  margin-right: 8px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.radio-text {
  color: #374151;
}

.radio-label:hover .radio-text {
  color: #2563eb;
}

/* 響應式設計 */
@media screen and (max-width: 768px) {
  .rental-form {
    padding: 16px;
  }

  .info-row {
    flex-direction: column;
    gap: 8px;
  }

  .section-content {
    padding-left: 8px;
  }
}

.button-group {
  display: flex;
  gap: 15px;
  padding: 20px 0;
  justify-content: center;
}

.btn {
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  text-align: center;
  border: 1px solid #ddd;
}

.btn-back {
  background: white;
  color: #333;
}

.btn-book {
  background: #FF6242;
  color: white;
  border: none;
}

.btn-book:hover {
  background-color: #ff4f2b;
}
</style>
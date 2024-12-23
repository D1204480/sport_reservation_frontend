<template>
  <div class="booking-finish-view">
    <h2>訂單詳細資訊</h2>

    <div v-if="qrCodeUrl && latestOrder" class="content-container">
      <!-- 左側訂單資訊區域 -->
      <div class="order-info-section">
        <div class="info-card">
          <h2>訂單資訊</h2>
          <div class="info-item">
            <label>訂單編號：</label>
            <span>{{ orderId }}</span>
          </div>
          <div class="info-item">
            <label>預約場地：</label>
            <span>{{ bookingData.venueName }}</span>
          </div>
          <div class="info-item">
            <label>預約場地日期：</label>
            <span>{{ bookingData.reservationDate }}</span>
          </div>
        </div>
      </div>

      <!-- 右側 QR Code 區域 -->
      <div class="qr-code-section">
        <div class="qr-code-container">
          <p>建議您可以使用 QR code 進場</p>
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
  </div>
</template>

<script>
export default {
  name: "UserOrderInfoView",
  data() {
    return {
   
    };
  },

 

  async created() {
    // 保存進入頁面時的查詢參數
    this.originalQuery = { ...this.$route.query }


    
  },

  

  methods: {
   
    },

    goNext() {
      // 導航到場地租借頁面
      this.$router.push({
        name: "userOrderView",
      })

      // 清除之前的暫存資料
      localStorage.removeItem('bookingData')
      localStorage.removeItem('paymentMethod')
      localStorage.removeItem('reservationInfo')
    },
  },
};
</script>

<style scoped>
.booking-finish-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2,
h4 {
  text-align: center;
  margin-bottom: 30px;
}

h4{
  font-weight: normal;
}

.content-container {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

/* 左側 QR Code 區域 */
.qr-code-section {
  flex: 1;
  padding: 20px /*100px 20px 20px*/;
  background-color: #f8f9fa;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-code-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
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
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px /*20px 20px 140px*/;
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

.info-item {
  display: flex;
  margin-bottom: 15px;
  font-size: 16px;
}

.info-item label {
  min-width: 100px;
  color: #666;
}

.info-item span {
  color: #2c3e50;
  font-weight: 500;
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
  background: #3498db;
  color: white;
  border: none;
}

.btn-book:hover {
  background-color: #2a94db;
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
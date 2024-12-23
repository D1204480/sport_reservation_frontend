<template>
  <div class="order-history">
    <h2 class="title">歷史訂單紀錄</h2>

    <!-- 篩選區域 -->
    <div class="filters">
      <!-- 日期範圍篩選 -->
      <div class="filter-item">
        <label>預約日期</label>
        <div class="date-range">
          <input type="date" v-model="filters.startDate" :max="filters.endDate">
          <span>至</span>
          <input type="date" v-model="filters.endDate" :min="filters.startDate">
        </div>
      </div>

      <!-- 搜尋按鈕 -->
      <button @click="searchOrders" class="search-btn" :disabled="isLoading">
        {{ isLoading ? '載入中...' : '搜尋' }}
      </button>
    </div>

    <!-- 載入中提示 -->
    <div v-if="isLoading" class="loading-message">
      資料載入中，請稍候...
    </div>

    <!-- 錯誤訊息 -->
    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="retryFetch" class="retry-btn">
        重試
      </button>
    </div>

    <!-- 訂單表格 -->
    <div v-if="!isLoading && !error" class="table-container">
      <table>
        <thead>
          <tr>
            <th>訂單號碼</th>
            <th>場地名稱</th>
            <th>預約日期</th>
            <th>付款方式</th>
            <th>訂單狀態</th>
            <th class="amount">金額</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order.orderId">
            <td>{{ order.orderId }}</td>
            <td>{{ order.venueName }}</td>
            <td>{{ formatDate(order.reservationDate) }}</td>
            <td>{{ order.paymentMethod }}</td>
            <td>{{ getOrderStatus(order.status) }}</td>
            <td class="amount">
              NT$ {{ formatPrice(order.totalAmount) }}
            </td>
            <td>
              <button class="btn btn-warning btn-sm" @click="goToOrderDetail(order.orderId)">
                查看詳情
              </button>
            </td>
          </tr>
          <tr v-if="filteredOrders.length === 0">
            <td colspan="7" class="empty-message">
              無訂單紀錄
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 訂單資料
const orders = ref([
  {
    orderId: 'O20240101001',
    venueName: '籃球A場',
    reservationDate: '2024-01-01',
    paymentMethod: '線上繳費',
    status: 'COMPLETED',
    totalAmount: 1200
  },
  {
    orderId: 'O20240102002',
    venueName: '籃球B場',
    reservationDate: '2024-01-02',
    paymentMethod: 'ATM轉帳',
    status: 'PENDING',
    totalAmount: 800
  }
])

// 篩選條件
const filters = ref({
  startDate: '',
  endDate: ''
})

// 載入狀態
const isLoading = ref(false)
const error = ref(null)

// 訂單狀態對照表
const ORDER_STATUS = {
  'PENDING': '待付款',
  'PROCESSING': '處理中',
  'COMPLETED': '已完成',
  'CANCELLED': '已取消'
}

// 取得訂單狀態顯示文字
const getOrderStatus = (status) => {
  return ORDER_STATUS[status] || '未知狀態'
}

// 過濾後的訂單
const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    if (filters.value.startDate && filters.value.endDate) {
      const orderDate = new Date(order.reservationDate)
      const startDate = new Date(filters.value.startDate)
      const endDate = new Date(filters.value.endDate)
      endDate.setHours(23, 59, 59) // 設定結束日期為當天最後一刻

      return orderDate >= startDate && orderDate <= endDate
    }
    return true
  }).sort((a, b) => b.orderId.localeCompare(a.orderId))
})

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '無資料'
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// 格式化金額
const formatPrice = (price) => {
  if (!price && price !== 0) return '無資料'
  return price.toLocaleString()
}

// 搜尋訂單
const searchOrders = async () => {
  try {
    isLoading.value = true
    error.value = null

    // 這裡可以加入實際的 API 調用
    await new Promise(resolve => setTimeout(resolve, 500))

  } catch (err) {
    error.value = '載入訂單資料失敗，請稍後再試'
    console.error('Error fetching orders:', err)
  } finally {
    isLoading.value = false
  }
}

// 前往訂單詳情
const goToOrderDetail = (orderId) => {
  router.push({
    name: 'userOrderInfo',
    params: { id: orderId }
  })
}

// 重新載入
const retryFetch = () => {
  searchOrders()
}

// 初始化
onMounted(() => {
  searchOrders()
})
</script>

<style scoped>
.order-history {
  padding: 20px;
}

.title {
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: bold;
}

.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  align-items: flex-end;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.date-range {
  display: flex;
  gap: 8px;
  align-items: center;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

th {
  background-color: #f8fafc;
  font-weight: bold;
}

.amount {
  text-align: right;
}

.empty-message {
  text-align: center;
  color: #64748b;
  padding: 24px;
}

.loading-message,
.error-message {
  text-align: center;
  padding: 24px;
  color: #64748b;
}

.error-message {
  color: #ef4444;
}

.btn {
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-warning {
  background-color: #f59e0b;
  color: white;
}

.btn-warning:hover {
  background-color: #d97706;
}

.btn-sm {
  font-size: 14px;
  padding: 4px 8px;
}

.search-btn {
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-btn:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.retry-btn {
  margin-top: 12px;
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
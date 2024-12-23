<template>
  <progress-steps :current-step="1" />
  <div class="booking-date-view">
    <div class="container">
      <!-- 日曆元件 -->
      <div class="calendar">
        <div class="calendar-header">
          <button @click="changeMonth(-1)">&lt;</button>
          <span>{{ currentMonthDisplay }}</span>
          <button @click="changeMonth(1)">&gt;</button>
        </div>
        <div class="calendar-grid">
          <div v-for="weekday in weekdays" :key="weekday" class="weekday">
            {{ weekday }}
          </div>
          <div v-for="date in calendarDates" :key="date.day + date.type" class="date" :class="{
            'gray': date.type === 'prev' || date.type === 'next',
            'selected': isSelectedDate(date),
            'holiday': isHoliday(date),
            'full': isFullyBooked(date)
          }" @click="selectDate(date)">
            {{ date.day }}
          </div>
        </div>
        <div class="legend">
          <div class="legend-item">
            <div class="legend-color" style="background: #8c6bff;"></div>
            <span>預約額滿</span>
          </div>
          <div class="legend-item">
            <div class="legend-color" style="background: #666;"></div>
            <span>休館日</span>
          </div>
          <div class="legend-item">
            <div class="legend-color" style="background: #ff6b6b;"></div>
            <span>您預約的日期</span>
          </div>
        </div>
      </div>

      <!-- 時段選擇元件 -->
      <div class="time-slots">
        <h2>{{ selectedDateDisplay }} 可租借時段</h2>
        <div class="slots-container">
          <div v-for="section in timeSlots" :key="section.title" class="slot-section">
            <h3>{{ section.title }}</h3>
            <div v-for="slot in section.slots" :key="slot.id" class="slot-item">
              <input type="checkbox" :id="slot.id" v-model="slot.selected" @change="updateTotalTime">
              <label :for="slot.id">{{ slot.time }}</label>
            </div>
          </div>
        </div>
        <div class="total-time">
          您選擇的時段總計：{{ totalSelectedHours }}小時
        </div>
      </div>
    </div>

    <div class="button-group">
      <button class="btn btn-back" @click="goBack">上一步</button>
      <button class="btn btn-book" @click="goNext">下一步</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ProgressSteps from '../components/ProgressSteps_Jo.vue'

const router = useRouter()
const route = useRoute()

// 基礎資料
const weekdays = ['日', '一', '二', '三', '四', '五', '六']
const currentDate = ref(new Date())
const selectedDate = ref(new Date(2024, 10, 26)) // 預設選擇 11/26
const holidays = ref(['2024-11-11', '2024-11-25'])
const fullyBookedDates = ref(['2024-11-16', '2024-11-17'])

const sportId = route.params.id
const sportTitle = route.params.title
const courtId = route.query.courtId

// 時段資料
const timeSlots = ref([
  {
    title: '早上',
    slots: [
      { id: 'slot-7-8', time: '07:00 - 08:00', selected: false },
      { id: 'slot-8-9', time: '08:00 - 09:00', selected: false },
      { id: 'slot-9-10', time: '09:00 - 10:00', selected: false },
      { id: 'slot-10-11', time: '10:00 - 11:00', selected: false },
      { id: 'slot-11-12', time: '11:00 - 12:00', selected: false }
    ]
  },
  {
    title: '下午',
    slots: [
      { id: 'slot-12-13', time: '12:00 - 13:00', selected: false },
      { id: 'slot-13-14', time: '13:00 - 14:00', selected: false },
      { id: 'slot-14-15', time: '14:00 - 15:00', selected: false },
      { id: 'slot-15-16', time: '15:00 - 16:00', selected: false },
      { id: 'slot-16-17', time: '16:00 - 17:00', selected: false }
    ]
  },
  {
    title: '晚上',
    slots: [
      { id: 'slot-17-18', time: '17:00 - 18:00', selected: false },
      { id: 'slot-18-19', time: '18:00 - 19:00', selected: false },
      { id: 'slot-19-20', time: '19:00 - 20:00', selected: false },
      { id: 'slot-20-21', time: '20:00 - 21:00', selected: false },
      { id: 'slot-21-22', time: '21:00 - 22:00', selected: false }
    ]
  }
])

// Computed properties
const currentMonthDisplay = computed(() => {
  return `${currentDate.value.getMonth() + 1}月 ${currentDate.value.getFullYear()}`
})

const selectedDateDisplay = computed(() => {
  return `${selectedDate.value.getMonth() + 1}月${selectedDate.value.getDate()}日`
})

const calendarDates = computed(() => {
  const dates = []
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()

  // 取得當月第一天是星期幾
  const firstDay = new Date(year, month, 1).getDay()
  // 取得當月天數
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // 上個月的日期
  const prevMonthDays = new Date(year, month, 0).getDate()
  for (let i = firstDay - 1; i >= 0; i--) {
    dates.push({
      day: prevMonthDays - i,
      type: 'prev',
      date: new Date(year, month - 1, prevMonthDays - i)
    })
  }

  // 當月日期
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push({
      day: i,
      type: 'current',
      date: new Date(year, month, i)
    })
  }

  // 下個月的日期
  const remainingDays = 42 - dates.length
  for (let i = 1; i <= remainingDays; i++) {
    dates.push({
      day: i,
      type: 'next',
      date: new Date(year, month + 1, i)
    })
  }

  return dates
})

const totalSelectedHours = computed(() => {
  return timeSlots.value.reduce((total, section) => {
    return total + section.slots.filter(slot => slot.selected).length
  }, 0)
})

// Methods
const changeMonth = (delta) => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + delta,
    1
  )
}

const formatDateString = (date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

const isSelectedDate = (dateObj) => {
  if (dateObj.type !== 'current') return false
  const currentDate = formatDateString(dateObj.date)
  const selectedDateStr = formatDateString(selectedDate.value)
  return currentDate === selectedDateStr
}

const isHoliday = (dateObj) => {
  if (dateObj.type !== 'current') return false
  return holidays.value.includes(formatDateString(dateObj.date))
}

const isFullyBooked = (dateObj) => {
  if (dateObj.type !== 'current') return false
  return fullyBookedDates.value.includes(formatDateString(dateObj.date))
}

const selectDate = (dateObj) => {
  if (dateObj.type !== 'current' ||
    isHoliday(dateObj) ||
    isFullyBooked(dateObj)) return

  selectedDate.value = dateObj.date
}

const updateTotalTime = () => {
  // 這裡可以添加更新總時間的邏輯
  // 如果需要與後端通信或觸發其他操作
}

const goBack = () => {
  router.push({
    name: 'bookingCardView',
    params: {
      id: route.params.id,
      title: route.params.title
    }
  })
}


const goNext = () => {
  // 找出所有被選中的時段
  const selectedSlots = timeSlots.value.reduce((acc, section) => {
    const sectionSlots = section.slots
      .filter(slot => slot.selected)
      .map(slot => ({
        time: slot.time,
        id: slot.id
      }));
    return [...acc, ...sectionSlots];
  }, []);

  // 確保有選擇時段
  if (selectedSlots.length === 0) {
    alert('請選擇至少一個時段');
    return;
  }

  router.push({
    name: 'bookingPaymentView',
    params: {
      id: route.params.id,
      title: route.params.title,
      courtId: route.params.courtId,
    },
    query: {  // 使用 query 來傳遞額外的資料
      date: formatDateString(selectedDate.value),
      selectedTime: JSON.stringify(selectedSlots),
      totalHours: totalSelectedHours.value
    }
  })
}

</script>

<style scoped>
/* CSS 部分保持不變 */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
  background-color: #f5f5f5;
}

.container {
  display: flex;
  gap: 40px;
  background: rgb(249, 249, 249);
  padding: 30px;
  border-radius: 12px;
  justify-content: center;
  /* 新增這行 */
  align-items: center;
  /* 新增這行 */

  flex-wrap: wrap;
  /* 新增：允許元素換行 */
  max-width: 1200px;
  /* 新增：限制最大寬度 */
  margin: 0 auto;
  /* 新增：水平置中 */
  width: 100%;
  /* 新增：確保寬度響應 */
}

.calendar {
  width: 300px;
  padding: 10px;
  margin: 20px;
  border-radius: 10px;

  min-width: 400px;
  /* 新增：確保日曆最小寬度 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.calendar-header button {
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
  padding: 5px 10px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  text-align: center;
}

.weekday {
  font-weight: bold;
  margin-bottom: 10px;
}

.date {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  margin: auto;
}

.date.gray {
  color: #999;
}

.date.selected {
  background-color: #ff6b6b;
  color: white;
}

.date.holiday {
  background-color: #666;
  color: white;
}

.date.full {
  background-color: #8c6bff;
  color: white;
}

.time-slots {
  width: 400px;
  margin: 20px;

  flex-grow: 1;
  /* 新增：允許彈性成長 */
  min-width: 300px;
  /* 新增：設定最小寬度 */
}

.time-slots h2 {
  margin-bottom: 20px;
  font-size: 18px;
}

.slots-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.slot-section h3 {
  background: #666;
  color: white;
  padding: 10px;
  text-align: center;
  border-radius: 6px;
  margin-top: 0;
}

.slot-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.slot-item input[type="checkbox"] {
  margin-right: 10px;
  width: 18px;
  height: 18px;
}

.legend {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  font-size: 14px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.total-time {
  margin-top: 20px;
  font-size: 14px;
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

/* 新增響應式樣式 */
@media screen and (max-width: 768px) {
  .container {
    padding: 15px;
    gap: 20px;
  }

  .calendar,
  .time-slots {
    width: 100%;
    /* 在較小螢幕上佔滿寬度 */
  }

  .slots-container {
    grid-template-columns: repeat(1, 1fr);
    /* 時段改為單欄顯示 */
    gap: 10px;
  }

  .legend {
    flex-wrap: wrap;
    /* 讓圖例可以換行 */
    justify-content: center;
  }

  .calendar-grid {
    gap: 4px;
    /* 縮小日期間距 */
  }

  .date {
    width: 28px;
    /* 稍微縮小日期大小 */
    height: 28px;
  }
}

@media screen and (max-width: 480px) {
  .container {
    padding: 10px;
  }

  .calendar-header {
    font-size: 14px;
  }

  .time-slots h2 {
    font-size: 16px;
  }

  .slot-section h3 {
    font-size: 14px;
  }

  .slot-item {
    font-size: 14px;
  }

  .total-time {
    text-align: center;
  }
}

/* 新增平板尺寸的優化 */
@media screen and (min-width: 769px) and (max-width: 1024px) {
  .slots-container {
    grid-template-columns: repeat(2, 1fr);
    /* 平板尺寸時改為兩欄 */
  }

}
</style>
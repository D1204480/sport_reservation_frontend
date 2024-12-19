<template>
    <div class="container">
      <!-- Calendar Section -->
      <div class="calendar">
        <div class="calendar-header">
          <button @click="changeMonth(-1)" :disabled="isPreviousMonthDisabled">&lt;</button>
          <span>{{ currentDate.format('M月 YYYY') }}</span>
          <button @click="changeMonth(1)">&gt;</button>
        </div>
        <div class="calendar-grid">
          <div v-for="weekday in weekdays" :key="weekday" class="weekday">{{ weekday }}</div>
          <div
            v-for="date in calendarDates"
            :key="date.date"
            :class="[
              'date',
              {
                'gray': date.isGray,
                'selected': isSelectedDate(date.date),
                'holiday': isHoliday(date.date),
                'full': isFullyBooked(date.date),
                'disabled': isDateDisabled(date.date)
              }
            ]"
            @click="selectDate(date)"
          >
            {{ date.date.date() }}
          </div>
        </div>
        <div class="legend">
          <div class="legend-item">
            <div class="legend-color full"></div>
            <span>預約額滿</span>
          </div>
          <div class="legend-item">
            <div class="legend-color holiday"></div>
            <span>休館日</span>
          </div>
          <div class="legend-item">
            <div class="legend-color selected"></div>
            <span>您預約的日期</span>
          </div>
          <div class="legend-item">
            <div class="legend-color disabled"></div>
            <span>已過期日期</span>
          </div>
        </div>
      </div>
  
      <!-- Time Slots Section -->
      <div class="time-slots">
        <h2>{{ selectedDate.format('M月D日') }} 可租借時段</h2>
        <div class="slots-container">
          <div v-for="(section, index) in timeSlots" :key="index" class="slot-section">
            <h3>{{ section.title }}</h3>
            <div
              v-for="slot in section.slots"
              :key="slot.id"
              class="slot-item"
            >
              <input
                type="checkbox"
                :id="slot.id"
                v-model="slot.selected"
                @change="updateTotalHours"
                :disabled="isCurrentDateAndPastTime(slot.time)"
              >
              <label :for="slot.id" :class="{ 'disabled': isCurrentDateAndPastTime(slot.time) }">
                {{ slot.time }}
              </label>
            </div>
          </div>
        </div>
        <div class="total-time">
          您選擇的時段總計：{{ totalHours }}小時
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import dayjs from 'dayjs'
  import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
  import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
  
  dayjs.extend(isSameOrBefore)
  dayjs.extend(isSameOrAfter)
  
  // 響應式狀態
  const currentDate = ref(dayjs())
  const selectedDate = ref(dayjs())
  const today = ref(dayjs().startOf('day'))
  const totalHours = ref(3)
  
  // 常量
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  const holidays = ['2024-11-11', '2024-11-25']
  const fullyBookedDates = ['2024-11-16', '2024-11-17']
  
  // 時段數據
  const timeSlots = ref([
    {
      title: '早上',
      slots: [
        { id: 'slot-7-8', time: '07:00 - 08:00', selected: false },
        { id: 'slot-8-9', time: '08:00 - 09:00', selected: false },
        { id: 'slot-9-10', time: '09:00 - 10:00', selected: false },
        { id: 'slot-10-11', time: '10:00 - 11:00', selected: false },
        { id: 'slot-11-12', time: '11:00 - 12:00', selected: false },
      ]
    },
    {
      title: '下午',
      slots: [
        { id: 'slot-12-13', time: '12:00 - 13:00', selected: true },
        { id: 'slot-13-14', time: '13:00 - 14:00', selected: true },
        { id: 'slot-14-15', time: '14:00 - 15:00', selected: true },
        { id: 'slot-15-16', time: '15:00 - 16:00', selected: false },
        { id: 'slot-16-17', time: '16:00 - 17:00', selected: false },
      ]
    },
    {
      title: '晚上',
      slots: [
        { id: 'slot-17-18', time: '17:00 - 18:00', selected: false },
        { id: 'slot-18-19', time: '18:00 - 19:00', selected: false },
        { id: 'slot-19-20', time: '19:00 - 20:00', selected: false },
        { id: 'slot-20-21', time: '20:00 - 21:00', selected: false },
        { id: 'slot-21-22', time: '21:00 - 22:00', selected: false },
      ]
    }
  ])
  
  // 計算屬性
  const calendarDates = computed(() => {
    const firstDay = currentDate.value.startOf('month')
    const lastDay = currentDate.value.endOf('month')
    const startDay = firstDay.startOf('week')
    const endDay = lastDay.endOf('week')
    
    const dates = []
    let date = startDay
  
    while (date.isBefore(endDay) || date.isSame(endDay, 'day')) {
      dates.push({
        date: date,
        isGray: !date.isSame(currentDate.value, 'month')
      })
      date = date.add(1, 'day')
    }
  
    return dates
  })
  
  const isPreviousMonthDisabled = computed(() => {
    return currentDate.value.startOf('month').isBefore(today.value.startOf('month'))
  })
  
  // 方法
  const initializeSelectedDate = () => {
    let initialDate = today.value
    while (isHoliday(initialDate) || isFullyBooked(initialDate)) {
      initialDate = initialDate.add(1, 'day')
    }
    selectedDate.value = initialDate
    currentDate.value = initialDate
  }
  
  const changeMonth = (delta) => {
    const newDate = currentDate.value.add(delta, 'month')
    if (delta > 0 || !newDate.startOf('month').isBefore(today.value.startOf('month'))) {
      currentDate.value = newDate
    }
  }
  
  const selectDate = (date) => {
    if (!canSelectDate(date)) return
    selectedDate.value = date.date
    resetTimeSlots()
  }
  
  const canSelectDate = (date) => {
    return !date.isGray && 
           !isHoliday(date.date) && 
           !isFullyBooked(date.date) && 
           !isDateDisabled(date.date)
  }
  
  const isSelectedDate = (date) => {
    return date.format('YYYY-MM-DD') === selectedDate.value.format('YYYY-MM-DD')
  }
  
  const isHoliday = (date) => {
    return holidays.includes(date.format('YYYY-MM-DD'))
  }
  
  const isFullyBooked = (date) => {
    return fullyBookedDates.includes(date.format('YYYY-MM-DD'))
  }
  
  const isDateDisabled = (date) => {
    return date.isBefore(today.value)
  }
  
  const isCurrentDateAndPastTime = (timeSlot) => {
    if (!selectedDate.value.isSame(today.value, 'day')) return false
    
    const [startTime] = timeSlot.split(' - ')
    const [hours, minutes] = startTime.split(':').map(Number)
    const slotTime = today.value.hour(hours).minute(minutes)
    
    return dayjs().isAfter(slotTime)
  }
  
  const resetTimeSlots = () => {
    timeSlots.value.forEach(section => {
      section.slots.forEach(slot => {
        slot.selected = false
      })
    })
    updateTotalHours()
  }
  
  const updateTotalHours = () => {
    totalHours.value = timeSlots.value.reduce((total, section) => {
      return total + section.slots.filter(slot => slot.selected).length
    }, 0)
  }
  
  // 生命週期鉤子
  onMounted(() => {
    initializeSelectedDate()
  })
  </script>

<style scoped>
.container {
  display: flex;
  gap: 40px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.calendar {
  width: 300px;
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
  cursor: default;
}

.date.selected {
  background-color: #ff6b6b;
  color: white;
}

.date.holiday {
  background-color: #666;
  color: white;
  cursor: default;
}

.date.full {
  background-color: #8c6bff;
  color: white;
  cursor: default;
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

.legend-color.full {
  background-color: #8c6bff;
}

.legend-color.holiday {
  background-color: #666;
}

.legend-color.selected {
  background-color: #ff6b6b;
}

.time-slots {
  width: 400px;
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

.total-time {
  margin-top: 20px;
  font-size: 14px;
}
</style>
<template>
  <div class="gallery-container">
    <!-- 主圖區域 -->
    <div class="main-image-container">
      <img 
        :src="currentImage" 
        :alt="`Gallery image ${selectedIndex + 1}`"
        class="main-image"
      >
    </div>

    <!-- 縮圖導航區域 -->
    <div class="thumbnail-navigation">
      <button 
        class="nav-button"
        :disabled="currentPosition <= 0"
        @click="slidePrev"
        aria-label="Previous images"
      >
        <span>&lt;</span>
      </button>

      <div class="thumbnail-viewport">
        <div 
          class="thumbnail-track"
          :style="{ transform: `translateX(-${currentPosition}px)` }"
        >
          <button
            v-for="(image, index) in images"
            :key="index"
            :class="['thumbnail-button', { active: selectedIndex === index }]"
            @click="updateMainImage(image, index)"
            :aria-label="`View image ${index + 1}`"
            :aria-current="selectedIndex === index"
          >
            <img 
              :src="image" 
              :alt="`Thumbnail ${index + 1}`"
              class="thumbnail-image"
            >
          </button>
        </div>
      </div>

      <button 
        class="nav-button"
        :disabled="currentPosition >= maxPosition"
        @click="slideNext"
        aria-label="Next images"
      >
        <span>&gt;</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => []
  }
})

// 響應式狀態
const selectedIndex = ref(0)
const currentPosition = ref(0)
const thumbnailWidth = ref(90) // 基礎縮圖寬度
const visibleThumbnails = ref(3) // 可見縮圖數量

// 計算屬性
const currentImage = computed(() => props.images[selectedIndex.value])
const maxPosition = computed(() => {
  const totalWidth = props.images.length * (thumbnailWidth.value + 10) // 加上間距
  const viewportWidth = visibleThumbnails.value * thumbnailWidth.value
  return Math.max(0, totalWidth - viewportWidth)
})

// 方法
const updateMainImage = (image, index) => {
  selectedIndex.value = index
  // 確保選中的縮圖在可視區域內
  const position = index * (thumbnailWidth.value + 10)
  if (position < currentPosition.value) {
    currentPosition.value = position
  } else if (position > currentPosition.value + (visibleThumbnails.value - 1) * thumbnailWidth.value) {
    currentPosition.value = Math.min(
      position - (visibleThumbnails.value - 1) * thumbnailWidth.value,
      maxPosition.value
    )
  }
}

const slidePrev = () => {
  currentPosition.value = Math.max(0, currentPosition.value - thumbnailWidth.value - 10)
}

const slideNext = () => {
  currentPosition.value = Math.min(maxPosition.value, currentPosition.value + thumbnailWidth.value + 10)
}

// 響應式處理
const updateVisibleThumbnails = () => {
  const width = window.innerWidth
  if (width < 480) {
    visibleThumbnails.value = 3
    thumbnailWidth.value = 70
  } else if (width < 768) {
    visibleThumbnails.value = 4
    thumbnailWidth.value = 80
  } else {
    visibleThumbnails.value = 5
    thumbnailWidth.value = 90
  }
}

// 監聽窗口大小變化
onMounted(() => {
  updateVisibleThumbnails()
  window.addEventListener('resize', updateVisibleThumbnails)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateVisibleThumbnails)
})

// 監聽 props 變化
watch(() => props.images, () => {
  selectedIndex.value = 0
  currentPosition.value = 0
})
</script>

<style scoped>
.gallery-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.main-image-container {
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 寬高比 */
  margin-bottom: 1rem;
  background: #f8f8f8;
  border-radius: 0.5rem;
  overflow: hidden;
}

.main-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: opacity 0.3s ease;
}

.thumbnail-navigation {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
}

.thumbnail-viewport {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.thumbnail-track {
  display: flex;
  gap: 0.625rem;
  transition: transform 0.3s ease;
}

.thumbnail-button {
  flex: 0 0 auto;
  width: 90px;
  height: 90px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 0.375rem;
  background: #f8f8f8;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s ease;
}

.thumbnail-button.active {
  border-color: #FF6242;
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.nav-button {
  flex: 0 0 auto;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: #FF6242;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-button:not(:disabled):hover {
  background: #ff4f2b;
}

/* 響應式樣式 */
@media screen and (max-width: 768px) {
  .thumbnail-button {
    width: 80px;
    height: 80px;
  }
  
  .nav-button {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
}

@media screen and (max-width: 480px) {
  .gallery-container {
    padding: 0.5rem;
  }

  .thumbnail-button {
    width: 70px;
    height: 70px;
  }
  
  .nav-button {
    width: 32px;
    height: 32px;
    font-size: 0.875rem;
  }
}
</style>
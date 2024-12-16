<template>
    <div class="gallery-container">
      <div class="main-image">
        <img :src="currentImage" alt="Product">
      </div>
      <div class="thumbnail-container">
        <button 
          class="nav-button" 
          :disabled="currentPosition <= 0"
          @click="slidePrev"
        >&lt;</button>
        <div class="thumbnail-wrapper">
          <div 
            class="thumbnail-slider"
            :style="{ transform: `translateX(-${currentPosition}px)` }"
          >
            <div 
              v-for="(image, index) in images" 
              :key="index"
              :class="['thumbnail', { active: selectedIndex === index }]"
              @click="updateMainImage(image, index)"
            >
              <img :src="image" :alt="`Thumbnail ${index + 1}`">
            </div>
          </div>
        </div>
        <button 
          class="nav-button" 
          :disabled="currentPosition >= maxPosition"
          @click="slideNext"
        >&gt;</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Props definition
  const props = defineProps({
    images: {
      type: Array,
      required: true,
      default: () => []
    }
  });
  
  // Reactive state
  const currentPosition = ref(0);
  const selectedIndex = ref(0);
  const thumbnailWidth = 90;
  
  // Computed properties
  const maxPosition = computed(() => (props.images.length - 3) * thumbnailWidth);
  const currentImage = computed(() => props.images[selectedIndex.value]);
  
  // Methods
  const updateMainImage = (image, index) => {
    selectedIndex.value = index;
  };
  
  const slidePrev = () => {
    currentPosition.value = Math.max(currentPosition.value - thumbnailWidth, 0);
  };
  
  const slideNext = () => {
    currentPosition.value = Math.min(currentPosition.value + thumbnailWidth, maxPosition.value);
  };
  </script>
  
  <style scoped>
  .gallery-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .main-image {
    width: 500px;
    height: 500px;
    background: #f8f8f8;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin: 0 auto 20px;
    border-radius: 10px;
  }
  
  .main-image img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 10px;
  }
  
  .thumbnail-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .thumbnail-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  
  .thumbnail-slider {
    display: flex;
    gap: 10px;
    transition: transform 0.3s ease;
  }
  
  .thumbnail {
    width: 80px;
    height: 80px;
    border: 2px solid transparent;
    cursor: pointer;
    flex-shrink: 0;
    background: #f8f8f8;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 10px;
  }
  
  .thumbnail img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  
  .thumbnail.active {
    border-color: #FF6242;
  }
  
  .nav-button {
    background: #FF6242;
    border: 1px solid #FF6242;
    color: #f8f8f8;
    font-size: large;
    padding: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }
  
  .nav-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  </style>
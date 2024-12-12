<script setup>
import HorizontalCard from '@/components/HorizontalNav.vue'

</script>

<template>
  <div>
    <HorizontalCard />
  </div>

  <div class="home-container">
    <!-- 最新消息區塊 -->
    <section class="news-list">
      <h2 class="section-title">最新消息</h2>
      <a v-for="news in newsItems" :key="news.date" :href="news.link" class="news-item">
        <span class="news-date">{{ news.date }}</span>
        <span class="news-title">{{ news.title }}</span>
      </a>
    </section>

    <!-- 運動紀事輪播 -->
    <!-- <section>
      <h2 class="section-title">運動紀事</h2>
      <div class="carousel-container">
        <div class="carousel-wrapper">
          主要輪播區域
          <div class="carousel" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div v-for="(slide, index) in carouselSlides" :key="index" class="carousel-item">
              <img :src="slide.image" :alt="slide.alt">
            </div>
          </div>
        </div>
        導航按鈕
        <button class="carousel-nav carousel-prev" @click="prevSlide">←</button>
        <button class="carousel-nav carousel-next" @click="nextSlide">→</button>
      </div>
    </section> -->
    <section>
      <h2 class="section-title">運動紀事</h2>
      <div class="carousel-container" 
           @mouseenter="pauseAutoPlay" 
           @mouseleave="startAutoPlay">
        <div class="carousel-wrapper">
          <div class="carousel" :style="carouselStyle">
            <div v-for="(slide, index) in carouselSlides" 
                 :key="index" 
                 class="carousel-item">
              <img :src="slide.image" :alt="slide.alt">
            </div>
          </div>
        </div>
        <button class="carousel-nav carousel-prev" 
                @click="prevSlide">←</button>
        <button class="carousel-nav carousel-next" 
                @click="nextSlide">→</button>
      </div>
    </section>
  </div>


</template>

<script>
export default {
  name: 'HomeView',
  components: {
    HorizontalCard
  },

  data() {
    return {
      currentIndex: 0,
      autoPlayInterval: null,
      autoPlayDelay: 3000, // 3秒切換一次
      newsItems: [
        {
          date: '2024-10-22',
          title: '📽️立即更新台中通！參加2024臺中購物節抽大獎',
          link: '#'
        },
        {
          date: '2024-10-08',
          title: '「2024臺中國際賽車展演趣味問答遊戲」得獎名單公告',
          link: '#'
        },
        {
          date: '2024-10-21',
          title: '就在石岡！台中唯一熱氣球野餐日 玩具車也出動',
          link: '#'
        }
      ],
      carouselSlides: [
        {
          image: '/carousel/s01.png',
          alt: '瑜珈運動'
        },
        {
          image: '/carousel/s02.png',
          alt: '游泳'
        },
        {
          image: '/carousel/s03.png',
          alt: '攀岩'
        }
      ]
    }
  },

  computed: {
    carouselStyle() {
      return {
        transform: `translateX(-${this.currentIndex * (100 / 3)}%)`,
        transition: 'transform 0.5s ease'
      }
    }
  },

  methods: {
    nextSlide() {
      if (this.currentIndex >= this.carouselSlides.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
    },
    prevSlide() {
      if (this.currentIndex <= 0) {
        this.currentIndex = this.carouselSlides.length - 1;
      } else {
        this.currentIndex--;
      }
    },
    startAutoPlay() {
      if (!this.autoPlayInterval) {
        this.autoPlayInterval = setInterval(this.nextSlide, this.autoPlayDelay);
      }
    },
    pauseAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    }
  },

  mounted() {
    this.startAutoPlay();
  },

  beforeUnmount() {
    this.pauseAutoPlay();
  }
}
</script>

 <style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home-container {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  padding: 2rem;
  background-color: rgb(249, 249, 249);
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

/* 最新消息區塊 */
.news-list {
  margin-bottom: 3rem;
}

.news-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background-color: #d7e6e6;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  text-decoration: none;
  color: inherit;
}

.news-date {
  color: #0066cc;
  white-space: nowrap;
}

.news-title {
  flex: 1;
}

/* 運動紀事輪播 */
.carousel-container {
  position: relative;
  width: 100%;
  min-height: 300px;
  overflow: hidden;
  /* border: 2px solid blue; */
  /* Add this for debugging */
}
.carousel-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel {
  display: flex;
  gap: 1rem;
  width: 300%; /* 重要：設置為項目數量的百分比 */
  transition: transform 0.5s ease;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
}

.carousel::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
}

.carousel-item {
  flex: 0 0 calc(33.333% - 0.667rem);
  aspect-ratio: 4/3;
  scroll-snap-align: start;
  /* width: calc(33.333% - 0.667rem); */
  height: 300px;
  /* border: 2px solid green; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  z-index: 10;
}

.carousel-prev {
  left: 1rem;
}

.carousel-next {
  right: 1rem;
}

@media (max-width: 768px) {
  .carousel-item {
    width: calc(100% - 2rem);
  }

  .home-container {
    padding: 1rem;
  }
}
</style>

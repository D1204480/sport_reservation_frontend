<template>
  <div class="sports-grid">
    <div 
      v-for="sport in sports" 
      :key="sport.id" 
      class="sport-item"
      @click="goToCardView(sport)"
    >
      <img :src="sport.image" :alt="sport.alt" class="sport-image">
      <h2 class="sport-title">{{ sport.title }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SportsFacilities',
  data() {
    return {
      sports: [
        {
          id: 1,
          image: '/sports/01.svg',
          alt: '籃球場',
          title: '籃球'
        },
        {
          id: 2,
          image: '/sports/02.svg',
          alt: '桌球',
          title: '桌球'
        },
        {
          id: 3,
          image: '/sports/03.svg',
          alt: '游泳池',
          title: '游泳池'
        },
        {
          id: 4,
          image: '/sports/04.svg',
          alt: '羽球場',
          title: '羽球'
        },
        {
          id: 5,
          image: '/sports/05.svg',
          alt: '排球場',
          title: '排球'
        },
        {
          id: 6,
          image: '/sports/06.svg',
          alt: '攀岩場',
          title: '攀岩'
        }
      ]
    }
  },
  methods: {
    goToCardView(sport) {
      this.$router.push({
        name: 'cardInfoView',
        params: { 
          id: sport.id,
          sportData: sport
        }
      })
    }
  }
}
</script>

<style scoped>
.sports-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.sport-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer; /* 添加手型游標 */
}

.sport-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.sport-item:hover .sport-image {
  transform: scale(1.05);
}

.sport-title {
  margin-top: 22px;
  font-size: 20px;
  color: #333;
}

@media screen and (max-width: 768px) {
  .sports-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media screen and (max-width: 480px) {
  .sports-grid {
    grid-template-columns: 1fr;
  }
  
  .sport-image {
    height: 200px;
  }
  
  .sport-title {
    font-size: 20px;
  }
}
</style>
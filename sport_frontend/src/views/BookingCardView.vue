<template>

    <div class="pageTitle">
        <h3>籃球場地</h3>
    </div>

    <div class="container">
    <div class="courts-grid">
      <div 
        v-for="court in courts" 
        :key="court.id" 
        class="court-container"
        @click="goToCourtDetail(court.id)"
      >
        <div class="court">
          <img :src="court.image" :alt="court.title">
        </div>
        <div class="court-title">{{ court.title }}</div>
      </div>
    </div>
  </div>

</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const courts = ref([
  {
    id: 'A',
    title: '籃球A場',
    image: '/courts/b01.png'
  },
  {
    id: 'B',
    title: '籃球B場',
    image: '/courts/b02.png'
  },
  {
    id: 'C',
    title: '籃球C場',
    image: '/courts/b03.png'
  },
  {
    id: 'D',
    title: '籃球D場',
    image: '/courts/b04.png'
  },
  {
    id: 'E',
    title: '籃球E場',
    image: '/courts/b05.png'
  },
  {
    id: 'F',
    title: '籃球F場',
    image: '/courts/b06.png'
  }
])

const goToCourtDetail = (courtId) => {
  router.push(`/bookingDate/${courtId}`)
}
</script>

<style scoped>
/* 標題 */
.pageTitle {
    display: flex;
    justify-content: center;
    text-align: center;
    margin: 40px 0px 10px 0px;
}

/* 球場 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.courts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.court-container {
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.court-container:hover {
  transform: translateY(-5px);
}

.court {
  margin-bottom: 10px;
}

.court img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.court-title {
  font-family: sans-serif;
  margin-top: 10px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

/* Responsive design */
@media (max-width: 768px) {
  .courts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .courts-grid {
    grid-template-columns: 1fr;
  }

  .container {
    padding: 16px;
  }
}
</style>
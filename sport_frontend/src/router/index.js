import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ReservationView from '../views/ReservationView.vue'
import TrafficView from '../views/TrafficView.vue'
import CardView from '../views/CardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/reservation',
      name: 'reservation',
      component: ReservationView
    },
    {
      path: '/traffic',
      name: 'traffic',
      component: TrafficView
    },
    {
      path: '/cardView/:id',
      name: 'CardView',
      component: CardView
    }
  ]
})

export default router

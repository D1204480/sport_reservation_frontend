import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ReservationView from '../views/ReservationView.vue'
import TrafficView from '../views/TrafficView.vue'
import Accessibility from '@/views/Accessibility.vue'
import CardInfoView from '../views/CardInfoView.vue'
import BookingCardView from '../views/BookingCardView.vue'
import RegisterView from '../views/RegisterView.vue'

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
      path: '/register',
      name: 'register',
      component: RegisterView
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
      path: '/accessibility',
      name: 'accessibility',
      component: Accessibility
    },
    {
      path: '/cardInfoView/:id',
      name: 'cardInfoView',
      component: CardInfoView
    },
    {
      path: '/bookingCard',
      name: 'bookingCardView',
      component: BookingCardView
    }
  ]
})

export default router

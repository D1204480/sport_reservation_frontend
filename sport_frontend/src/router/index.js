import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ReservationView from '../views/ReservationView.vue'
import TrafficView from '../views/TrafficView.vue'
import Accessibility from '@/views/Accessibility.vue'
import CardInfoView from '../views/CardInfoView.vue'
import BookingCardView from '../views/BookingCardView.vue'
import RegisterView from '../views/RegisterView.vue'
import BookingDateView from '../views/BookingDateView.vue'
import BookingPaymentView from '../views/BookingPaymentView.vue'
import BookingFinishView from '../views/BookingFinishView.vue'

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
      path: '/bookingCardView/:id',
      name: 'bookingCardView',
      component: BookingCardView
    },
    {
      path: '/bookingDateView/:id',
      name: 'bookingDateView',
      component: BookingDateView
    },
    {
      path: '/bookingPaymentView/:id',
      name: 'bookingPaymentView',
      component: BookingPaymentView
    },
    {
      path: '/bookingFinishView/:id',
      name: 'bookingFinishView',
      component: BookingFinishView
    },
    {
      path: '/userOrder',
      name: 'userOrderView',
      component: UserOrderView,
    },
    {
      path: '/userInfo',
      name: 'userInfoView',
      component: UserInfoView,
    },
    {
      path: '/userOrderInfo/:id',
      name: 'userOrderInfoView',
      component: UserOrderInfoView,
    }
  ]
})

export default router

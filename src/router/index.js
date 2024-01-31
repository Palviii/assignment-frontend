import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  // {
  //   path: '/dashboard',
  //   name: 'home',
  //   component: DashboardView,
  //   meta: { requiresAuth: true }
  // },
  
]

const router = new VueRouter({
  routes
})

export default router

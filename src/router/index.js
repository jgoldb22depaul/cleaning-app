import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Create from '../views/Create.vue'
import GetAll from '../views/GetAll.vue'
import GetOnePost from '../views/GetOnePost.vue'
import NotFound from '../views/NotFound.vue'
import Delete from '../views/Delete.vue'
import NewAccount from '../views/NewAccount.vue'
import CleaningServices from  '../views/CleaningServices'
import ServiceOptions from '../views/ServiceOptions.vue'
import CheckAvailable from '../views/CheckAvailable.vue'
import Finalize from '../views/Finalize.vue'
import AccountPage from '../views/AccountPage.vue'
import Appointment from '../views/Appointment.vue'

const routes = [
  { 
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/cleaningServices',
    name: 'CleaningServices',
    component: CleaningServices
  },
  {
    path: '/newaccount',
    name: 'NewAccount',
    component: NewAccount
  },
  { 
    path: '/options',
    name: 'ServiceOptions',
    component: ServiceOptions
  },
  {
    path: '/availability',
    name: 'CheckAvailable',
    component: CheckAvailable
  },
  { 
    path: '/appointment',
    name: 'Appointment',
    component: Appointment
  },
  {
    path: '/finalize',
    name: 'Finalize',
    component: Finalize
  },
  {
    path: '/accountpage',
    name: 'AccountPage',
    component: AccountPage
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/create/post',
    name: 'Create',
    component: Create
  },
  {
    path: '/post',
    name: 'GetAll',
    component: GetAll
  },
  {
    path: '/post/id',
    name: 'GetOnePost',
    component: GetOnePost
  },
  {
    path: '/delete/post/id',
    name: 'Delete',
    component: Delete
  },
  {
    path: '/404', 
    name: 'NotFound', 
    component: NotFound
  },
  {
    path: '/:catchAll(.*)', 
    redirect:'/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

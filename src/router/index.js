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
import DeleteAccount from '../views/DeleteAccount.vue'
import Reschedule from '../views/Reschedule.vue'
import Complete from '../views/Complete.vue'
import CreateRateReview from '../views/CreateRateReview.vue'
import CreateRate from '../views/CreateRate.vue'

const routes = [
  { 
    path: '/',
    name: 'Login',
    component: Login
  },
  { 
    path: '/deleteaccount',
    name: 'DeleteAccount',
    component: DeleteAccount
  },
   { 
    path: '/complete',
    name: 'Complete',
    component: Complete
  },
  { 
    path: '/createrate/:id',
    name: 'CreateRate',
    component: CreateRate
  },
  { 
    path: '/createratereview/:id',
    name: 'CreateRateReview',
    component: CreateRateReview
  },
  {
    path: '/cleaningServices/:id',
    name: 'CleaningServices',
    component: CleaningServices
  },
  {
    path: '/newaccount',
    name: 'NewAccount',
    component: NewAccount
  },
  { 
    path: '/options/:id',
    name: 'ServiceOptions',
    component: ServiceOptions
  },
  {
    path: '/availability/:id',
    name: 'CheckAvailable',
    component: CheckAvailable
  },
  { 
    path: '/appointment/:id',
    name: 'Appointment',
    component: Appointment
  },
  {
    path: '/finalize/:id',
    name: 'Finalize',
    component: Finalize
  },
  {
    path: '/accountpage/:id',
    name: 'AccountPage',
    component: AccountPage
  },
  {
    path: '/Home/:id',
    name: 'Home',
    component: Home
  },
  {
    path: '/create/post/:id',
    name: 'Create',
    component: Create
  },
  {
    path: '/post/:id',
    name: 'GetAll',
    component: GetAll
  },
  {
    path: '/post/:id',
    name: 'GetOnePost',
    component: GetOnePost
  },
  {
    path: '/delete/post/:id',
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

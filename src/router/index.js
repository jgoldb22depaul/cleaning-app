import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import CleanHome from '../views/CleanHome.vue'
import Create from '../views/Create.vue'
import GetAll from '../views/GetAll.vue'
import CleanSchedule from '../views/CleanSchedule.vue'
import GetOnePost from '../views/GetOnePost.vue'
import NotFound from '../views/NotFound.vue'
import Delete from '../views/Delete.vue'
import NewAccount from '../views/NewAccount.vue'
import NewCleanAccount from '../views/NewCleanAccount.vue'
import CleaningServices from  '../views/CleaningServices'
import ServiceOptions from '../views/ServiceOptions.vue'
import CheckAvailable from '../views/CheckAvailable.vue'
import Finalize from '../views/Finalize.vue'
import AccountPage from '../views/AccountPage.vue'
import CleanAccountPage from '../views/CleanAccountPage.vue'
import Appointment from '../views/Appointment.vue'
import DeleteAccount from '../views/DeleteAccount.vue'
import Reschedule from '../views/Reschedule.vue'
import Complete from '../views/Complete.vue'
import CreateRateReview from '../views/CreateRateReview.vue'
import CreateRate from '../views/CreateRate.vue'
import CompanyPage from '../views/CompanyPage.vue'
import TimeSlot from '../views/TimeSlot.vue'
import CleanOptions from '../views/CleanOptions.vue'
import CleanPast from '../views/CleanPast.vue'
import CleanReviews from '../views/CleanReviews.vue'
const routes = [
  { 
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/CleanPast/:id',
    name: 'CleanPast',
    component: CleanPast
  },
  {
    path: '/CleanReviews/:id',
    name: 'CleanReviews',
    component: CleanReviews
  },
  { 
    path: '/Reschedule/:id',
    name: 'Reschedule',
    component: Reschedule
  },
  { 
    path: '/CompanyPage/:id/:cid',
    name: 'CompanyPage',
    component: CompanyPage,
    props: true
  },
  { 
    path: '/TimeSlot/:id',
    name: 'TimeSlot',
    component: TimeSlot,
    props: true
  },
  { 
    path: '/CleanOptions/:id',
    name: 'CleanOptions',
    component: CleanOptions,
    props: true
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
    path: '/newcleanaccount',
    name: 'NewCleanAccount',
    component: NewCleanAccount
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
    path: '/cleanaccountpage/:id',
    name: 'CleanAccountPage',
    component: CleanAccountPage
  },
  {
    path: '/Home/:id',
    name: 'Home',
    component: Home
  },
  {
    path: '/CleanHome/:id',
    name: 'CleanHome',
    component: CleanHome
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
    path: '/cleanschedule/:id',
    name: 'CleanSchedule',
    component: CleanSchedule
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

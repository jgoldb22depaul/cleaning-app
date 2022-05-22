<template>
  <div class="w-full lg:screen h-10 mx-auto items-center flex justify-around"  :style="{backgroundColor: '#F8FFE5'}">
    <router-link :to="{name: 'Home', params: {id : username}}"><p class="" v-bind:style="{color: '#CC5500'}">Home</p></router-link>
    <router-link :to="{name: 'CleaningServices', params: {id : username}}"><p class="" v-bind:style="{color: '#CC5500'}">Cleaning Services</p></router-link>
    <router-link :to="{name: 'Create', params: {id : username}}"><p class="" v-bind:style="{color: '#CC5500'}">Create New Reservation</p></router-link>
    <router-link :to="{name: 'GetAll', params: {id : username}}"><p class="" v-bind:style="{color: '#CC5500'}">Schedule</p></router-link>
	<router-link :to="{name: 'Login', params: {id : username}}"><p class="" v-bind:style="{color: '#CC5500'}">Logout</p></router-link>
	<router-link :to="{name: 'AccountPage', params: {id : username}}"><p class="" v-bind:style="{color: '#CC5500'}">Account Settings</p></router-link>
  
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import axios from '@/axios'
export default {
  components: {
    StarRating
  },
   props: {
    cid: Number
  },
  data() {
    return {
      username: localStorage.currentUser || '' ,
      rating: 0
    } 
  }
}
</script>

<style>

</style>
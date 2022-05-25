<template>
  <div class="w-full lg:screen h-10 mx-auto items-center flex justify-around" :style="{backgroundColor: '#F8FFE5'}" >
    <router-link :to="{name: 'CleanHome', params: {id : username}}"><p class="" v-bind:style="{color: '#CC5500'}">Home</p></router-link>
	<router-link :to="{name: 'CleanSchedule', params: {id : username}}"><p class="" v-bind:style="{color: '#CC5500'}">Schedule</p></router-link>
  <router-link :to="{name: 'CleanPast', params: {id : compname}}"><p class="" v-bind:style="{color: '#CC5500'}">Past</p></router-link>
  <router-link :to="{name: 'CleanReviews', params: {id : parseInt(cid)}}"><p class="" v-bind:style="{color: '#CC5500'}">Reviews</p></router-link>
	<router-link :to="{name: 'Login', params: {id : username}}"><p class="" v-bind:style="{color: '#CC5500'}">Logout</p></router-link>
  <router-link :to="{name: 'TimeSlot', params: {id : compname}}"><p class="" v-bind:style="{color: '#CC5500'}">Time Slots</p></router-link>
  <router-link :to="{name: 'CleanOptions', params: {id : compname}}"><p class="" v-bind:style="{color: '#CC5500'}">Cleaning Options</p></router-link>
	<router-link :to="{name: 'CleanAccountPage', params: {id : username}}"><p class="" v-bind:style="{color: '#CC5500'}">Account Settings</p></router-link>

  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import axios from '@/axios'
export default {
  components: {
    StarRating
  },

  data() {
    return {
      cid: 0,
      username: localStorage.currentUser || '' ,
      compname: localStorage.currentUserName || '' ,
      myCid: localStorage.myCid || 404,
      rating: 0
    } 
  },
  mounted() {
    
    axios
        .get('/cleanreviews', {
          params: {
            id: this.compname,
            
          }
        })
        .then((response) => {
          
          this.cid = response.data.data[0].id
          console.log('shuppy', this.cid);  
        })
  },
}
</script>

<style>

</style>
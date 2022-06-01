<template>
  <div class="w-screen h-screen bg-400" id="app" v-bind:style="{ backgroundColor: '#F8FFE5'}">
    <CleanHeader/>
    <p class="relative top-52 text-4xl lg:text-8xl font-bold" :style="{color: '#ECA72C'}">welcome, {{this.username}}</p>
    <p class="relative top-56 text-white lg:text-4xl" :style="{color: '#ECA72C'}">AirBnb Scheduler Service</p>
    
  </div>
</template>

<script> 

import CleanHeader from '../components/CleanHeader.vue'

export default {
  components: {CleanHeader},
  data() {
    return {
      username: 'hello',
      rating: 0
    } 
  },
  mounted() {
    if (localStorage.currentUser) {
      this.username = localStorage.currentUserName;
    }
  }
  
}

</script>

<style></style>

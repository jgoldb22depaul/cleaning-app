<template>
  <div class="w-screen h-screen bg-400" id="app" v-bind:style="{ backgroundColor: '#F8FFE5'}">
    <Header/>
    <p class="relative top-52 text-4xl lg:text-8xl font-bold" :style="{color: '#ECA72C'}">welcome, {{this.username}}</p>
    <p class="relative top-56 text-white lg:text-4xl" :style="{color: '#ECA72C'}">AirBnb Scheduler Service</p>
    
  </div>
</template>

<script> 

import Header from '../components/Header.vue'

export default {
  components: {Header},
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



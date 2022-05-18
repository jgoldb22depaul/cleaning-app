<template>
  <div class="w-screen h-screen bg-400" id="app" v-bind:style="{ backgroundColor: '#ECA72C'}">
    <Header/>
    <p class="relative top-52 text-4xl lg:text-8xl font-bold" :style="{color: '#F8FFE5'}">welcome, {{this.username}}</p>
    <p class="relative top-56 text-white lg:text-4xl">AirBnb Scheduler Service</p>
    
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



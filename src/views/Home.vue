<template>
  <div class="w-screen h-screen bg-purple-700">
    <Header/>
    <p class="relative top-52 text-white text-4xl lg:text-6xl font-bold">welcome, {{this.username}}</p>
    <p class="relative top-56 text-white lg:text-3xl">AirBnb Scheduler Service</p>
    
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



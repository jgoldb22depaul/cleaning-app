<template>
  <div class="w-full lg:w-7/12 h-10 mx-auto items-center flex justify-around text-white">
    <router-link :to="{name: 'Home', params: {id : username}}"><p class="text-white">Home</p></router-link>
    <router-link :to="{name: 'Create', params: {id : username}}"><p class="text-white">Create New Reservation</p></router-link>
    <router-link :to="{name: 'GetAll', params: {id : username}}"><p class="text-white">Schedule</p></router-link>
	<router-link :to="{name: 'Login', params: {id : username}}"><p class="text-white">Logout</p></router-link>
	<router-link :to="{name: 'AccountPage', params: {id : username}}"><p class="text-white">Account Settings</p></router-link>
  
  </div>
</template>

<script>

export default {
  
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
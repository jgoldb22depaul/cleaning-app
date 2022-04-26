<template>
  <div class="w-full lg:w-7/12 h-10 mx-auto items-center flex justify-around text-white">
    <router-link :to="{name: 'Home'}"><p class="text-white">Home</p></router-link>
    <router-link :to="{name: 'Create'}"><p class="text-white">Create New Reservation</p></router-link>
    <router-link :to="{name: 'GetAll'}"><p class="text-white">Schedule</p></router-link>
	<router-link :to="{name: 'Login'}"><p class="text-white">Logout</p></router-link>
	<router-link :to="{name: 'AccountPage'}"><p class="text-white">Account Settings</p></router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
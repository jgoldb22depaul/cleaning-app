<template>
  <div class="w-screen h-screen bg-blue-400">
     <div class="relative top-10 text-white text-4xl lg:text-4xl font-bold">Are you sure you want to delete your account?</div>
	 <br>
	  <br>
	 <div class = "inline">
		<button v-on:click="requestDeleteUser"  class = "border border-gray-200 rounded-xl py-8 px-16 font-bold cursor-pointer text-4xl text-white ml-2 bg-indigo-600">Yes</button>
 </div>
	<div class="inline">

	<button v-on:click="requestNoDelete" class = "border border-gray-200 rounded-xl py-8 px-16 font-bold cursor-pointer text-4xl text-white ml-2 bg-indigo-600">No</button>
    
   </div>
	
	</div>
	
</template>
<script>
import axios from '@/axios'
import Header from '../components/Header.vue'

export default {
  components: {Header},
  data() {
    return {
      username: ''
	   } 
  },
  methods: {
	requestNoDelete(){
	this.$router.push({ name: 'AccountPage' });
	},
	requestDeleteUser(){
		axios	
			.post('/deleteaccount', {
				username: this.username
				})
				.then((resp) => {
				console.log(resp);
				if(resp.data){
					this.$router.push({ name: 'Login' });
        }
          }, (error) => {
            console.log(error);
          });
	}
  },
  mounted() {
    if (localStorage.currentUser) {
      this.username = localStorage.currentUser;
    }
  }
  
}

</script>

<style></style>

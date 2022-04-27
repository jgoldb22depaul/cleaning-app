<template>
  <div class="w-screen h-screen bg-blue-400">
    <Header/>
    <div class="text-center font-bold text-5xl m-10 text-white">Account Settings</div>
	<p class="relative top-5 text-white text-1xl lg:text-3xl font-bold"> Change Account Password: </p>
	<form @submit.prevent="CheckPassword">
      <div class="mt-10 mx-auto w-10/12 rounded-2xl flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-white">
        <label for="oldpassword">Old Password</label>
		<input type="text" id="new" required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="oldpassword" spellcheck="false" placeholder="current password">
		<label for="newpassword">New Password</label>
		<input type="text" id="new" required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="newpassword" spellcheck="false" placeholder="new password">
		<input type="submit" value="Submit" class="border border-gray-200 rounded-xl py-2 px-4 font-thin cursor-pointer text-sm text-white ml-2 bg-indigo-600">
      </div>
    </form>
	 <div id="deleteUser">
	 <br>
		<button v-on:click="requestDeleteUser()" class = "border border-gray-200 rounded-xl py-4 px-8 font-bold cursor-pointer text-sm text-white ml-2 bg-indigo-600">Delete Account</button>
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
      username: '',
	   oldpassword: '',
	  newpassword: ''
	   } 
  },
  methods: {
  CheckPassword(){
	 const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
	 if(specialChars.test(this.newpassword)){
	 this.changePassword()}
	 
  },
	changePassword(){
		 axios
          .post('/accountpage', {
			     newpassword: this.newpassword,
			username: this.username,
			oldpassword: this.oldpassword

			})
          .then((resp) => {
            console.log(resp);
				if(resp.data){
				console.log(this.newpassword);
			this.$router.push({ name: 'Home' });
        }
          }, (error) => {
            console.log(error);
          });
	
	},
	requestDeleteUser(){
	this.$router.push({ name: 'DeleteAccount' });
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
<template>
  <div class="w-screen h-screen bg-400" :style="{ backgroundColor: '#F8FFE5'}">
    <Header/>
    <div class="text-center font-bold text-5xl m-10 " :style="{color: '#ECA72C'}">Account Settings</div>
	<p class="relative top-5 text-1xl lg:text-3xl font-bold" :style="{color: '#ECA72C'}"> Change Account Password: </p>
	<form @submit.prevent="CheckPassword">
      <div class="mt-10 mx-auto w-10/12 rounded-2xl flex flex-col text-gray-800 p-4 shadow-lg max-w-2xl" :style="{ backgroundColor: '#E9967A'}">
	  <span class="leading-1" v-if="wrongPass != null" :style="{backgroundColor: '#F8FFE5', color: '#FD3A4A'}"> {{wrongPass}}</span>
        <label for="oldPassInput" :style="{color: '#F8FFE5'}">Old Password</label>
		<input type="text" id="new" required class="bg-gray-100 p-2 mb-4 outline-none" v-model="oldPassInput" spellcheck="false" placeholder="current password">
		<label for="newpassword" :style="{color: '#F8FFE5'}">New Password</label>
		<input type="text" id="new" required class="bg-gray-100  p-2 mb-4 outline-none" v-model="newpassword" spellcheck="false" placeholder="new password">
		<div class="items-center">
		<input type="submit" value="Submit" class="rounded-xl w-1/5 py-2 px-4 font-thin cursor-pointer text-sm text-white ml-2" :style="{ backgroundColor: '#FD3A4A', color: '#F8FFE5'}">
		</div>
	  </div>
    </form>
	<span class="leading-1" v-if="badPass != null" :style="{backgroundColor: '#F8FFE5', color: '#FD3A4A'}"> {{badPass}}</span>
	 <div id="deleteUser">
	 <br>
		<button v-on:click="requestDeleteUser()" class = "rounded-xl py-4 px-8 font-bold cursor-pointer text-sm text-white ml-2" :style="{ backgroundColor: '#FD3A4A', color: '#F8FFE5'}">Delete Account</button>
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
	   oldpassword: '',
	   oldPassInput: '',
	  newpassword: '',
	  badPass: null,
	  wrongPass: null
	   } 
  },
  methods: {
  CheckPassword(){
	 const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
	 if(specialChars.test(this.newpassword) && (this.oldPassInput == this.oldpassword)){
	 this.changePassword()}
	 else if (!specialChars.test(this.newpassword)) {
	 this.badPass = 'Password must be at least 8 characters and include at least 1 special character'
	 }
	 else if (this.oldPassInput != this.oldpassword){
	 this.wrongPass = 'Current password is not correct!'
	 }
	 
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
	const confirmDeletion = confirm('Are you sure you want to delete your account?')
	if(confirmDeletion){
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
	}
  
  },
  mounted() {
  console.log(localStorage.currentUser)
	axios
		.get('/accountpage', {
			params: {
				username: localStorage.currentUser
			}})
		 .then((resp) => {
            console.log(resp.data[0]);
				if(resp.data){
				this.oldpassword = resp.data[0].password;
				console.log(this.oldpassword);
        }
          }, (error) => {
            console.log(error);
          });
			
			
    if (localStorage.currentUser) {
      this.username = localStorage.currentUser;
    }
  }
  
}

</script>

<style></style>
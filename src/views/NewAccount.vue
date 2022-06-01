<template>
  <div class="w-screen h-screen bg-400" id="app" v-bind:style="{ backgroundColor: '#E9967A'}">
    <Header/>
	<div class="text-center font-bold text-5xl px-6 pt-32 pb-7" v-bind:style="{color: '#F8FFE5'}">Create a new account </div>
   <form @submit.prevent="CheckPassword">
      <div class="mt-10 mx-auto w-1/3 rounded-2xl flex flex-col text-gray-800 p-4 shadow-lg max-w-2xl bg" v-bind:style="{ backgroundColor: '#CC5500'}">
        <input type="text" required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="username" spellcheck="false" placeholder="Username">
		<span class="leading-1" v-if="message != null" :style="{backgroundColor: '#F8FFE5', color: '#FD3A4A'}"> {{message}}</span>
        <input type="password" required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="password" spellcheck="false" placeholder="Password">
		 <input type="firstname" required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="firstname" spellcheck="false" placeholder="First Name">
		  <input type="lastname" required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="lastname" spellcheck="false" placeholder="Last Name">
		  <input type="email" required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="email" spellcheck="false" placeholder="Email">
        <div class="flex justify-end mt-5">
          <input type="submit" value="Submit" class="border border-gray-200 rounded-xl py-2 px-4 font-thin cursor-pointer text-sm text-white ml-2 bg-600"  v-bind:style="{ backgroundColor: '#FD3A4A'}">
        </div>
      </div>
    </form>
    <br>
   <div class="w-full lg:w-7/12 h-10 mx-auto items-center flex justify-around text-white">
    <router-link :to="{name: 'Login'}"><p class="text-xl pt-4" v-bind:style="{color: '#F8FFE5'}">Back to Login Page</p></router-link>
  </div>
  </div>
  
</template>

<script>
import axios from '@/axios'

export default {
  
  data() {
    return {
      username: '',
      password: '',
	  firstname: '',
	  lastname: '',
	  email: '',
      users: [ ],
      postsNumber: null,
	  message: null
    } 
  },
  mounted() {

    axios
        
        .get('/newaccount')
        .then((resp) => {
          console.log(resp);
          this.users = resp.data;
        })
  },
  //   fetch('http://localhost:4000')
  //     .then(res => res.json())
  //     .then(data => {
  //       this.results = data.data
  //       this.postsNumber = data.data.length
  //     })
  //     .catch(err => console.log(err.message))
  // },



  methods: {
  CheckPassword(){
	 const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
	 if(specialChars.test(this.password)){
	 this.RequestCreateAccount()}
	 else{
	 this.message = 'Password must be at least 8 characters and include at least 1 special character'
	 }
	 
  },
    RequestCreateAccount() {
      axios.post('/newaccount', {
        username: this.username,
        password: this.password,
		firstname: this.firstname,
		lastname: this.lastname,
		email: this.email
      })
      .then((resp) => {
        console.log(resp);
        if(resp.data){
          this.$router.push({ name: 'Login' });
        }
         // go to next page -> successful login
      })
      .catch(function (error) {
        console.log(error);
      });

      //convert data properties back into empty strings
      this.username = ''
      this.password = ''
	  this.firstname = ''
	  this.lastname = ''
	  this.email = ''
    }  
     
  }
}
</script>

<style></style>



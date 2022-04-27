<template>
  <div class="w-screen h-screen bg-blue-400">
    <Header/>
	<div class="text-center font-bold text-2xl px-6 py-7 text-white">Create a new account.</div>
   <form @submit.prevent="CheckPassword">
      <div class="mt-10 mx-auto w-10/12 rounded-2xl flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-white">
        <input type="text" required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="username" spellcheck="false" placeholder="Username">
        <input type="password" required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="password" spellcheck="false" placeholder="Password">
		 <input type="firstname" required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="firstname" spellcheck="false" placeholder="First Name">
		  <input type="lastname" required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="lastname" spellcheck="false" placeholder="Last Name">
        <div class="flex justify-end mt-5">
          <input type="submit" value="Submit" class="border border-gray-200 rounded-xl py-2 px-4 font-thin cursor-pointer text-sm text-white ml-2 bg-indigo-600">
        </div>
      </div>
    </form>
    
   <div class="w-full lg:w-7/12 h-10 mx-auto items-center flex justify-around text-white">
    <router-link :to="{name: 'Login'}"><p class="text-white">Back to Login Page</p></router-link>
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
      users: [ ],
      postsNumber: null
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
	 
  },
    RequestCreateAccount() {
      axios.post('/newaccount', {
        username: this.username,
        password: this.password,
		    firstname: this.firstname,
		    lastname: this.lastname
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
    }  
     
  }
}
</script>

<style></style>



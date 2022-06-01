<template>
  <div class="w-screen min-h-screen bg-400" id="app" v-bind:style="{ backgroundColor: '#E9967A'}">
    
    <div class="text-center font-bold text-5xl px-6 pt-32 pb-7" :style="{color: '#F8FFE5'}">Enter your login info.</div>
    <form @submit.prevent="RequestLogin">
      <div class="mt-10 mx-auto w-1/3 rounded-2xl flex flex-col text-gray-800 p-4 shadow-lg max-w-2xl bg" v-bind:style="{ backgroundColor: '#CC5500'}">
        <input type="text" required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="username" spellcheck="false" placeholder="Username">
        <input type="password" required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="password" spellcheck="false" placeholder="Password">
        <div class="flex justify-end mt-5">
          <input type="submit" value="Login" class="border border-gray-200 rounded-xl py-2 px-4 font-thin cursor-pointer text-sm text-white ml-2 bg-600" v-bind:style="{ backgroundColor: '#FD3A4A'}">
        </div>
      </div>
    </form>
	 <span class="leading-1 text-6sm" v-if="loginError != null" :style="{backgroundColor: '#F8FFE5', color: '#FD3A4A'}"> {{loginError}}</span>
    
    
	<div class="w-full lg:w-7/12 h-10 mx-auto items-center">
    <router-link :to="{name: 'NewAccount'}"><p class="text-xl pt-4" :style="{ color: '#F8FFE5'}">Create New Client Account</p></router-link>
	<router-link :to="{name: 'NewCleanAccount'}"><p class="text-xl" :style="{ color: '#F8FFE5'}">Create New Cleaning Company Account</p></router-link>
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
      users: [ ],
      postsNumber: null,
	  loginError: null
    } 
  },
  mounted() {
    axios
        
        .get('/')
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
    RequestLogin() {
      axios.post('/', {
        username: this.username,
        password: this.password
      })
      .then((resp) => {
        console.log(resp);
        if(resp.data[0]){
		  localStorage.setItem('currentUserEmail', resp.data[0].email)
          localStorage.setItem('currentUserName', resp.data[0].firstname)
          localStorage.setItem('currentUser', resp.data[0].username)
		  console.log('acctype is: ' + resp.data[0].acctype)
		  if(resp.data[0].acctype == 'company'){
			localStorage.setItem('currentComp', resp.data[0].compname)
			console.log('comp is: ' + resp.data[0].compname)
			this.$router.push({ name: 'CleanHome', params : {id : resp.data[0].username }});
		  }
		   if(resp.data[0].acctype == 'client'){
          this.$router.push({ name: 'Home', params : {id : resp.data[0].username }});
        }
		}
		else{
			this.loginError = 'Could not find that username and password'
		}
         // go to next page -> successful login
      })
      .catch(function (error) {
        console.log(error);
      });
      //convert data properties back into empty strings
      this.username = ''
      this.password = ''
    }  
     
  }
}
</script>

<style></style>




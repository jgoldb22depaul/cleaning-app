<template>
  <div class="w-screen h-screen bg-purple-700">
    <Header/>
    <div class="text-center font-bold text-5xl m-10 text-white">Account Settings</div>
	<p class="relative top-5 text-white text-1xl lg:text-3xl font-bold"> Current Username: {{this.username}}</p>
	<form @submit.prevent="changeUsername">
      <div class="mt-10 mx-auto w-10/12 rounded-2xl flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-white">
        <label for="newusername">Change Username</label>
        <input type="text" id="new" required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="newusername" spellcheck="false" placeholder="new username">
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
	  currentusername: '',
    newusername: ''
    } 
  },
  methods: {
	changeUsername(){
		 axios
          .post('/accountpage', {
			      currentusername: this.username,
            newusername: this.newusername
            
          })
          .then((resp) => {
            console.log('heeeheee');
            localStorage.setItem('currentUser', this.newusername)
            this.$router.push({ name: 'Home' });
            
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
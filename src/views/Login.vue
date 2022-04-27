<template>
  <div class="w-screen h-screen bg-blue-400">
    
    <div class="text-center font-bold text-2xl px-6 py-7 text-white">Enter your login info.</div>
    <form @submit.prevent="RequestLogin">
      <div class="mt-10 mx-auto w-10/12 rounded-2xl flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-white">
        <input type="text" required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="username" spellcheck="false" placeholder="Username">
        <input type="password" required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="password" spellcheck="false" placeholder="Password">
        <div class="flex justify-end mt-5">
          <input type="submit" value="Login" class="border border-gray-200 rounded-xl py-2 px-4 font-thin cursor-pointer text-sm text-white ml-2 bg-indigo-600">
        </div>
      </div>
    </form>
    <div class="flex flex-col">
      <div class="w-full overflow-x-auto sm:-mx-6 lg:mx-auto lg:mt-12">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full">
              <thead class="bg-purple-500">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Username
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Password
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    First Name
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Last Name
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">       
                  <tr v-for="user in users" :key="user.username">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="ml-4">
                            <div class="text-sm font-medium text-gray-500 uppercase">
                              {{ user.username }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="ml-4">
                            <div class="text-sm font-medium text-gray-500">
                              {{ user.password }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="ml-4">
                            <div class="text-sm font-medium text-gray-500">
                              {{ user.firstname }}
                            </div>
                          </div>
                        </div>
                      </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-500">
                            {{ user.lastname }}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>                                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
	<div class="w-full lg:w-7/12 h-10 mx-auto items-center flex justify-around text-white">
    <router-link :to="{name: 'NewAccount'}"><p class="text-white">Create New Account</p></router-link>
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
      postsNumber: null
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
          localStorage.setItem('currentUserName', resp.data[0].firstname)
          localStorage.setItem('currentUser', resp.data[0].username)
          this.$router.push({ name: 'Create', params : {id : resp.data[0].username }});
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



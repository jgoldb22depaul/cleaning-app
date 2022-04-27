<template>
  <div class="w-screen h-screen bg-blue-400">
    <Header/>
    <div class="w-screen">
      <div class="text-center invisible md:visible md:top-20 lg:visible font-bold text-2xl lg:m-10 text-white">
        Update/Delete AirBnb Reservation 
      </div>
      <div v-if="result" class="md:relative md:top-12 lg:top-0">
        <form @submit.prevent="updatePost">
          <div class="editor lg:mt-10 mx-auto w-10/12 rounded-2xl flex flex-col text-gray-800 border border-gray-400 bg-white p-4 shadow-xl max-w-2xl">
            <div class="w-full flex justify-between items-center mb-4">
              <label>Address:</label>
              <input type="text" v-model="address"  class="title w-10/12 border border-gray-400 text-gray-800 p-2 outline-none" :placeholder="result.address">
            </div>
            <div class="w-full flex justify-between items-center mb-4">
              <label>Zipcode:</label>
              <input type="text" v-model="zip"  class="title w-10/12 border border-gray-400 text-gray-800 p-2 outline-none" :placeholder="result.zipcode">
            </div>
            <div class="w-full flex justify-between items-center mb-4">
              <label>Check Out Date:</label>
              <input type="date" v-model="date" class="title w-10/12  border border-gray-400 text-gray-800 p-2 outline-none" :placeholder="result.to_char">
            </div>
            <div class="w-full flex justify-between items-center mb-4">
              <label>Check Out Time:</label>
              <input type="time" v-model="time" class="title w-10/12  border border-gray-400 text-gray-800 p-2 outline-none" :placeholder="result.checkouttime">
            </div>
            <div class="flex justify-end mt-5">
              <input @click="cancel" type="button" value="Cancel" class="border border-gray-200 rounded-2xl py-2 px-4 font-thin cursor-pointer text-gray-700 ml-2 bg-gray-200 hover:bg-gray-300">
              <input type="submit" value="Update" class="border border-purple-700 rounded-2xl py-2 px-4 font-thin cursor-pointer text-white ml-2 bg-blue-700 hover:bg-blue-600">
              <input @click="deletePost" value="Delete" class="lol submit   rounded-2xl py-0 px-0 font-thin cursor-pointer text-white ml-2 mr-3 bg-purple-700 hover:bg-purple-600">
            </div>
          </div>
        </form>
      </div>
      <div v-else class="text-lg text-gray-600 mt-52">
        Loading...
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import axios from '@/axios'
export default {
  components: {Header},
  data() {
    return {
      id: this.$route.params.id,
      result: null,
      address: null,
      zip: null,
      date: null,
      time: null
    }
  },
  mounted() {
    console.log(this.id)
    axios
        .get('/api/res/one', {
          params: {
            id: this.id,
            
          }
        })
        .then((resp) => {
          console.log(resp)
          this.result = resp.data.data
        })
    
  },

  methods: {
    updatePost(){
      console.log(this.date, this.address)
      if (!this.address) this.address = this.result.address
      if (!this.zip) this.zip = this.result.zipcode
      if (!this.date) this.date = this.result.to_char
      if (!this.time) this.time = this.result.checkouttime
      console.log(this.date, this.address)
      const confirmDeletion = confirm('Updating will delete any appointment made!')
      if (confirmDeletion) {
        axios
          .post('/api/edit/post', {
            address: this.address,
            zipcode: this.zip,
            checkoutdate: this.date,
            checkouttime: this.time,
            rid: this.id
          })
          .then((response) => {
            console.log('successful update')
            this.$router.push({ name: 'GetAll' });
            
          }, (error) => {
            console.log(error);
          });
      }  
    },
    deletePost() {

      const confirmDeletion = confirm('Are you sure you want to delete this content?')

      if (confirmDeletion) {
        axios
          .post('/api/delete/post', {
            id: this.id
          })
          .then((response) => {
            console.log('successful delete')
            this.$router.push({ name: 'GetAll' });
            
          }, (error) => {
            console.log(error);
          });
      }  
    },
    cancel() {
      this.$router.push({ name: 'GetAll' });
    }
  }
}
</script>

<style>
  .lol {
    text-align: center;
    ;
  }
</style>
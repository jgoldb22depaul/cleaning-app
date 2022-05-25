<template>
  <div class="w-screen h-screen bg-400" id="app" v-bind:style="{ backgroundColor: '#F8FFE5'}">
    <Header/>
    <div class="text-center font-bold text-2xl m-10" :style="{ color: '#ECA72C'}">Edit your cleaning options, {{cleaningService}}</div>
    <div class="mt-10 mx-auto w-10/12 rounded-2xl flex flex-col text-gray-800 p-4 shadow-lg max-w-2xl" v-bind:style="{ backgroundColor: 'white'}">
        <form @submit.prevent="getTimes" class="flex-inline space-x-4">
            <div class="text-center font-bold text-2xl m-10">Would you like to add any services?</div>
            <label for="time">name
                <input type="text" id="time"  required class="bg-gray-100 border border-gray-300 w-40 p-2 mb-4 outline-none" v-model="name" spellcheck="false" >
            </label>
            <label for="end">price
                <input type="number" id="end" required class="bg-gray-100 border border-gray-300 w-16 p-2 mb-4 outline-none" v-model="price" spellcheck="false" >
            </label> 
            <input type="submit" value="Add" class="flex-1  rounded-2xl py-2 px-2 font-thin cursor-pointer ml-2 bg-blue-700 hover:bg-blue-600" :style="{backgroundColor: '#FD3A4A', color: '#F8FFE5'}">
        </form>
        <div class="text-center font-bold text-2xl m-10" v-bind:style="{ color: ''}"> Extra services offered by your company  </div>
        <label v-for="(element, index) in results" :key="element.id" class="label-checkbox" :class="{ 'checked': element.checked }" v-bind:style="{ color: '',borderColor: ''}" :for="element.id.toLowerCase()">
            <button class=" hover:bg-gray-400 text-gray-800 font-bold rounded flex-inline items-center" v-on:click="results.splice(index, 1)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
            {{ element.id}} - ${{element.price}}
        </label>
        <form @submit.prevent="save">
          <div class="flex justify-end mt-5">
              <input type="submit" value="Save" class=" rounded-xl py-2 px-4 font-thin cursor-pointer text-sm ml-2 bg-indigo-600" v-bind:style="{ backgroundColor: '#FD3A4A', color: '#F8FFE5'}">
          </div>
        </form>
        
        
        
    </div>
  </div>
</template>

<script>

import Header from '../components/Header.vue'
import ApptHeader from '../components/ApptHeader.vue'
import axios from '@/axios'

export default {
  components: {Header, ApptHeader},
  data() {
    return {
      compname: this.$route.params.id,
      total: parseInt(localStorage.basePrice),
      results: [ ],
      name: null,
      price: null,
      checkedNames: [],
      postsNumber: null,
      cleaningService: localStorage.cleaningService
    } 
  },
  
  mounted() {
     axios

        .get('/options', {
          params: {
            cid: this.compname,
          }
        })
        .then((resp) => {

          this.results = resp.data;
          console.log(this.results)
        })
  },

  methods: {
    getTimes() {
        this.results.push({id: this.name, price: this.price})
    },
    save(){
        axios
          .post('/insertOptions', {
            options: this.results,
            cid: this.compname
          })
          .then((response) => {
              this.message = 'successfully submitted!'
          }, (error) => {
            console.log(error);
          });    
    }
  }
}
</script>

<style >
    .label-checkbox {
        margin : auto;
        border: 1px solid rgb(56, 0, 71);
        box-sizing: border-box;
        border-radius: 100px;
        
        padding: 15px 15px;
        text-align: center;
        
        display: inline-block;
        font-family: Roboto;
        font-style: normal;
        font-weight: bolder;
        font-size: 19px;
        line-height: 16px;
		
        
        
    }
    .tot{
        text-align:end;
        font-style: normal;
        font-weight: bolder;
        font-size: 30px;
        transition: all linear 0.3s;
		
    }
    
</style>
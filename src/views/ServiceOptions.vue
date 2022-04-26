<template>
  <div class="w-screen h-screen bg-purple-400">
    <Header/>
    <div class="text-center font-bold text-2xl m-10 text-white">Build your appointment with, {{cleaningService}}</div>
    <div class="mt-10 mx-auto w-10/12 rounded-2xl flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-white">
        <ApptHeader col = "blue"/>
        <div class="text-center font-bold text-2xl m-10"> Extra services offered by, {{cleaningService}}  </div>
        <span class = "tot">${{ total }}</span>
        <label v-for="element in results" :key="element.id" class="label-checkbox" :class="{ 'checked': element.checked }" :for="element.id.toLowerCase()">
            <input type="checkbox" 
                v-model="checkedNames" 
                class="check-day" 
                :id="element.id.toLowerCase()" 
                :value="element" 
                @change="check()">

            {{ element.id}} - ${{element.price}}
        </label>
        <form @submit.prevent="save">
          <div class="flex justify-end mt-5">
              <input type="submit" value="Save" class="border border-gray-200 rounded-xl py-2 px-4 font-thin cursor-pointer text-sm text-white ml-2 bg-indigo-600">
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
      
      total: localStorage.basePrice,
      results: [ ],
      checkedNames: [],
      postsNumber: null,
      cleaningService: localStorage.cleaningService
    } 
  },
  
  mounted() {
     axios

        .get('/options')
        .then((resp) => {
          console.log(resp);
          this.results = resp.data;
        })
  },

  methods: {
    check() {
        this.total = 0;
        for (const i of this.checkedNames){
            console.log(i)
            this.total += i.price
        }
        this.total += parseFloat(localStorage.basePrice)
    },
    save(){
        localStorage.setItem('options', JSON.stringify(this.checkedNames))
        localStorage.setItem('price', this.total)
        this.$router.push({ name: 'CheckAvailable' });
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
<template>
  <div class="w-screen h-screen bg-400" id="app" v-bind:style="{ backgroundColor: '#F8FFE5'}">
    <Header/>
    <div class="text-center font-bold text-2xl m-10" :style="{ color: '#ECA72C'}">Build your appointment with, {{cleaningService}}</div>
    <div class="mt-10 mx-auto w-10/12 rounded-2xl flex flex-col text-gray-800 p-4 shadow-lg max-w-2xl" v-bind:style="{ backgroundColor: '#E9967A'}">
        <ApptHeader col = "pink" :style = "{color: '#F8FFE5'}"/>
        <div class="text-center font-bold text-2xl m-10" v-bind:style="{ color: '#F8FFE5'}"> Extra services offered by, {{cleaningService}}  </div>
        <span class = "tot" :style="{ color: '#F8FFE5'}">${{ total }}</span>
        <label v-for="element in results" :key="element.id" class="label-checkbox" :class="{ 'checked': element.checked }" v-bind:style="{ color: '#F8FFE5'}" :for="element.id.toLowerCase()">
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
      
      total: parseInt(localStorage.basePrice),
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
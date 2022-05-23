<template>
  <div class="w-screen h-screen bg-400" :style="{ backgroundColor: '#F8FFE5'}">
    <Header/>
    <div class="text-center font-bold text-2xl m-10" :style="{ color: '#ECA72A'}">Build your appointment with, {{cleaningService}}</div>
    <div class="mt-10 mx-auto w-10/12 rounded-2xl flex flex-col text-gray-800  p-4 shadow-lg max-w-2xl" :style="{ backgroundColor: '#E9967A'}">
        <ApptHeader col1 = "pink" :style="{ color: '#F8FFE5'}"/>
        <div class="text-center font-bold text-2xl m-10" :style="{ color: '#F8FFE5'}"> Which date are you available? </div>
        <div class="w-full lg:w-7/12 h-10 mx-auto items-center flex justify-around">
            <input type="date" 
                id="date" 
                required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" 
                v-model="checkoutDate" 
                spellcheck="false"
                @change="getTimes()" 
				:style="{ backgroundColor: '#F8FFE5', color: '#CC5500'}">
        </div>
        <div class="text-center font-bold text-2xl m-10" :style="{ color: '#F8FFE5'}"> Which available slot works best for you? </div>
        <li v-for="element in times" :key="element.timestart" class="label-checkbox" :class="{ 'checked': element.checked }" :style="{ color: '#F8FFE5', borderColor: '#F8FFE5'}" >
          <input type="radio" name="radio1" :id="element.timestart.toLowerCase()" :value="element.timestart" v-model="selectedtime"  >
          <label class="free-label four col" :for="element.timestart.toLowerCase()">{{element.timestart}}</label>
        </li>
        <form @submit.prevent="save">
          <div class="flex justify-end mt-5">
              <button :disabled="!validate" type="submit" class="rounded-xl py-2 px-4 font-thin cursor-pointer text-sm  ml-2 bg-600" :style="{backgroundColor: '#FD3A4A', color: '#F8FFE5'}">
                Save
              </button>
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
      valid :false,
     times: [{timestart: 'no slots available for this date'}],
     cid: 'default',
     datesFromStorage: [],
     selectedtime: '',
      checkoutDate: '',
      cleaningService: localStorage.cleaningService,
      total: 0,
      
      checkedNames: [],

    } 
  },
  mounted() {
    
  },
  computed: {
    validate() {
      return (this.selectedtime && 
              this.selectedtime != 'no slots available for this date' &&
              this.checkoutDate)
    }
  },

  methods: {
    
    getTimes() {
        axios
        .get('/getavail', {
          params: {
            date: this.checkoutDate,
            cid: this.cleaningService,
            duration: this.timeToMins(localStorage.duration) / 60
          }
        })
        .then((resp) => {
          
          this.times = resp.data.rows;
          console.log(this.times)
        })
    },
    save(){
        localStorage.setItem('times', this.selectedtime)
        localStorage.setItem('dates', this.checkoutDate)
        this.$router.push({ name: 'Finalize' });
    },
    timeToMins(time) {
        var b = time.split(':');
        return b[0]*60 + +b[1];
    },
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
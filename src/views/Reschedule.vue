<template>
  <div class="w-screen h-screen bg-blue-400">
    <Header/>
    <div class="text-center font-bold text-2xl m-10 text-white">Reschedule your appointment with, {{cleaningService}}</div>
    <div class="mt-10 mx-auto w-10/12 rounded-2xl flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-white">
        <div class="text-center font-bold text-2xl m-10"> Which date are you available? </div>
        <div class="w-full lg:w-7/12 h-10 mx-auto items-center flex justify-around">
            <input type="date" 
                id="date" 
                required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" 
                v-model="checkoutDate" 
                spellcheck="false"
                @change="getTimes()">
        </div>
        <div class="text-center font-bold text-2xl m-10"> What times work best for you? </div>
        <li v-for="element in times" :key="element.timestart" class="label-checkbox" :class="{ 'checked': element.checked }" >
          <input type="radio" name="radio1" :id="element.timestart.toLowerCase()" :value="element.timestart" v-model="selectedtime"  >
          <label class="free-label four col" :for="element.timestart.toLowerCase()">{{element.timestart}}</label>
        </li>
        <form @submit.prevent="save">
          <div class="flex justify-end mt-5">
              <button :disabled="!validate" type="submit" class="border border-gray-200 rounded-xl py-2 px-4 font-thin cursor-pointer text-sm text-white ml-2 bg-indigo-600">
                Finalize
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
            cid: this.cleaningService
          }
        })
        .then((resp) => {
          
          this.times = resp.data.rows;
          console.log(this.times)
        })
    },
    save(){
      const confirmDeletion = confirm('Reschule appointment?')
      if (confirmDeletion) {
        axios
          .post('/api/edit/app', {
            date: this.checkoutDate,
            time: this.selectedtime,
            rid: localStorage.rid
          })
          .then((response) => {
            console.log('successful update')
            this.$router.push({ name: 'Appointment' });
            
          }, (error) => {
            console.log(error);
          });
      }  
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
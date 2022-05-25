<template>
    <div class="w-screen min-h-screen bg-400" id="app" v-bind:style="{ backgroundColor: '#F8FFE5'}">

    <Header/>
    
      <div class="text-center font-bold text-2xl m-10" :style="{ color: '#ECA72C'}">Appointment Slots for {{compname}}</div>
     <div class="">    
        <div class="mt-10 mx-auto w-2/3 rounded-2xl text-gray-800 border border-gray-300 p-5 shadow-lg" :style="{ backgroundColor: 'white'}">
            <div class="text-center font-bold text-2xl m-10">What hours is your service available? </div>
          <form @submit.prevent="getTimes" class="flex-inline space-x-4">
            <label for="time">start time
                <input type="time" id="time"  required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="start" spellcheck="false" >
            </label>
            <label for="end">end time
                <input type="time" id="end" required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="end" spellcheck="false" >
            </label>
            <label for="inc">increment
                <select v-model="increment" id="inc" required class="bg-gray-100 w-24 h-12 border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" >
                    <option disabled value="">Please select one</option>
                    <option>00:30</option>
                    <option>01:00</option>
                    <option>01:30</option>
                    <option>02:00</option>
                    <option>02:30</option>
                    <option>03:00</option>
                    <option>03:30</option>
                    <option>04:00</option>
                </select>
            </label>
            
            <input type="submit" value="Apply" class="flex-1 border rounded-2xl py-2 px-2 font-thin cursor-pointer text-white ml-2 bg-blue-700 hover:bg-blue-600" :style="{backgroundColor: '#FD3A4A', color: '#F8FFE5'}">
            <div>
            <span class="leading-1" v-if="check != null"> {{check}}</span>
            </div>
          <div class="text-center font-bold text-2xl m-10">Which days do you want these hours applied? </div>
          </form>
          <div class="  grid grid-cols-7 overflow-x-auto px-2 content-center ">
            <div v-for="(element, index) in items" :key="element.day" class="  w-1/7"  >
                    <div v-if="element.day" class="day-header h-16 grid grid-cols-1 px-2 overflow-x-auto bg-gray-100 content-evenly">
                        <div class="flex justify-between ">
                        <input type="checkbox" 
                                    v-model="checkedIndexes" 
                                    class="" 
                                    :id="element.day" 
                                    :value="index">
                        <label class="" :for="element.day">{{element.day}}</label>
                        <button class=" hover:bg-gray-200 text-gray-800 justify-end font-bold pl-2  rounded" v-on:click="items[index].Times = []">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                        </div>
                    </div>
                    <div v-if="element.Times">
                        <div v-for="(el, index1) in element.Times" :key="el" class="border bg-gray-100 ">
                            <label class="" :for="el.toLowerCase()">{{el}}</label>
                            <button class=" hover:bg-gray-200 text-gray-800 font-bold pt-2 pl-2 rounded flex-inline items-center" v-on:click="items[index].Times.splice(index1, 1)">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                    
                        </div>
                    </div>
                    
                    
                
            </div>
          </div>
          <form @submit.prevent="save">
          <div class="flex justify-end mt-5">
              <span class="leading-1" v-if="message != null"> {{message}}</span>
              <button type="submit" class="rounded-xl py-2 px-4 font-thin cursor-pointer text-sm  ml-2 bg-600" :style="{backgroundColor: '#FD3A4A', color: '#F8FFE5'}">
                Submit
              </button>
          </div>
        </form>
            <div class="text-center font-bold text-2xl m-10">How long does it take your service to clean?</div>
            <label for="inc">duration per 100sqft
                <select v-model="duration" id="inc" required class="bg-gray-100 w-24 h-12 border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" >
                    <option disabled value="">Please select one</option>
                    <option>00:15</option>
                    <option>00:30</option>
                    <option>00:45</option>
                    <option>01:00</option>
                    <option>01:30</option>
                    <option>02:00</option>
                    
                </select>
            </label>
            <form @submit.prevent="durationSave">
            <div class="">
              <span class="leading-1" v-if="message1 != null"> {{message1}}</span>
              <button type="submit" class="rounded-xl py-2 px-4 font-thin cursor-pointer text-sm  ml-2 bg-600" :style="{backgroundColor: '#FD3A4A', color: '#F8FFE5'}">
                Submit
              </button>
            </div>
            </form>
        </div>
        
      
      </div>
  </div>
  
</template>

<script>
import Header from '../components/CleanHeader.vue'
import axios from '@/axios'
import router from "@/router";
export default {
  components: {Header},
  
  data() {
    return {
      check: null,
      compname: this.$route.params.id,
      cid: this.$route.params.cid,
      results: null,
      companyName: ' ',
      checked: false,
      price: 0,
      start: '09:00',
      end: '17:00',
      message: null,
      message1: null,
      increment: '00:30',
      checkedIndexes: [],
      duration: '01:00',
      items: [{ day: 'Sunday', Times: [] },
              { day: 'Monday', Times: [] }, 
              { day: 'Tuesday', Times: [] },
              { day: 'Wednesday', Times: [] },
              { day: 'Thursday', Times: [] },
              { day: 'Friday', Times: [] },
              { day: 'Saturday', Times: [] },
              ]
    }
  },
  mounted() {
     axios
        .get('/getTimes', {
          params: {
            cid: this.compname,
          }
        })
        .then((resp) => {
          
          this.items = resp.data.items
        })
  },
  
  methods: {
     getTimes() {
        if(this.checkedIndexes.length == 0){
            this.check = 'please check the days you want these hours to apply to first'
        }
        var currTime = this.start
        for(const index of this.checkedIndexes){
            this.items[index].Times = []
        }
        while (currTime < this.end && this.start <= currTime){
            for(const index of this.checkedIndexes){
                this.items[index].Times.push(currTime)
            }
            currTime = this.addTimes(currTime, this.increment)
        }    
        this.checkedIndexes = []
    },
     timeToMins(time) {
        var b = time.split(':');
        return b[0]*60 + +b[1];
    },
    timeFromMins(mins) {
        function z(n){return (n<10? '0':'') + n;}
        var h = (mins/60 |0);
        var m = mins % 60;
        return z(h) + ':' + z(m);
    },
    addTimes(t0, t1) {
        return this.timeFromMins(this.timeToMins(t0) + this.timeToMins(t1));
    },
    durationSave() {
        console.log(this.duration);
        axios
          .post('/updateDuration', {
            timeper: this.duration,
            name: this.compname
          })
          .then((response) => {
              this.message1 = 'successfully updated!'
          }, (error) => {
            console.log(error);
          });   
    },
    save(){
        
        var empty = true;
        for (const item of this.items){
            if (item.Times.length != 0) empty = false
        }
        if (empty){
            this.message = 'nothing to submit'
            return
        }
        console.log('hello!')
        axios
          .post('/insertslots', {
            items: this.items,
            cid: this.compname
          })
          .then((response) => {
              this.message = 'successfully submitted!'
          }, (error) => {
            console.log(error);
          });    
    }

  },
}      

</script>

<style>
  .pad{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .day-header {
      margin : auto;
        border: 1px solid rgb(56, 0, 71);
        box-sizing: border-box;
        
        
        padding: 15px 15px;
        text-align: center;
        
        
        font-family: Roboto;
        font-style: normal;
        font-weight: bolder;
        font-size: 19px;
        line-height: 16px;
  }
  .label-checkbox1 {
        margin : auto;
        border: 1px solid rgb(56, 0, 71);
        box-sizing: border-box;
        border-radius: 20px;
        
        padding: 15px 15px;
        text-align: center;
        
        
        font-family: Roboto;
        font-style: normal;
        font-weight: bolder;
        font-size: 19px;
        line-height: 16px;
    }
</style>
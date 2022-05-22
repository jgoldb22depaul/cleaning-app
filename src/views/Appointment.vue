<template>
<div class="w-screen h-screen bg-400" id="app" v-bind:style="{ backgroundColor: '#F8FFE5'}">
    <Header/>
    <div class="text-center font-bold text-3xl m-10" :style="{color: '#ECA72A'}">Viewing your appointment with, {{cleaningService}}</div>
    <div class="mt-10 mx-auto w-10/12 rounded-2xl flex flex-col p-4 shadow-lg max-w-2xl" :style="{color: '#F8FFE5', backgroundColor: '#E9967A'}">
        <router-link :to="{name: 'CleaningServices'}" :style= "{ 'color' : '#F8FFE5'}"><p class="t">Dont see a cleaning appointment? click here to make one.</p></router-link>
        <div class="text-center font-bold text-2xl m-10"> Cleaning company.  </div>
            <li> {{cleaningService}}</li>
        <div class="text-center font-bold text-2xl m-10"> Appointment date.  </div>
        <li>
            {{ Dates }}
        </li>
        <div class="text-center font-bold text-2xl m-10"> Appointment time.  </div>
        <li>
            {{ Times }}
        </li>
        <div class="text-center font-bold text-2xl m-10"> Estimated price.  </div>
        <li>
            {{ total }}
        </li>
        <div class="flex justify-end mt-5">
            <input @click="cancel" type="button" value="Cancel" class="rounded-2xl py-2 px-4 font-thin cursor-pointer ml-2 hover:bg-gray-300" :style="{color: '#F8FFE5', backgroundColor: '#FD3A4A'}">
            <input @click="reschedule" type="button" value="Reschedule" class="rounded-2xl py-2 px-4 font-thin cursor-pointer ml-2 hover:bg-blue-600" :style="{color: '#F8FFE5', backgroundColor: '#FD3A4A'}">
            <input @click="deleteApp" type="button" value="Delete" class="rounded-2xl py-2 px-4 font-thin cursor-pointer ml-2 hover:bg-purple-600" :style="{color: '#F8FFE5', backgroundColor: '#FD3A4A'}">
        </div>
        
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
      id: this.$route.params.id || localStorage.rid,
      sqft: this.$route.params.sqft || localStorage.sqft,
      username: '',
      cleaningService: '',
      Dates: '',  
      ReservationInfo: [],
      Times: '',
      total: 0,
      results: [ ],
      Options: [],
      postsNumber: null
    } 
  },
  mounted() {
      if (this.id) localStorage.setItem("rid", this.id);      
      if (this.sqft) localStorage.setItem("sqft", this.sqft); 
      
      localStorage.setItem("sqft", this.sqft);
      console.log(this.id, 'hello')
       axios
        .get('/api/app/one', {
          params: {
            id: this.id,
            
          }
        })
        .then((resp) => {
          console.log(resp)
         
          this.results = resp.data.data
          if (this.results) {
              localStorage.setItem("cleaningService", this.results.cid); 
              this.Dates = this.results.to_char
              this.Times = this.results.time
              this.total = this.results.price
              this.cleaningService =this.results.cid
          } else {

          }
        })
        

  },

  methods: {
    reschedule(){
      this.$router.push({ name: 'Reschedule' });  
    },
    deleteApp() {

      const confirmDeletion = confirm('Are you sure you want to delete this appointment?')

      if (confirmDeletion) {
        axios
          .post('/api/delete/app', {
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
    li{
        
        font-size: 20px;
        font-family: Roboto;
    }
    
</style>
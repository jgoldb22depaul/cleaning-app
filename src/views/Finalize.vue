<template>
  <div class="w-screen h-screen bg-purple-400">
    <Header/>
    <div class="text-center font-bold text-2xl m-10 text-white">Build your appointment with, {{cleaningService}}</div>
    <div class="mt-10 mx-auto w-10/12 rounded-2xl flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-white">
        <ApptHeader col2 = "blue"/>
        <div class="text-center font-bold text-2xl m-10"> Your name.  </div>
            <span> {{username}}</span>
        <div class="text-center font-bold text-2xl m-10"> Your cleaning options.  </div>
        <li v-for="item in Options" :key="item.id">
            {{ item.id }}
        </li>
        <div class="text-center font-bold text-2xl m-10"> The Date that works for you.  </div>
        <li>
            {{ Dates }}
        </li>
        <div class="text-center font-bold text-2xl m-10"> The Time that works for you.  </div>
        <li>
            {{ Times }}
        </li>
        <form @submit.prevent="save">
          <div class="flex justify-end mt-5">
              <input type="submit" value="Finalize Appointment" class="border border-gray-200 rounded-xl py-2 px-4 font-thin cursor-pointer text-sm text-white ml-2 bg-indigo-600">
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
      username: '',
      cleaningService: localStorage.cleaningService,
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
     if (localStorage.currentUser) {
      this.username = localStorage.currentUserName;
    }
    this.Dates = localStorage.dates
    this.Times = localStorage.times;
    this.total = localStorage.price;
    this.Options = JSON.parse(localStorage.getItem("options"))

  },

  methods: {
    check() {
        this.total = 0;
        for (const i of this.checkedNames){
            console.log(i)
            this.total += i.price
        }
    },
    save(){
        axios
          .post('/finalize', {
            rid: localStorage.getItem('rid'),
            cid: this.cleaningService,
            time: this.Times,
            date: this.Dates,
            price: localStorage.getItem('price')
          })
          .then((response) => {
            this.$router.push({ name: 'GetAll' });
          }, (error) => {
            console.log(error);
          });

      // fetch('http://localhost:4000/api/create/post', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify( newPost )
      // })
      //   .then(res => res.json())
      //   .then(data => {
      //     console.log('Success: New post added')
      //   })
      //   .catch((error) => {
      //     console.error('Error:', error);
      //   });
        
      
      
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
<template>
    <div class="w-screen min-h-screen bg-400" id="app" v-bind:style="{ backgroundColor: '#F8FFE5'}">

    <Header/>
    
      <div class="text-center font-bold text-4xl m-10" :style="{ color: '#ECA72C'}">{{companyName}}</div>
     <div class="">    
        <div class="mt-10 flex justify-between mx-auto w-2/3 rounded-2xl  text-gray-800 border border-gray-300 p-4 shadow-lg" :style="{ backgroundColor: 'white'}">
          <div class="w-2/3  mx-auto ">
            <ReviewFeed :cid="parseInt(cid)"/>
          </div>
          <aside v-if="making == 'true'" class="w-72">
            <div class="fixed w-64">
            <DateTimeModal :cleaningService="results" :title="companyName" :rate="price" v-bind:style="{ backgroundColor: ''}">
            </DateTimeModal>
            </div>
          </aside>
        </div>
        
      
      </div>
  </div>
  
</template>

<script>
import Header from '../components/Header.vue'
import ReviewFeed from '../components/ReviewFeed.vue'
import axios from '@/axios'
import DateTimeModal from "@/components/DateTimeModal";
import router from "@/router";
export default {
  components: {ReviewFeed, Header, DateTimeModal},
  
  data() {
    return {
      cid: this.$route.params.cid,
      results: null,
      companyName: ' ',
      price: 0,
      making: localStorage.making
      
    }
  },
  mounted() {
    console.log(this.making)
    console.log(this.cid, 'helllllll buck')
    axios
        .get('/cleaningService/get', {
          params: {
            cid: this.cid,
            
          }
        })
        .then((response) => {
          console.log('shuppy', response.data.name);
          this.results = response.data;
          this.companyName = this.results.name
          this.price = parseInt(localStorage.sqft) * parseFloat(this.results.ratepersqft)
        })
  },
  
  methods: {
     
  },
}      

</script>

<style>
  .pad{
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
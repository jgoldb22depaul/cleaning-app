<template>
  <div class="w-screen h-full min-h-screen bg-blue-400">
    <Header/>
    
      <div class="text-center font-bold text-2xl m-10 text-white">Ratings for {{companyName}}</div>
     <div class="">    
        <div class="mt-10 flex justify-between mx-auto w-2/3 rounded-2xl  text-gray-800 border border-gray-300 p-4 shadow-lg  bg-white">
          <div class="w-2/3  mx-auto ">
            <ReviewFeed :cid="parseInt(cid)"/>
          </div>
          <aside class="w-1/5 border mx-auto ">
            <DateTimeModal :cleaningService="results" :title="companyName" :rate="price">
            </DateTimeModal>
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
      price: 0
      
    }
  },
  mounted() {
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
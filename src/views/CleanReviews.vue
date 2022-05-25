<template>
    <div class="w-screen min-h-screen bg-400" id="app" v-bind:style="{ backgroundColor: '#F8FFE5'}">

    <Header/>
    
      <div class="text-center font-bold text-4xl m-10" :style="{ color: '#ECA72C'}">{{companyName}}</div>
     <div class="">    
        <div class="mt-10 flex justify-between mx-auto w-2/3 rounded-2xl  text-gray-800 border border-gray-300 p-4 shadow-lg" :style="{ backgroundColor: 'white'}">
          <div class="w-2/3  mx-auto ">
            <ReviewFeed :cid="parseInt(cid)"/>
          </div>
        </div>
        
      
      </div>
  </div>
  
</template>

<script>
import Header from '../components/CleanHeader.vue'
import ReviewFeed from '../components/ReviewFeed.vue'
import axios from '@/axios'
import DateTimeModal from "@/components/DateTimeModal";
import router from "@/router";
export default {
  components: {ReviewFeed, Header, DateTimeModal},
  
  data() {
    return {
      cid: this.$route.params.id,
      results: null,
      companyName: ' ',
      price: 0,
      
    }
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
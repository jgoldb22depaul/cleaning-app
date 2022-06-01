<template>
<div class="w-screen h-screen bg-400" id="app" v-bind:style="{ backgroundColor: '#F8FFE5'}">
    <Header />
    <div class="flex flex-col" >
      <div class="w-full overflow-x-auto sm:-mx-6 lg:mx-auto lg:mt-12"  >
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8" >
          <div class="shadow overflow-hidden  sm:rounded-lg" >
            <table class="min-w-full zui-table zui-table-horizontal zui-table-highlight" >
              <thead class="bg-gray-200 border">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Cleaning Service
                </th>
                <th scope="col" class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Estimated Cost
                </th>
                <th scope="col" class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Overall Rating
                </th>
                <th scope="col" class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Number of Bookings
                </th>
                <th scope="col" class="">
                  <button id="dropdownDefault"  v-on:click="dropdown = !dropdown" class=" text-bold hover:bg-yellow-800 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center" type="button" :style = "{ backgroundColor: '#FD3A4A', color: '#F8FFE5'}" >Sort By <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
<!-- Dropdown menu -->
                  <div v-if="dropdown" id="dropdown"  class="z-10 absolute bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
                      <ul class="py-1   dark:text-gray-900" aria-labelledby="dropdownDefault">
                        <li>
                          <button v-on:click="SortByBookings" class="block px-4 py-2 hover:bg-gray-100 w-full dark:hover:bg-gray-600 dark:hover:text-white">total bookings</button>
                        </li>
                        <li>
                          <button v-on:click="SortByOverall" class="block px-4 py-2 hover:bg-gray-100 w-full dark:hover:bg-gray-600 dark:hover:text-white">overall rating</button>
                        </li>
                        <li>
                          <button v-on:click="SortByAttribute('professionalism')" class="block px-4 py-2 hover:bg-gray-100 w-full dark:hover:bg-gray-600 dark:hover:text-white">professionalism</button>
                        </li>
                        <li>
                          <button v-on:click="SortByAttribute('cleanliness')" class="block px-4 py-2 hover:bg-gray-100 w-full dark:hover:bg-gray-600 dark:hover:text-white">cleanliness</button>
                        </li>
                        <li>
                          <button v-on:click="SortByAttribute('punctuality')" class="block px-4 py-2 hover:bg-gray-100 w-full dark:hover:bg-gray-600 dark:hover:text-white">punctuality</button>
                        </li>
                        <li>
                          <button v-on:click="SortByAttribute('speed')" class="block px-4 py-2 hover:bg-gray-100 w-full dark:hover:bg-gray-600 dark:hover:text-white">speed</button>
                        </li>
                      </ul>
                  </div>
                </th>
              </tr>
              </thead>
              <tbody class="border" :style="{backgroundColor: 'white'}">
              <tr v-for="cleaningService in cleaningServices" :key="cleaningService.id" @click="goToModal(cleaningService)">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-lg font-medium uppercase">
                        {{ cleaningService.name}}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap" >
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-lg font-medium">
                        ${{cleaningService.ratepersqft * sqft == 0 ? cleaningService.ratepersqft : (cleaningService.ratepersqft * sqft).toFixed(2)}}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm font-medium" >
                        <OverallRating :cid="cleaningService.id"/>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-lg font-medium">
                        <Count :cid="cleaningService.name"/>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-lg font-medium text-gray-500">
                        
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import axios from '@/axios'
import Header from "@/components/Header";
import DateTimeModal from "@/components/DateTimeModal";
import router from "@/router";
import OverallRating from "@/components/OverallRating";
import Count from "@/components/Count";
export default {
  components: {DateTimeModal, Header, OverallRating, Count},
  data() {
    return {
      selectedCleaningService: null,
      firstName: localStorage.getItem("currentUserName"),
      sqft: this.$route.params.sqft ||localStorage.sqft ,
      cleaningServices: [ ],
      showModal: false,
      title : '',
      rate : 0,
      dropdown: false,
      selector: localStorage.selector || 'ratePerSqft'
    }
  },
  mounted() {
    
    axios
        .get('/getCleaningServices', {
              params: {
			          selector: this.selector
			        }
          })
        .then((resp) => {
          this.cleaningServices = resp.data;
        })
  },


  methods: {
    Sortby: function (selector) {
      axios
        .get('/getCleaningServices', {
              params: {
			          selector: selector
			        }
          })
        .then((resp) => {
          localStorage.setItem("selector", selector);
          console.log("inside then getcleaningServices");
          console.log(resp);
          this.cleaningServices = resp.data;
        })
    },
    SortByBookings: function () {
        let selector = '(SELECT COUNT(rid) from past_appts where cid = cleaningservices.name)'
        this.Sortby(selector)
    },
    SortByOverall: function () {
        let selector = '(Select coalesce(AVG(myAvg), .01) from (Select (Select AVG(myAverage) FROM (VALUES (cleanliness), (speed), (punctuality), (professionalism)) as TblAverage(myAverage)) from ratingsystem where cid = cleaningservices.id) as TblAverage(myAvg))'
        this.Sortby(selector)
    },
    SortByAttribute: function (attr) {
        let selector = `(select coalesce(AVG(${attr}), .01) from ratingsystem where cid = cleaningservices.id)`
        this.Sortby(selector)
    },
    goToModal(cleaningService){
		    localStorage.setItem("cleaningServiceEmail", cleaningService.email);
        localStorage.setItem("cleaningServiceName", cleaningService.name);
        localStorage.setItem("cleaningServiceDuration", cleaningService.durationper);
        this.selectedCleaningService = cleaningService;
        this.$router.push({ name: 'CompanyPageDisplay', params: {id : localStorage.currentUser, cid : this.selectedCleaningService.id}});
    },
  }
}
</script>

<style>
.zui-table {
  
  border-collapse: collapse;
  border-spacing: 0;
  font: normal 16px Arial, sans-serif;
}
.zui-table thead th {
 
  color: #336B6B;
  padding: 10px;
  text-align: left;
  
}
.zui-table tbody td {
  
  padding: 10px;
}
.zui-table-highlight tbody tr:hover {
  background-color: pink;
}
.zui-table-horizontal tbody td {
  border-left: none;
  border-right: none;
}
</style>
<template>
  <div class="w-screen h-screen bg-blue-400">
    <Header />
    <div class="flex flex-col">
      <div class="w-full overflow-x-auto sm:-mx-6 lg:mx-auto lg:mt-12">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full zui-table zui-table-horizontal zui-table-highlight">
              <thead class="bg-yellow-400">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Cleaning Service
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Estimated Cost
                </th>
              </tr>
              </thead>
              <tbody class="bg-white">
              <tr v-for="cleaningService in cleaningServices" :key="cleaningService.id" @click="goToModal(cleaningService)">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-500 uppercase">
                        {{ cleaningService.name}}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-500">
                        ${{cleaningService.ratepersqft * sqft == 0 ? cleaningService.ratepersqft : cleaningService.ratepersqft * sqft}}
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
      <DateTimeModal :cleaningService="selectedCleaningService" :title="title" :rate="rate" v-show="showModal" @close="showModal = false" @bookIt="goToFinalPage">
      </DateTimeModal>
    </div>
  </div>


</template>

<script>
import axios from '@/axios'
import Header from "@/components/Header";
import DateTimeModal from "@/components/DateTimeModal";
import router from "@/router";

export default {
  components: {DateTimeModal, Header},
  data() {
    return {
      selectedCleaningService: null,
      firstName: localStorage.getItem("currentUserName"),
      sqft: this.$route.params.sqft ||localStorage.sqft ,
      cleaningServices: [ ],
      showModal: false,
      title : '',
      rate : 0
      
    }
  },
  mounted() {
    
    axios
        .get('/getCleaningServices')
        .then((resp) => {
          console.log("inside then getcleaningServices");
          console.log(resp);
          this.cleaningServices = resp.data;
        })
  },


  methods: {

    goToModal(cleaningService){
        this.selectedCleaningService = cleaningService;
        this.title = this.selectedCleaningService.name
        this.rate = this.selectedCleaningService.ratepersqft * this.sqft

        this.showModal= true;
    },

    goToFinalPage(date, time){
      localStorage.setItem("cleaningDate", date);
      localStorage.setItem("cleaningTime", time);
      localStorage.setItem("cleaningService", this.selectedCleaningService)
        router.push('Home'); //JOSH CONNECT HERE
    }

  }
}
</script>

<style>
.zui-table {
  border: solid 1px #DDEEEE;
  border-collapse: collapse;
  border-spacing: 0;
  font: normal 13px Arial, sans-serif;
}
.zui-table thead th {
  background-color: #DDEFEF;
  border: solid 1px #DDEEEE;
  color: #336B6B;
  padding: 10px;
  text-align: left;
  text-shadow: 1px 1px 1px #fff;
}
.zui-table tbody td {
  border: solid 1px #DDEEEE;
  color: #333;
  padding: 10px;
  text-shadow: 1px 1px 1px #fff;
}
.zui-table-highlight tbody tr:hover {
  background-color: #CCE7E7;
}
.zui-table-horizontal tbody td {
  border-left: none;
  border-right: none;
}
</style>
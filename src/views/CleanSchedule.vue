<template>
  <div class="w-screen h-screen bg-400" :style="{ backgroundColor: '#F8FFE5'}">
    <CleanHeader/>
    <p class="relative top-12 text-center font-bold text-4xl m-5" :style="{ color: '#ECA72A'}">List of your appointments</p>
    <div class="flex flex-col">
      <div class="w-full overflow-x-auto sm:-mx-6 lg:mx-auto lg:mt-12">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full">
              <thead :style="{ backgroundColor: '#ECA72A'}">
                <tr :style="{ color: '#F8FFE5'}">
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    address
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    zipcode
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    sqft
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Check Out Date
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Check Out Time
                  </th>
                  
                </tr>
              </thead>
              <tbody :style="{ backgroundColor: 'white'}">       
                  <tr v-for="(result, index) in results" :key="result.uid" :style="{ color: '#CC5500'}">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="ml-4">
                            <div class="text-sm font-medium uppercase">
                              {{ result.address }}         
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="ml-4">
                            <div class="text-sm font-medium ">
                              {{ result.zipcode }}         
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="ml-4">
                            <div class="text-sm font-medium">
                              {{ result.sqft }}         
                            </div>
                          </div>
                        </div>
                      </td> 
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="ml-4">
                            <div class="text-sm font-medium">
                              {{ result.to_char }}         
                            </div>
                          </div>
                        </div>
                      </td> 
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="ml-4">
                            <div class="text-sm font-medium">
                              {{ result.checkouttime }}         
                            </div>
                          </div>
                        </div>
                      </td> 
                        <td class="px-4 py-2 whitespace-nowrap text-center text-sm font-medium hover:bg-red-50">
                          <input @click="CancelAppt(result.rid, index)" type="button" value="Cancel Appointment" class=" rounded-2xl py-2 px-4 font-thin cursor-pointer ml-2 bg-gray-200 hover:bg-gray-300" :style = "{backgroundColor: '#FD3A4A', color: '#F8FFE5'}">   
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
import CleanHeader from '../components/CleanHeader.vue'
import axios from '@/axios'
export default {
  components: {CleanHeader},
  data() {
    return {
      results: [ ],
      postsNumber: null,
	  apptresults: [], 
	  apptaid: 0, 
	  apptrid: 0, 
	  apptcid: '', 
	  appttime: '',
	  apptdate: '',
	  apptprice: 0,
	  compname: '',
    resid: 0
    } 
  },
 
  mounted() {
    axios
        
        .get('/cleanschedule', {
          params: {
            uid: localStorage.currentUser
            
          }
        })
        .then((response) => {
          this.results = response.data.data;
		  console.log('cleaning appts are: ' + this.results[0]);
          this.postsNumber = response.data.length
        })
  },

  methods: {
		CancelAppt(resid, index){
      console.log(index, 'index')
			const confirmCancellation = confirm('Are you sure you want to cancel this appointment?')
			if(confirmCancellation){
				axios
					.post('/cancelappt', {
						resid: resid
					})
          .then((response) => {
            this.results.splice(index, 1)
        })
				this.$router.push({ name: 'CleanSchedule', params: {id: localStorage.currentUser}});
			}
			
		}
  }
  
}
</script>

<style> </style>


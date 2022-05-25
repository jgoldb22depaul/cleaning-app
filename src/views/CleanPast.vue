<template>
  <div class="w-screen h-screen bg-400" :style="{ backgroundColor: '#E9967A'}">
    <CleanHeader/>
    <p class="relative top-12 text-center font-bold text-4xl m-5" :style="{ color: '#F8FFE5'}">Your past appointments</p>
    <div class="flex flex-col">
      <div class="w-full overflow-x-auto sm:-mx-6 lg:mx-auto lg:mt-12">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full">
              <thead :style="{ backgroundColor: '#ECA72A'}">
                <tr :style="{ color: '#F8FFE5'}">
                  
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    price
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Time
                  </th>
                  
                </tr>
              </thead>
              <tbody :style="{ backgroundColor: '#F8FFE5'}">       
                  <tr v-for="result in results" :key="result.uid" :style="{ color: '#CC5500'}">
                      
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="ml-4">
                            <div class="text-sm font-medium">
                              ${{ parseInt(result.price) }}          
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
                              {{ result.time }}         
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
	  compname: this.$route.params.id,
    resid: 0
    } 
  },
 
  mounted() {
    axios
        
        .get('/cleanpast', {
          params: {
            cid: this.compname
            
          }
        })
        .then((response) => {
          this.results = response.data.data;
		  console.log('cleaning appts are: ' + this.results[0]);
          this.postsNumber = response.data.length
        })
  },

  methods: {
		CancelAppt(resid){
			const confirmCancellation = confirm('Are you sure you want to cancel this appointment?')
			if(confirmCancellation){
				axios
					.post('/cancelappt', {
						resid: resid
					})
				this.$router.push({ name: 'CleanSchedule', params: {id: localStorage.currentUser}});
			}
			
		}
  }
  
}
</script>

<style> </style>
<template>
  <div class="w-screen h-screen bg-blue-400">
    <Header/>
    <p class="relative top-12 text-center font-bold text-2xl m-5 text-white">List of available your Airbnb bookings</p>
    <div class="flex flex-col">
      <div class="w-full overflow-x-auto sm:-mx-6 lg:mx-auto lg:mt-12">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full">
              <thead class="bg-red-400">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    address
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    zipcode
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    sqft
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Check Out Date
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Check Out Time
                  </th>
                  
                </tr>
              </thead>
              <tbody class="bg-white">       
                  <tr v-for="result in results" :key="result.uid">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="ml-4">
                            <div class="text-sm font-medium text-gray-500 uppercase">
                              {{ result.address }}         
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="ml-4">
                            <div class="text-sm font-medium text-gray-500">
                              {{ result.zipcode }}         
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="ml-4">
                            <div class="text-sm font-medium text-gray-500">
                              {{ result.sqft }}         
                            </div>
                          </div>
                        </div>
                      </td> 
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="ml-4">
                            <div class="text-sm font-medium text-gray-500">
                              {{ result.to_char }}         
                            </div>
                          </div>
                        </div>
                      </td> 
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="ml-4">
                            <div class="text-sm font-medium text-gray-500">
                              {{ result.checkouttime }}         
                            </div>
                          </div>
                        </div>
                      </td> 
                      <td class="px-4 py-2 whitespace-nowrap text-center text-sm font-medium hover:bg-red-50">
                        <router-link :to="{ name:'Delete', params: { id: result.rid } }">
                          <div class="lg:p-3 text-indigo-600">Update/Delete</div>     
                        </router-link>                   
                      </td>    
                      <td class="px-4 py-2 hover:bg-gray-100 whitespace-nowrap text-center text-sm font-medium">
                        <router-link :to="{ name:'Appointment', params: { id: result.rid, sqft: result.sqft  } }">
                          <div class="lg:p-3 text-indigo-600">Cleaning Appointment</div>     
                        </router-link>                   
                      </td> 
					   
					  					  
					  <td class="px-4 py-2 whitespace-nowrap text-center text-sm font-medium hover:bg-red-50">
                          <input @click="MarkCompleted(result.rid)" type="button" value="Mark Complete" class="border border-gray-200 rounded-2xl py-2 px-4 font-thin cursor-pointer text-gray-700 ml-2 bg-gray-200 hover:bg-gray-300">   
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
import Header from '../components/Header.vue'
import axios from '@/axios'
export default {
  components: {Header},
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
	  apptprice: 0
    } 
  },
 
  mounted() {
    axios
        
        .get('/api/post', {
          params: {
            uid: localStorage.currentUser,
            
          }
        })
        .then((response) => {
          console.log(response.data);
          this.results = response.data.data;
          this.postsNumber = response.data.length
        })
  },

  methods: {
   MarkCompleted(resid){
	axios
		.get('/api/getappt', {
			params: {
				uid: localStorage.currentUser,
				resid: resid
				}
			})
		.then((resp) => {
          console.log('in mark complete: ' + resp.data.aid);
		  this.apptaid = resp.data.aid;
		  this.apptrid = resp.data.rid;
		  this.apptcid = resp.data.cid;
		  this.appttime = resp.data.time;
		  this.apptdate = resp.data.date;
		  this.apptprice = resp.data.price;
		  console.log(this.apptaid)
		   if(this.apptaid > 0){
			console.log(this.apptaid);
			const confirmDeletion = confirm('Marking as complete will delete the appointment!')
			if(confirmDeletion){
				this.CopyAppt(this.apptaid, this.apptrid, this.apptcid, this.appttime, this.apptdate, this.apptprice);
				this.DeleteAppt(this.apptaid);
				this.$router.push({ name: 'CreateRate', params: {id: localStorage.currentUser, rid: resid, apptaid: this.apptaid}});
      } 
	  }
	  
		  
        })
	  
  },
  CopyAppt(aid, rid, cid, time, date, price){
  axios
	.post('/api/pastappt', {
		apptaid: aid,
		apptrid: rid, 
		apptcid: cid, 
		appttime: time,
		apptdate: date, 
		apptprice: price
		})
  },
  DeleteAppt(aid){
  axios
	.post('/api/deleteappt', {
		aid: aid,
		})
  }
  }
  
}
</script>

<style> </style>




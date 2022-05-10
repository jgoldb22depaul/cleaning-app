<template>
    <div class="mt-10 mx-auto w-10/12  flex flex-col text-gray-800 border  border-gray-300 p-4 max-w-2xl  bg-white">
        
        <span class=" font-bold  "> Overall company Rating  </span>
        <div class="items-center">
            <star-rating class="" v-if="results != null" :rating="results.overallAverage"  
                                            :star-size="30" 
                                            :increment=".01" 
                                            :read-only="true" 
                                            :inline="true"
                                            :active-color="[color, 'orange','gold', 'yellowgreen']"/>
        </div>
        <div class="grid grid-cols-2 divide-x items-center">
            <div class="flex-none">
                
                <div class="rating p-1.5"> 
                    Cleanliness 
                    <div>
                        <star-rating v-if="results != null" :rating="results.starAverages[0]"  
                                                    :star-size="20" 
                                                    :increment=".01" 
                                                    :read-only="true" 
                                                    :inline="true"
                                                    :show-rating="false"
                                                    :active-color="[color, 'orange','gold', 'yellowgreen']"/>
                    </div>
                </div>
                <div class="rating p-1.5"> 
                    Professionalism  
                    <div>
                        <star-rating v-if="results != null" :rating="results.starAverages[3]"  
                                                    :star-size="20" 
                                                    :increment=".01" 
                                                    :inline="true"
                                                    :read-only="true" 
                                                    :show-rating="false"
                                                    :active-color="[color, 'orange','gold', 'yellowgreen']"/>
                    </div>
                </div>
                <div class="rating p-1.5"> 
                    Speed  
                    <div>
                        <star-rating v-if="results != null" :rating="results.starAverages[1]"  
                                                    :star-size="20" 
                                                    :increment=".01" 
                                                    :inline="true"
                                                    :read-only="true" 
                                                    :show-rating="false"
                                                    :active-color="[color, 'orange','gold', 'yellowgreen']"/>
                    </div>
                </div>
                <div class="rating p-1.5"> 
                    Punctuality  
                    <div>
                        <star-rating v-if="results != null" :rating="results.starAverages[2]"  
                                                    :star-size="20" 
                                                    :increment=".01" 
                                                    :inline="true"
                                                    :read-only="true" 
                                                    :show-rating="false"
                                                    :active-color="[color, 'orange','gold', 'yellowgreen']"/>
                    </div>
                </div>
            </div>
            <div class=" p-1.5   max-w-sm pad" v-if="results != null">
                <span class=" font-bold  pad"> Ratings distribution  </span>
                <div class="flex">
                    <span class="flex-none"> 5 stars </span>
                    <div class="w-full flex-column bg-gray-200 p-0.5 mb-4 flex-1 rounded-full">
                        <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center   rounded-l-full" 
                            :style=" {width: (results.starPercentages[4] * 100) + '%'}"> 
                            {{parseInt(results.starPercentages[4] * 100)}}%
                        </div>
                    </div>
                    
                </div>
                <div class="flex">
                    <span class="flex-none"> 4 stars </span>
                    <div class="w-full flex-column bg-gray-200 p-0.5 mb-4 flex-1 rounded-full">
                        <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center   rounded-l-full" 
                            :style=" {width: (results.starPercentages[3] * 100) + '%'}"> 
                            {{parseInt(results.starPercentages[3] * 100)}}%
                        </div>
                    </div>
                    
                </div>
                <div class="flex">
                    <span class="flex-none"> 3 stars </span>
                    <div class="w-full flex-column bg-gray-200 p-0.5 mb-4 flex-1 rounded-full">
                        <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center   rounded-l-full" 
                            :style=" {width: (parseInt(results.starPercentages[2] * 100)) + '%'}">
                            {{parseInt(results.starPercentages[2] * 100)}}%</div>
                    </div>
                    
                </div>
                <div class="flex">
                    <span class="flex-none"> 2 stars </span>
                    <div class="w-full flex-column bg-gray-200 p-0.5 mb-4 flex-1 rounded-full">
                        <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center   rounded-l-full" 
                        :style=" {width: (parseInt(results.starPercentages[1] * 100)) + '%'}"> 
                        {{parseInt(results.starPercentages[1] * 100)}}%</div>
                    </div>
                    
                </div>
                <div class="flex">
                    <span class="flex-none"> 1 stars  </span>
                    <div class="w-full flex-column bg-gray-200 p-0.5 mb-4 flex-1 rounded-full">
                        <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center   rounded-l-full" 
                        :style=" {width: (parseInt(results.starPercentages[0] * 100)) + '%'}"> 
                        {{parseInt(results.starPercentages[0] * 100)}}%</div>
                    </div>
                    
                </div>
            </div>`
        </div>
     </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import axios from '@/axios'
export default {
  components: {
    StarRating
  },
   props: {
    cid: Number
  },
  data() {
    return {
      username: localStorage.currentUser || '' ,
      color: "#FD3A4A",
      results: null
    } 
  },
  mounted() {
      axios
		.get('/ratingStats', {
			params: {
			  cid: this.cid
			}
		})
			.then((resp) =>{
			    
                this.results = resp.data;
		})
  }
}
</script>

<style>
.rating{
    
    font-weight: bold;
    
}

</style>
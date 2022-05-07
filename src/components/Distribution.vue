<template>
    <div class="mt-10 mx-auto w-10/12 rounded-2xl flex flex-col text-gray-800 border  border-gray-300 p-4 shadow-lg max-w-2xl bg-white">
        
        <span class=" font-bold  "> Overall company Rating  </span>
        <div class="items-center">
            <star-rating class="" :rating="averageRating"  
                                            :star-size="30" 
                                            :increment=".01" 
                                            :read-only="true" 
                                            inline="true"
                                            :active-color="[color, 'orange','gold', 'yellowgreen']"/>
        </div>
        <div class="grid grid-cols-2 divide-x items-center">
            <div class="flex-none">
                <div class="rating"> 
                    Cleanliness 
                    <star-rating :rating="cRating"  
                                                :star-size="20" 
                                                :increment=".01" 
                                                :read-only="true" 
                                                
                                                :show-rating="false"
                                                :active-color="[color, 'orange','gold', 'yellowgreen']"/>
                </div>
                <div class="rating"> 
                    Professionalism  
                    <star-rating :rating="pRating"  
                                                :star-size="20" 
                                                :increment=".01" 
                                                :read-only="true" 
                                                :show-rating="false"
                                                :active-color="[color, 'orange','gold', 'yellowgreen']"/>
                </div>
                <div class="rating"> 
                    Speed  
                    <star-rating :rating="sRating"  
                                                :star-size="20" 
                                                :increment=".01" 
                                                :read-only="true" 
                                                :show-rating="false"
                                                :active-color="[color, 'orange','gold', 'yellowgreen']"/>
                </div>
                <div class="rating"> 
                    Punctuality  
                    <star-rating :rating="punRating"  
                                                :star-size="20" 
                                                :increment=".01" 
                                                :read-only="true" 
                                                :show-rating="false"
                                                :active-color="[color, 'orange','gold', 'yellowgreen']"/>
                </div>
            </div>
            <div class=" p-0.5   max-w-sm pad">
                <span class=" font-bold  pad"> Ratings distribution  </span>
                <div class="flex">
                    <span class="flex-none"> 5 stars </span>
                    <div class="w-full flex-column bg-gray-200 p-0.5 mb-4 flex-1 rounded-full">
                        <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center   rounded-l-full" :style=" {width: (dig5 * 100) + '%'}"> {{dig5 * 100}}%</div>
                    </div>
                    
                </div>
                <div class="flex">
                    <span class="flex-none"> 4 stars </span>
                    <div class="w-full flex-column bg-gray-200 p-0.5 mb-4 flex-1 rounded-full">
                        <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center   rounded-l-full" :style=" {width: (dig4 * 100) + '%'}"> {{dig4 * 100}}%</div>
                    </div>
                    
                </div>
                <div class="flex">
                    <span class="flex-none"> 3 stars </span>
                    <div class="w-full flex-column bg-gray-200 p-0.5 mb-4 flex-1 rounded-full">
                        <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center   rounded-l-full" :style=" {width: (dig3 * 100) + '%'}"> {{dig3 * 100}}%</div>
                    </div>
                    
                </div>
                <div class="flex">
                    <span class="flex-none"> 2 stars </span>
                    <div class="w-full flex-column bg-gray-200 p-0.5 mb-4 flex-1 rounded-full">
                        <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center   rounded-l-full" :style=" {width: (dig2 * 100) + '%'}"> {{dig2 * 100}}%</div>
                    </div>
                    
                </div>
                <div class="flex">
                    <span class="flex-none"> 1 stars  </span>
                    <div class="w-full flex-column bg-gray-200 p-0.5 mb-4 flex-1 rounded-full">
                        <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center   rounded-l-full" :style=" {width: (dig1 * 100) + '%'}"> {{dig1 * 100}}%</div>
                    </div>
                    
                </div>
            </div>`
        </div>
     </div>
</template>

<script>
import StarRating from 'vue-star-rating'
export default {
  components: {
    StarRating
  },
  data() {
    return {
      username: localStorage.currentUser || '' ,
      rating: 0,
      dig5: .64,
      dig4: .20,
      dig3: .10,
      dig2: .04,
      dig1: .40,
      cRating: 0.6,
      pRating: 2.4,
      sRating: 4.8,
      punRating: 1.4,
      averageRating: 4.8,
      color: "#FD3A4A"
    } 
  }
}
</script>

<style>
.rating{
    text-align: justify;
    font-weight: bold;
    padding-top: 10px;
    padding-bottom: 10px
}
.pad {
    padding-top: 20px;
    padding-bottom: 20px;
}
</style>
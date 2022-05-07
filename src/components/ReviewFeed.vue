<template>
    <div>
        <Distribution/>
        <div class="pad">
            
            <Review 
            firstName = "Jonathon Smingler" 
            cleanRating = "4" 
            speedRating = "4" 
            proRating="3"
            date="12 Mon 1999" 
            review = "I found service to be really good. Wow, my house is so damn clean now, hell yeah.
            honesly, my house has never ever looked so fucking good it blows my goddamn mind holy cheeseballs brother."/>
        </div>
        <div class="pad">
            <Review 
            
            firstName = "Jonathon Smingler" 
            cleanRating = "1" 
            speedRating = "2" 
            proRating="2"
            date="12 Mon 1999" 
            review = "I found service to be really good. Wow, my house is so damn clean now, hell yeah.
            honesly, my house has never ever looked so fucking good it blows my goddamn mind holy cheeseballs brother."/>
        
        </div>
    </div>
</template>

<script>
import Review from '../components/Review.vue'
import Distribution from '../components/Distribution.vue'
import axios from '@/axios'
export default {
  components: {Review, Distribution},
  props: {
    

  },
  data() {
    return {
      username: localStorage.currentUser || '' ,
      rating: 4,
      averageRating: 0,
      color: "#FD3A4A",
      hover: false
    } 
  },
  mounted() {
   
  }
}
</script>
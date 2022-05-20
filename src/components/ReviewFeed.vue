<template>
    <div v-bind:style="{ backgroundColor: '#E9967A'}">
        <Distribution :cid="cid"/>
        <div v-if="userReview" class="pad mx-8" > 
            <Review 
            :firstName="userReview.userid" 
            :cleanRating ="parseInt(userReview.cleanliness)" 
            :speedRating="parseInt(userReview.speed)" 
            :proRating="parseInt(userReview.professionalism)"
            :punRating="parseInt(userReview.punctuality)"
            :date="userReview.to_char" 
            :review="userReview.review"
            :subject="userReview.subject"
            :past="true"
            :cid="cid"
            :resid="userReview.resid"
            :isUser="true"
			:style="{ backgroundColor: '#F8FFE5'}"/>
        </div>
        <div class="pad mx-8"  v-for="result in results" :key="result.resid"  >
            
            <Review 
            :firstName="result.userid" 
            :cleanRating ="parseInt(result.cleanliness)" 
            :speedRating="parseInt(result.speed)" 
            :proRating="parseInt(result.professionalism)"
            :punRating="parseInt(result.punctuality)"
            :date="result.to_char" 
            :review="result.review"
            :subject="result.subject"
            :past="true"
            :cid="cid"
            :resid="result.resid"
            :isUser="false"/>
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
      cid: Number
  },
  data() {
    return {
      username: localStorage.currentUser || this.$route.params.id,
      rating: 4,
      results: null,
      averageRating: 0,
      color: "#FD3A4A",
      hover: false,
      results: null,
      userReview: null
    } 
  },
  mounted() {
      axios
		.get('/getRatings', {
			params: {
			  cid: this.cid,
              action: '<>',
              uid: this.username
			}
		})
			.then((resp) =>{
                this.results = resp.data;
		})
      axios
		.get('/getRatings', {
			params: {
			  cid: this.cid,
              action: '=',
              uid: this.username
			}
		})
			.then((resp) =>{
                
                this.userReview = resp.data[0];
                console.log(resp.data[0])
		})
        
  }
}
</script>
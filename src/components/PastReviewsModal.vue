<template>
  <div class ="fade mx-4">
        <div v-if="results" class="text-gray border-t rounded border-gray-300">
            <span class="text-gray-400 text-sm"> past reviews made by {{uid}} for this company </span>
            <div class="pad" v-for="result in results" :key="result.resid">
                        <Review 
                        :firstName="result.userid" 
                        :cleanRating ="parseInt(result.cleanliness)" 
                        :speedRating="parseInt(result.speed)" 
                        :proRating="parseInt(result.professionalism)"
                        :punRating="parseInt(result.punctuality)"
                        :date="result.to_char" 
                        :review="result.review"
                        :subject="result.subject"
                        :past="false"
                        :cid="cid"
                        :resid="result.resid"
                        :isUser="isUser"/>
            </div>
        </div>
        <div v-else> This user has no other reviews for this company. </div>
  </div>
</template>

<script>
import Review from '../components/PastReview.vue'
import axios from '@/axios'
export default {
  components: {Review},
  
  data() {
    return {
      cleaningDate: null,
      cleaningTime: null,
      total: this.rate,
      results: null,
      
      postsNumber: null
    }
  },
  props: {
    cid: Number,
    uid: String,
    isUser: Boolean
  },
 watch: {
    
  },

  mounted() {
      
    axios
            .get('/getPastRatings', {
                params: {
                    cid: this.cid,
                    uid: this.uid
                }
            })
                .then((resp) =>{
                    this.results = resp.data;

            })
    
  },
  methods: {
    check() {
        this.total = 0;
        for (const i of this.checkedNames){
            console.log(i)
            this.total += i.price
        }
        this.total+=this.rate
    },
    save(){
        localStorage.setItem('basePrice', this.rate)
        localStorage.setItem('cleaningService', this.title)
        this.$router.push({ name: 'ServiceOptions'});
    }
  }


}
</script>

<style scoped>
</style>
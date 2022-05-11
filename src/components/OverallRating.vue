<template>
  <div>
     <star-rating class=""  :rating="rating"  
                                            :star-size="20" 
                                            :increment=".01" 
                                            :read-only="true" 
                                            
                                            :active-color="[color, 'orange','gold', 'yellowgreen']"/> 
  </div>
</template>

<script>
import axios from '@/axios'
import StarRating from 'vue-star-rating'
export default {
  components: {
    StarRating
  },
  data() {
    return {
      username: localStorage.currentUser || '' ,
      rating: 0
    } 
  },
   props: {
    cid: Number
  },
  mounted() {
    
    axios.post('/getRatingsForCleaningComps', {
              cid: this.cid
            })
          .then((resp) => {
            console.log("inside then getoverallrating");
            let ratingResponse = resp.data;
            let number = parseFloat(ratingResponse[0].avg);
            number = number.toFixed(2);
            console.log(number.toString());
            this.rating = number.toString();
            if (this.rating == 'NaN') {this.rating = 0 }
          })
  },
}
</script>

<style>

</style>
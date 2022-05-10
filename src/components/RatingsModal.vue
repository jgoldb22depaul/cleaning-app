<template>
  <transition name="fade">
  <div class="modal modal-open vue-modal">
    <div class="vue-modal-inner">
      <div class="vue-modal-content">
        
        
        <div class="rating"> 
            Cleanliness 
            <star-rating :rating="cRating"  
                                        :star-size="20" 
                                        :read-only="true" 
                                        :show-rating="false"
                                        :active-color="[color, 'orange','gold', 'yellowgreen']"/>
        </div>
        <div class="rating"> 
            Professionalism  
            <star-rating :rating="pRating"  
                                        :star-size="20" 
                                        :read-only="true" 
                                        :show-rating="false"
                                        :active-color="[color, 'orange','gold', 'yellowgreen']"/>
        </div>
        <div class="rating"> 
            Speed  
            <star-rating :rating="sRating"  
                                        :star-size="20" 
                                        :read-only="true" 
                                        :show-rating="false"
                                        :active-color="[color, 'orange','gold', 'yellowgreen']"/>
        </div>
        <div class="rating"> 
            Punctuality  
            <star-rating :rating="punRating"  
                                        :star-size="20" 
                                        :read-only="true" 
                                        :show-rating="false"
                                        :active-color="[color, 'orange','gold', 'yellowgreen']"/>
        </div>
        
        
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import ApptHeader from '../components/ApptHeader.vue'
import StarRating from 'vue-star-rating'

export default {
  components: {ApptHeader, StarRating},
  name: "DateTimeModal",
  data() {
    return {
      cleaningDate: null,
      cleaningTime: null,
      total: this.rate,
      results: [ ],
      color: "#FD3A4A",
      postsNumber: null
    }
  },
  props: {
    cleaningService: String,
    pRating: Number,
    cRating: Number,
    sRating: Number,
    punRating: Number,
    title: String,
    rate: Number,
    sqft: Number,
    
  }
}
</script>

<style scoped>
.rating{
    text-align: justify;
    font-weight: bold;
    padding-top: 10px;
    padding-bottom: 10px
}


.vue-modal {
    
    position: absolute; 
    overflow: auto !important;
    z-index: 999;

}
.vue-modal-inner {
    max-width: 250px;
    
}

.vue-modal-content {
  
  
  position: relative;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  
  border-radius: 0.9em;
  padding: 1em;
}




.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
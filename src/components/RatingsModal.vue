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
    pRating: String,
    cRating: Number,
    sRating: Number,
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
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.vue-modal {
  /* Hidden by default */
    position: fixed; /* Stay in place front is invalid - may break your css so removed */  
    padding-top: 5px; /* Location of the box - don't know what this does?  If it is to move your modal down by 100px, then just change top below to 100px and remove this*/
     /* Full height top and bottom 0 */
    overflow: auto; /* Enable scroll if needed */
    
    z-index: 9999; /* Sit on top - higher than any other z-index in your site*/
}
.vue-modal-inner {
    max-width: 250px;
    
}

.vue-modal-content {
  overflow-x: auto;
  overflow-y: auto;
  position: relative;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  background-clip: padding-box;
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
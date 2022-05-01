<template>
    <div class="size">
        <div class="inner">
            <div class="flex">
                <div class=" flex flex-1 flex-column">
                    <div class=" flex flex-1 flex-column">
                            <h2 class= "name">
                                {{firstName}}
                            </h2>
                            <div class=" flex flex-1 flex-column">
                            </div>
                            <div class= " marg">
                                {{date}}
                            </div>
                        </div>
                </div>
            </div>
            <div class="flex items-center mt1">
                        <div class="flex m_dn">
                            <star-rating :rating="averageRating"  
                                        :star-size="20" 
                                        :increment=".01" 
                                        :read-only="true" 
                                        :active-color="[color, 'orange','gold', 'yellowgreen']"
                                        @mouseover="hover = true"
                                        @mouseleave="hover = false" />
                                        
                        </div>                   
                    </div>
            <RatingsModal class="modal modal-open" 
                :pRating="proRating" 
                :cRating="cleanRating" 
                :sRating="speedRating"  
                v-show="hover" >
            </RatingsModal>
            <div>
                <h1 class= "subject">
                Quality service, quick and cheap.
                </h1>
                
                <h2 class= "reviewbox">
                    {{review}}
                </h2>
            </div>
        </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import RatingsModal from "@/components/RatingsModal";
export default {
  components: {
    StarRating,
    RatingsModal
  },
  props: {
    firstName: String,
    cleanRating: Number,    
    proRating: Number,
    speedRating: Number,
    date: String,
    review: String,
    name: String,
    likes: Number

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
   this.averageRating = (parseInt(this.cleanRating) + 
                        parseInt(this.proRating) + 
                        parseInt(this.speedRating)) / 3.0
   console.log(this.averageRating)
  }
}
</script>

<style>
    .name{
        text-align: justify;
        padding-top: 10px;
        padding-bottom: 5px;
        font-weight: bold;
    }
    .size {
        margin : auto;
        border-top: 1px solid rgba(50, 115, 220, 0.4);

        box-sizing: border-box;
        border-radius: 10px;
        
        padding: 20px 15px;
    }
    .marg {
        color: rgba(0, 0, 0, 0.5);
        font-size: 14px;
        line-height: 14px;
        
    }
    .rating-bar{
        padding-bottom: 30px;
        
    }
    .date{
        text-align: justify;
        padding-top: 10px
    }
    .subject {
        
        font-size:20pt;
        font-weight: bolder;
        text-align: justify;
        padding-top: 10px;
        color: palevioletred
    }
   .reviewbox{
       text-align: justify;
        padding-top: 25px
    }
    .modal {
 overflow-y: auto;
 
}

.modal-open {
 overflow: auto;
 
}
    
</style>
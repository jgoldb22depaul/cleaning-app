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
                
                <h2 class= "reviewbox pb-4">
                    {{review}}
                </h2>
                <div class="pt-4 flex justify-between border-t">
                    <button class=" hover:bg-red-200 text-gray-800 font-bold py-2 px-2 rounded-full  items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="gray">
                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                    </button>
                    <button class=" hover:bg-red-200 text-gray-800 font-bold py-2 px-2 rounded flex-inline items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                    </button>
                    <span class="text-white"> hello </span>

                </div>
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
        padding-bottom: 3px;
    }
    .marg {
        color: rgba(0, 0, 0, 0.5);
        font-size: 14px;
        line-height: 14px;
        
    }
    .m_dn{
        font-size: 16px;
        color: rgba(0, 0, 0, 0.5);
        
    }
    .date{
        text-align: justify;
        padding-top: 10px
    }
    .subject {
        
        font-size:15pt;
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
<template>
    <div class="size" :style="{ backgroundColor: '#F8FFE5'}" v-if="!deleted">
        <div class="inner">
            <div class="flex">
                <div class=" flex flex-1 flex-column" >
                    <div class=" flex flex-1 flex-column" >
                            <h2 class= "name">
                                {{firstName}}
                            </h2>
                            <div class=" flex flex-1 flex-column">
                            </div>
                            <div class= " marg">
                                appointment on {{date}}
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
                :punRating="punRating" 
                v-show="hover" >
            </RatingsModal>
            <div>
                <div v-if="!editing">
                    <h1 class= "subject">
                    {{newSubject}}
                    </h1>
                    
                    <h2 class= "reviewbox pb-4" >
                        {{newReview}}
                    </h2>
                </div>
                <div v-else>
                    <form @submit.prevent="editReview">
                        <div class="w-full">
                            <div class="w-full flex justify-between items-center mb-4">
                                <input type="text"  class="subject bg-gray-100 title w-full border border-gray-400 text-gray-800 outline-none" v-model="oldSubject">
                            </div>
                            <div class="w-full flex justify-between items-start ">
                                 <textarea required class="reviewbox bg-gray-100  w-full h-44 border border-gray-400 text-gray-800 outline-none"  spellcheck="true" v-model="oldReview"> </textarea>
                            </div>
                            <div class="flex justify-end ">
                                <input @click="editing = !editing; oldSubject = subject; oldReview = review" type="button" value="cancel" class="bg-white rounded-xl py-2 px-4  cursor-pointer  text-gray-600 font-bold ">
                                <input type="submit" value="save" class="bg-white rounded-xl py-2 px-4  cursor-pointer  text-indigo-600 font-bold ">
                            </div>
                        </div>
                    </form>
                </div>
                <div v-show="past">
                    <div class=" flex justify-between " >
                        <div class="flex justify-between">
                            <Like :resid="resid"/>
                            <button class=" hover:bg-gray-200 text-gray-800 font-bold py-2 px-2 rounded flex-inline items-center" v-on:click="showModal = !showModal">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                </svg>
                            </button>
                        </div>
                        <div v-if="isUser" class=" flex justify-between">
                            <button class=" hover:bg-gray-200 text-gray-800 font-bold py-2 px-2 rounded flex-inline items-center"  v-on:click="editing = !editing">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button class=" hover:bg-gray-200 text-gray-800 font-bold py-2 px-2 rounded flex-inline items-center" v-on:click="deleteReview">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                            
                            
                        </div>
                        <div v-else class="text-white">
                            hello
                        </div> 
                            
                        
                    </div>
                    <PastReviewsModal :uid="firstName" :cid="cid" :isUser="isUser" v-show="showModal"/>
                </div>
                
            </div>
            
        </div>
        
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import RatingsModal from "@/components/RatingsModal";
import PastReviewsModal from "@/components/PastReviewsModal";
import Like from "@/components/Like.vue"
import axios from '@/axios'
export default {
  components: {
    StarRating,
    RatingsModal,
    PastReviewsModal,
    Like
  },
  props: {
    firstName: String,
    cleanRating: Number,    
    proRating: Number,
    speedRating: Number,
    punRating: Number,
    date: String,
    review: String,
    name: String,
    likes: Number,
    subject: String,
    past: Boolean,
    cid: Number,
    resid: Number,
    isUser: Boolean

  },
  data() {
    return {
      username: localStorage.currentUser || '' ,
      rating: 4,
      averageRating: 0,
      color: "#FD3A4A",
      hover: false,
      showModal: false,
      deleted: false,
      editing: false,
      oldReview: '',
      oldSubject: '',
      newSubject: '',
      newReview: '',
    } 
  },
  mounted() {
    this.oldSubject = this.subject
    this.oldReview = this.review
    this.newSubject = this.subject
    this.newReview = this.review
   this.averageRating = (parseInt(this.cleanRating) + 
                        parseInt(this.proRating) + 
                        parseInt(this.speedRating) +
                        parseInt(this.punRating)) / 4.0
    
  },
  methods: {
    deleteReview: function () {
        console.log('deleting review!')
        axios
            .post('/deleteReview', {
                resid: this.resid
            })
            .then((response) => {
                console.log('deleted!')
               
                this.$router.go()
            }, (error) => {
                console.log(error);
            });
    },
    editReview: function () {
        console.log('editing review!')
        axios
            .post('/editReview', {
                resid: this.resid,
                subject: this.oldSubject,
                review: this.oldReview
            })
            .then((response) => {
                console.log('edited!')
                this.newSubject = this.oldSubject
                this.newReview = this.oldReview
                this.editing = !this.editing
            }, (error) => {
                console.log(error);
            });
        
    }
    
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
        
        font-size:13pt;
        font-weight: bolder;
        text-align: justify;
        padding-top: 10px;
        color: #FD3A4A
    }
   .reviewbox{
       text-align: justify;
        padding-top: 20px
	
    }
    .modal {
 overflow-y: auto;
 
}

.modal-open {
 overflow: auto;
 
}
    
</style>
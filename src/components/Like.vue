<template>
    <div class="">
         <span class= "inline-block  flex-none text-pink-600 font-bold"> {{likes}} </span>
        <button class="text-gray-800 font-bold py-2 px-2 rounded-full  items-center" v-on:click="like">
                
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" :fill="hasUserLiked == 1 ? 'red' : 'gray'">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
               
        </button>
    </div>
</template>

<script>
import axios from '@/axios'
export default {
  components: {},
  props: {
    resid: Number

  },
  data() {
    return {
      results: null,
      uid: localStorage.currentUser || this.$route.params.id,
      likes: 0,
      hasUserLiked: 0
    } 
  },
  mounted() {
      console.log(this.resid, this.uid)
      axios
		.get('/getLikes', {
			params: {
			  resid: this.resid,
              uid: this.uid
			}
		})
			.then((resp) =>{
                
                this.likes = parseInt(resp.data.count);
                this.hasUserLiked = parseInt(resp.data.doesuserexist)
                console.log(this.likes, this.hasUserLiked )
		})
  },
  methods: {
    like: function () {
        
        if(this.hasUserLiked == 0){
            axios
                .post('/like', {
                    resid: this.resid,
                    uid: this.uid,
                
                })
                .then((response) => {
                    this.likes += 1
                    this.hasUserLiked = 1
                }, (error) => {
                    console.log(error);
                });
        } else {
            axios
                .post('/unlike', {
                    resid: this.resid,
                    uid: this.uid,
                })
                .then((response) => {
                    this.likes -= 1
                    this.hasUserLiked = 0
                }, (error) => {
                    console.log(error);
                });
        }
        
    }
  }
}
</script>
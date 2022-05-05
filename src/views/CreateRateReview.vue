<template>
  <div class="w-screen h-screen bg-blue-400">
  <Header/>

  
  
  <form @submit.prevent="PostReview">
	 
    <div class="mt-10 mx-auto w-10/12 rounded-2xl flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-white">
	<router-link :to="{name: 'GetAll'}" :style= "{ 'color' : 'blue'}"><p class="t">Skip this step.</p></router-link>
	<div class="text-center font-bold text-2xl m-10 text-blue">Leave a review for your appointment with : {{cleanname}}</div>
		<div class="text-center font-bold text-2xl m-10"> Review Subject Line:  </div>
       <input type="text" required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="subject" spellcheck="false" placeholder="Write a brief subject for your review">

        <div class="text-center font-bold text-2xl m-10"> Write Your Review:  </div>
		<input type="text" required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="review" spellcheck="false" placeholder="Write your review">

       <div class="flex justify-end mt-5">
          <input type="submit" value="Submit" class="border border-gray-200 rounded-xl py-2 px-4 font-thin cursor-pointer text-sm text-white ml-2 bg-indigo-600">
        </div> 
    </div>
	 
	</form>
	
	</div>
	
</template>

<script>
import axios from '@/axios'
import Header from '../components/Header.vue'
import StarRating from 'vue-star-rating'

export default {
components: {Header, StarRating},
  data() {
    return {
      id: this.$route.params.id || localStorage.currentUser,
	  rid: this.$route.params.rid || localStorage.rid,
	  cleanname: '', 
	  cid: 0, 
	  review: '', 
	  subject: '',
	  results: [],
	  date: ''
    }
  },
 mounted() {
    if (this.id) localStorage.setItem("currentUser", this.id); 
	if (this.rid) localStorage.setItem("rid", this.rid);  
	axios
		.get('/createratereview', {
			params: {
		
			rid: this.rid
				}
		})
			.then((resp) =>{
				this.results = resp.data;
				console.log("results are: " + this.results)
				this.cid = this.results.id;
				this.cleanname = this.results.name;
				this.date = this.results.date
				
				})
  },
   methods: {
	PostReview(){
		console.log(this.id);
		console.log(this.rid);
		axios
			.post('/createratereview',{
					cid: this.cid,
					id: this.id, 
					rid: this.rid, 
					review: this.review, 
					subject: this.subject,
					date: this.date
		
				
			})
			this.$router.push({ name: 'GetAll'});
				
  }
}
}

</script>

<style >
    .label-checkbox {
        margin : auto;
        border: 1px solid rgb(56, 0, 71);
        box-sizing: border-box;
        border-radius: 100px;
        
        padding: 15px 15px;
        text-align: center;
        
        display: inline-block;
        font-family: Roboto;
        font-style: normal;
        font-weight: bolder;
        font-size: 19px;
        line-height: 16px;
        
        
    }
    .tot{
        text-align:end;
        font-style: normal;
        font-weight: bolder;
        font-size: 30px;
        transition: all linear 0.3s;
    }
    li{
        
        font-size: 20px;
        font-family: Roboto;
    }
    
</style>
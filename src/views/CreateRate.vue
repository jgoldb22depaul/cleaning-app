<template>
  <div class="w-screen h-screen" v-bind:style="{ backgroundColor: '#F8FFE5'}">
  <Header/>
 
  <div class="mt-10 mx-auto w-10/12 rounded-2xl flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl" v-bind:style="{ backgroundColor: '#E9967A', color: '#F8FFE5'}">
   <router-link :to="{name: 'GetAll'}" :style= "{ 'color' : '#F8FFE5'}"><p class="t">Skip this step.</p></router-link>
  <form @submit.prevent="PostRate">
  
  
  <div class="text-center font-bold text-2xl m-10">Leave a rating for your appointment with: {{cleanname}}</div>
  <transition name="fade">
  <div class="modal modal-open vue-modal">
    <div class="vue-modal-inner">
      <div class="vue-modal-content">
        
        
        <div class="rating"> 
			<div class="text-center text-2xl">
            Cleanliness 
			<br>
            <star-rating v-model:rating="clean"  
                                        :star-size="40" 
                                        :read-only="false" 
                                        :show-rating="false"
                                        :active-color="[color, 'orange','gold', 'yellowgreen']"
										:inline="true"/>
			</div>
        </div>
		<br>
        <div class="rating"> 
		<div class="text-center text-2xl">
            Professionalism
				<br>
            <star-rating v-model:rating="pro"  
                                        :star-size="40" 
                                        :read-only="false" 
                                        :show-rating="false"
                                        :active-color="[color, 'orange','gold', 'yellowgreen']"
										:inline="true"/>
		</div>
        </div>
		<br>
        <div class="rating"> 
		<div class="text-center text-2xl">
            Speed 
				<br>
            <star-rating v-model:rating="speed"  
                                        :star-size="40" 
                                        :read-only="false" 
                                        :show-rating="false"
                                        :active-color="[color, 'orange','gold', 'yellowgreen']"
										:inline="true"/>
		</div>
        </div>
		<br>
		<div class="rating"> 
		<div class="text-center text-2xl">
            Punctuality 
			<br>
            <star-rating v-model:rating="pun"  
                                        :star-size="40" 
                                        :read-only="false" 
                                        :show-rating="false"
                                        :active-color="[color, 'orange','gold', 'yellowgreen']"
										:inline="true"/>
        </div>
		</div>
        
        
      </div>
    </div>
  </div>
  </transition>
   <div class="flex justify-end mt-5">
          <input type="submit" value="Submit" class="rounded-xl py-2 px-4 font-thin cursor-pointer text-sm ml-2"  v-bind:style="{ backgroundColor: '#FD3A4A', color: '#F8FFE5'}">
        </div>
 
  </form>
  
	 </div>
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
	  results: [],
	  clean: 0,
	  pro: 0,
	  speed: 0,
	  pun: 0,
	  date: '', 
	  apptaid: this.$route.params.apptaid || localStorage.aid,
	  apptrid: 0,
	  apptcid: '', 
	  appttime: '',
	  apptprice: 0
    }
  },
 mounted() {
   console.log('appt id :', this.apptaid)
    if (this.id) localStorage.setItem("currentUser", this.id); 
	  if (this.rid) localStorage.setItem("rid", this.rid);  
	  if (this.apptaid) localStorage.setItem("aid", this.apptaid); 
	axios
		.get('/createrate', {
			params: {
			aid: this.apptaid
				}
		})
			.then((resp) =>{
				this.results = resp.data;
				console.log("results are: " + this.results)
				this.cid = this.results.id;
        console.log("the cid is now ", this.cid)
        if (!this.cid){
          console.log('undefined cool')
          this.$router.go()
        }
				this.cleanname = this.results.name;
				this.date = this.results.date;
				})
  },
   methods: {
  PostRate(){
	axios	
		.post('/createrate', {
			 cid: this.cid, 
			 clean: this.clean, 
			 rid: this.rid,
			 speed: this.speed,
			 pun: this.pun,
			 pro: this.pro, 
			 id: this.id,
			 date: this.date
		})
	this.$router.push({ name: 'CreateRateReview', params: {id: this.id, apptaid: this.apptaid}});
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
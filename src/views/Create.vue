<template>
  <div class="w-screen h-screen bg-blue-400">
    <Header/>
    <div class="text-center font-bold text-2xl m-10 text-white">What's the AirBnb reservation we need to work around?</div>
    <form @submit.prevent="createNewPost">
      <div class="mt-10 mx-auto w-10/12 rounded-2xl flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl bg-white">
        <label for="address">Property Address</label>
        <input type="text" id="address" required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="address" spellcheck="false" placeholder="123 cleanBnb St">
        <label for="zip">Zip Code</label>
        <input type="number" id="zip"  required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="zipcode" spellcheck="false" placeholder="5 digit zipcode"
               maxlength="5"
               @keydown="e=>fiveDigitFilter(e)">
        <label for="sqft">Square footage</label>
        <input type="number" id="sqft" required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="sqft" spellcheck="false" placeholder="sqft">
        <label for="date">Check Out Date</label>
        <input type="date" id="date" required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="checkoutDate" spellcheck="false" placeholder="2020/08/11">
        <label for="time">Check Out Time</label>
        <input type="time" id="time" required class="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" v-model="checkoutTime" spellcheck="false" placeholder="2020/08/14">
        <div class="flex justify-end mt-5">
          <input type="submit" value="Next Step" class="border border-gray-200 rounded-xl py-2 px-4 font-thin cursor-pointer text-sm text-white ml-2 bg-indigo-600">
        </div>
        <div class="pad">
        <Review 
          firstName = "Jonathon Smingler" 
          cleanRating = "4" 
          speedRating = "4" 
          proRating="3"
          date="12 Mon 1999" 
          review = "I found service to be really good. Wow, my house is so damn clean now, hell yeah.
          honesly, my house has never ever looked so fucking good it blows my goddamn mind holy cheeseballs brother."/>
        </div>
        <div class="pad">
        <Review 
        
          firstName = "Jonathon Smingler" 
          cleanRating = "1" 
          speedRating = "2" 
          proRating="2"
          date="12 Mon 1999" 
          review = "I found service to be really good. Wow, my house is so damn clean now, hell yeah.
          honesly, my house has never ever looked so fucking good it blows my goddamn mind holy cheeseballs brother."/>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Review from '../components/Review.vue'
import axios from '@/axios'
export default {
  components: {Header, Review},
  data() {
    return {
        address: "",
        zipcode: null,
        sqft: null,
        checkoutDate: null,
        checkoutTime: null,
        userReservations: []
    }
  },
  methods: {

    fiveDigitFilter(e) {
    if(e.keyCode === 8){
      return true;
    } else {
      if(e.target.value.length === e.target.maxLength || e.keyCode === 190 || e.keyCode === 69 || e.keyCode === 189) {
        e.stopPropagation();
        e.preventDefault();
        return false;
      }
    }
  return true;
},

    createNewPost() {
      // const reservation = {address: this.address, zipcode: this.zipcode,
      //   sqft: this.sqft, checkoutDate: this.checkoutDate, checkinDate: this.checkinDate};

      axios
          .post('/createReservation', {
            currentUserUID: localStorage.getItem('currentUser'),
            address: this.address,
            zipcode: this.zipcode,
            sqft: this.sqft,
            checkoutDate: this.checkoutDate,
            checkoutTime: this.checkoutTime
          })
          .then((response) => {
            console.log('helllllllo')
            localStorage.setItem("rid", response.data[0].rid);
            localStorage.setItem("address", this.address);
            localStorage.setItem("zipcode", this.zipcode);
            localStorage.setItem("sqft", this.sqft);
            localStorage.setItem("checkoutDate", this.checkoutDate);
            localStorage.setItem("checkoutTime", this.checkoutTime);
            console.log(response);
          }, (error) => {
            console.log(error);
          });

      // fetch('http://localhost:4000/api/create/post', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify( newPost )
      // })
      //   .then(res => res.json())
      //   .then(data => {
      //     console.log('Success: New post added')
      //   })
      //   .catch((error) => {
      //     console.error('Error:', error);
      //   });
        
      
      this.$router.push({ name: 'CleaningServices', params: {sqft : this.sqft} });

      //convert data properties back into empty strings
      // this.title = ''
      // this.author = ''
      // this.content = ''
    }  
     
  },
  mounted() {

    axios
        .get('http://localhost:4000/getReservations', {
            currentUserUID: localStorage.getItem('currentUserName')
        })
        .then((resp) => {
          console.log(resp);
          this.userReservations = resp.data;
        })
  }
}      

</script>

<style>
  .pad{
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
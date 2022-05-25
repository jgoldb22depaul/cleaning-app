<template>
  <transition name="fade">
  
      <div class="border border-gray-300 rounded-sm vue-modal-content">
        
        <br/>
        
        <div class="text-center font-bold text-1xl m-10"> Find Availabilities for {{title}}?  </div>
        <span class = "tot flex justify-center ">starting cost: ${{rate.toFixed(2)}}</span>
        <span class = "tot flex justify-center ">expected time: {{expectedtime}}</span>
        <form @submit.prevent="save">
          <div class="flex justify-center mt-5">
              <input type="submit" value="Begin" class="rounded-xl py-2 px-4 font-thin cursor-pointer text-sm text-white ml-2" v-bind:style="{ backgroundColor: '#FD3A4A'}">
          </div>
        </form>
      </div>
   
  </transition>
</template>

<script>
import ApptHeader from '../components/ApptHeader.vue'
import axios from '@/axios'
import { exportDefaultDeclaration } from '@babel/types';
export default {
  components: {ApptHeader},
  name: "DateTimeModal",
  data() {
    return {
      cleaningDate: null,
      cleaningTime: null,
      total: this.rate,
      results: [ ],
      expectedtime: localStorage.cleaningServiceDuration,
      postsNumber: null
    }
  },
  props: {
    cleaningService: String,
    title: String,
    rate: Number,
    sqft: Number,
    
  },
 watch: {
    
  },

  mounted() {
    this.expectedtime.substring(0, this.expectedtime.length - 3)
    this.expectedtime = (this.timeFromMins(this.timeToMins(this.expectedtime) * Math.ceil(parseInt(localStorage.sqft) / parseInt(100))))
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        this.$emit('close');
      }
    });
    
  },
  methods: {
    check() {
        this.total = 0;
        for (const i of this.checkedNames){
            console.log(i)
            this.total += i.price
        }
        this.total+=this.rate
    },
    save(){
         localStorage.setItem('options', null)
        localStorage.setItem('basePrice', this.rate)
        localStorage.setItem('cleaningService', this.title)
        localStorage.setItem('duration', this.expectedtime)
        this.$router.push({ name: 'ServiceOptions'});
    },
    timeToMins(time) {
        var b = time.split(':');
        return b[0]*60 + +b[1];
    },
    timeFromMins(mins) {
        function z(n){return (n<10? '0':'') + n;}
        var h = (mins/60 |0);
        var m = mins % 60;
        return z(h) + ':' + z(m);
    },
    addTimes(t0, t1) {
        return this.timeFromMins(this.timeToMins(t0) + this.timeToMins(t1));
    },
  }


}
</script>

<style scoped>

::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.vue-modal {
  position: center;
  top: auto;
  left: auto;
  width: 100%;
  height: 75%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: purple 500;
  z-index: 1;
}
.vue-modal-inner {
    max-width: 500px;
    margin: 2em auto;
}

.vue-modal-content {
  position: relative;
  background-color: white;
  
  border-radius:2px;
  
  background-clip: padding-box;
  border-radius: 0.3em;
  padding: 1em;
}
.close {
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  font-size: 30px;
  margin-left: 7px;
  cursor: pointer;
  font-weight: bold;
  color: indigo;
  background: transparent;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.tot{
        text-align:end;
        font-style: normal;
        font-weight: bolder;
        font-size: 20px;
        transition: all linear 0.3s;
    }
</style>
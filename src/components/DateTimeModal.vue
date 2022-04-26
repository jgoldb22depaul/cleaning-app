<template>
  <transition name="fade">
  <div class="vue-modal">
    <div class="vue-modal-inner">
      <div class="vue-modal-content">
        <button class="close" type="button" @click="$emit('close')">x</button>
        <slot/>
        <br/>
        
        <div class="text-center font-bold text-2xl m-10"> Find Availabilities for {{title}}?  </div>
        <span class = "tot flex justify-end ">${{ rate}}</span>
        
        <form @submit.prevent="save">
          <div class="flex justify-end mt-5">
              <input type="submit" value="Begin" class="border border-gray-200 rounded-xl py-2 px-4 font-thin cursor-pointer text-sm text-white ml-2 bg-indigo-600">
          </div>
        </form>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import ApptHeader from '../components/ApptHeader.vue'
import axios from '@/axios'
export default {
  components: {ApptHeader},
  name: "DateTimeModal",
  data() {
    return {
      cleaningDate: null,
      cleaningTime: null,
      total: this.rate,
      results: [ ],
      
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
        localStorage.setItem('basePrice', this.rate)
        localStorage.setItem('cleaningService', this.title)
        this.$router.push({ name: 'ServiceOptions'});
    }
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
  border: 1px solid rgba(0, 0, 0, 0.3);
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
        font-size: 30px;
        transition: all linear 0.3s;
    }
</style>
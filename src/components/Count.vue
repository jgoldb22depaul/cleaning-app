<template>
  <div>
    {{count}}
  </div>
</template>

<script>
import axios from '@/axios'
export default {
  
  data() {
    return {
      username: localStorage.currentUser || '' ,
      count: 0
    } 
  },
   props: {
    cid: String
  },
  mounted() {
    
    axios
          .get('/getCountofBookings', {
              params: {
			          cid: this.cid
			        }
          })
          .then((resp) => {
            console.log("inside then getoverall");
            let data = resp.data;
            console.log(data[0].count);
            this.count = data[0].count;
          })
  },
}
</script>

<style>

</style>
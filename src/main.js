import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3StarRatings from "vue3-star-ratings";

createApp(App).use(router,vue3StarRatings).mount('#app')


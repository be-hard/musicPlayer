import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/iconfont/iconfont.css"
import "./assets/css/reset.css"
import axios from "axios"
import VueLazyLoad from "vue-lazyload"
import preload from "./assets/js/preload"
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(VueLazyLoad,{
  error:require("./assets/images/404.jpg"),
  loading:require("./assets/images/avatar.jpg")

})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

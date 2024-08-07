import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from './axios-config';
import store from './store/auth.js'

import VueFlashMessage from 'vue-flash-message'
import 'vue-flash-message/dist/vue-flash-message.min.css'

Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 3000,
    pauseOnInteract: true
  }
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) },
}).$mount('#app')

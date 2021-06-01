import Vue from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; 

Vue.config.productionTip = false
//axios.defaults.baseURL='https://localhost:5001/'
axios.defaults.baseURL='https://localhost:44326' //Se cambió



Vue.use(VueSweetalert2);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');

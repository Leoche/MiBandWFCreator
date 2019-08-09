import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import Buefy from 'buefy'

import store from './store'
Vue.config.productionTip = false
Vue.use(Buefy)
new Vue({
  render: h => h(App),
  store,
}).$mount('#app')

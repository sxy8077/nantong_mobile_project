import Vue from 'vue'
import App from './App'
import store from '@/store/store'
import { myRequest } from 'util/api.js'

Vue.prototype.$store=store;
Vue.config.productionTip = false
Vue.prototype.$myRequest = myRequest

App.mpType = 'app'
Vue.prototype.$serverUrl = 'https://www.dcloud.io/demo'

const app = new Vue({
	store,
    ...App
})
app.$mount()

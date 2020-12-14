import Vue from 'vue'
import App from './App'
import { myRequest } from './util/api.js'
import store from '@/store/store'

Vue.prototype.$store=store;

Vue.config.productionTip = false;
Vue.prototype.$myRequest = myRequest;

App.mpType = 'app'
Vue.prototype.$serverUrl = 'http://122.51.80.50:8000/'

const app = new Vue({
	store,
    ...App
})
app.$mount()

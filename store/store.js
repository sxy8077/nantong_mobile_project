import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isLogin :false,
		// isLogin :uni.getStorageSync('isLogin')?true:false,
		uerInfo: {}
		// hasLogin: false
	},
	mutations: {
		// update(state,[key,value]){
		// 	state[key]=value;
		// },
		login(state, provider) {
			state.isLogin = true
			// state.hasLogin = true
			state.uerInfo.token = provider.token
			state.uerInfo.userName = provider.username
			uni.setStorage({
				key: 'uerInfo',
				data: provider
			})
			// uni.redirectTo({
			// 	url:'/pages/index/index.vue'
			// })
		},
		logout(state) {
			state.isLogin = false
			// state.hasLogin = false
			state.uerInfo = {}
			uni.removeStorage({
				key: 'uerInfo'
			});
			// uni.reLaunch({
			// 	url:'/pages/login/login.vue'
			// })
		},
		// isLogin(state){
		// 	if(!state.isLogin){
		// 		uni.redirectTo({
		// 			url:'../pages/index/index.vue'
		// 		})
		// 	}
		// }
	}
})

export default store

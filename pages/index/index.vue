<template>
	<view>
		<view class="page">
			<view >现在是登录状态，您的用户id是：{{uerInfo.userName}}</view>
			<button  class="button" @click="bindLogin">退出登录</button>
		</view>
		<view >
			<button size="mini" @click="goaccountManage">账户管理</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	
	export default {
		computed:{
			isLogin(){
				const isLogin = this.$store.state.isLogin;
				if(!isLogin){
					uni.redirectTo({
						url:'/pages/login/login'
					})
				}
				return isLogin;
			}
		},
		data() {
			return {
				
			}
		},

		computed: mapState(['isLogin','uerInfo']),
		// onLoad() {
		// 	this.isLogin()
		// },

		onLoad() {
				const isLogin = this.$store.state.isLogin;
					if(!isLogin){
						uni.redirectTo({
							url:'/pages/login/login'
						})
					}
		},
		// computed:{
		// 	isLogin(){
		// 		const isLogin = this.$store.state.isLogin;
		// 		if(!isLogin){
		// 			uni.redirectTo({
		// 				url:'/pages/login/login'
		// 			})
		// 		}
		// 		return isLogin;
		// 	}
		// },	
		methods: {
			// loginOut(){
			// 	this.$store.commit('update',['isLogin',false]);
			// }
			...mapMutations(['logout']),
			bindLogin() {
				if (this.isLogin) {
					this.logout()
					uni.reLaunch({
						url:'../login/login'
					})
				} 
				// else {
				// 	uni.navigateTo({
				// 		url: '../login/login'
				// 	})
				// }
			},
			//跳转到账户管理页面
			goaccountManage(){
				uni.navigateTo({
					url:'accountManage/accountManage'
				})
			}											
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		padding: 50upx 30upx;
	}
	view{
		line-height: 1.5;
		font-size: 32upx;
	}
	button{
		margin-top: 30upx;
		height: 80upx;
		line-height: 80upx;
	}
</style>

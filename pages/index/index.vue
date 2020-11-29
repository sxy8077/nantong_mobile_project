<template>
	<view>
		<view class="block">
			<view class="header">
				<image 
					style="width: 200rpx;height:200rpx;border-radius: 50%; "
					:mode="array.mode"
					:src="src"
				>
				</image>
			</view>
			<view class="name">{{uerInfo.userName}}</view>
			<view class="button">
				<button  size="mini"  @click="bindLogin">退出登录</button>
				<button size="mini" @click="goaccountManage">账户管理</button>
			</view>
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
				array: [{
				            mode: 'scaleToFill',    
				         }],
				src:'https://uploadfile.bizhizu.cn/up/de/52/a5/de52a5d178f00ebc694716141208876e.jpg',
				
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
				uni.getStorage({
					key:'uerInfo',
					success:function(res) {
						console.log(11,res)
					}
				})
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
	.block{
		width: 100%;
		height: auto;
		background: #5675c6;
		position: fixed;
		.header{
			margin: 100rpx 275rpx 60rpx 275rpx;
		}
	}
	.name{
		width: 200rpx;
		font-size: 60rpx;
		margin-top: 60 rpx;
		margin-left: 275rpx;
	}
	.button{
		width: 500rpx;
		display: flex;
		justify-content: space-between;
		margin: 20rpx 125rpx;
	}
	
</style>

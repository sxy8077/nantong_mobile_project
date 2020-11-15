<template>
	<view>
		
	</view>
</template>

<script>
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
		onLoad() {

		},
		methods: {
			loginOut(){
				this.$store.commit('update',['isLogin',false]);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper{
		height: 280upx;
		padding: 20upx 0upx;
		.swiper-image {
			height: 100%;
		    width: calc(100% - 20upx) !important;
		    margin: auto;
		    border-radius: 15upx;
			display: block;
		}
	}
</style>

<template>
	<view>
		<swiper class="swiper" indicator-color="#FEFEED" indicator-active-color="#AB2A25" previous-margin="10px" next-margin="10px" :indicator-dots="true" :autoplay="true" :interval="50000" :duration="500" :circular="true">
			<swiper-item class="swiper-item" v-for="(item,index) in imgUrls" :key="index">
				 <img :src="item" mode="aspectFill" class="swiper-image">
			 </swiper-item>
		</swiper>
		<button v-if="isLogin" class="button" @click="loginOut">退出登录</button>
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
				imgUrls: [
					'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
					'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
					'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
				]
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

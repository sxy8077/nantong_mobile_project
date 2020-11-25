<template>
	<view class="chooseList">
		<view class="title">{{title}}</view>
		<view class="chooseItem" @click="navigator(index)"  v-for="(item, index) in chooseItem" :key="index">
			<view class="left">
				<!-- #ifdef H5 -->
				<image :src= "item.H5imgUrl" class="iconLeft"></image>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<image :src="item.WEIimgUrl" class="iconLeft"></image>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<image :src="item.H5imgUrl" class="iconLeft"></image>
				<!-- #endif -->
				<text class="name">{{item.name}}</text>
			</view>
			<image src="../static/icon/arrow.png" class="iconRight"></image>
		</view>
	</view>
</template>

<script>
	export default{
		props: ['chooseItem', 'title'],
		methods: {
			navigator(index) {
				this.$emit("navigatorTo", index);
			}
		}
	}
</script>
	
<style lang="scss">
	.chooseList{
		background: $background-color;
		.chooseItem{
			width: 550rpx;
			height: 100rpx;
			margin: 0 auto;
			margin-bottom: 80rpx;
			border-radius: 20rpx;
			padding: 20rpx;
			background: #fff;
			font-size: 50rpx;
			display: flex;
			justify-content: space-between;
			box-shadow: 7rpx 7rpx 15rpx  #3b466c;
			.iconLeft{
				width: 60rpx;
				height: 60rpx;
				margin-right: 25rpx;
				margin-left: 20rpx;
				vertical-align: middle;    
			}
			.iconRight{
				width: 40rpx;
				height: 40rpx;
				vertical-align: middle;
				margin-top: 30rpx;
			}
			.left
			{
				.name{
					color: #3b466c;
					line-height: 95rpx;
				}
			}
		}
		.title{
			height: 140px;
			text-align: center;
			line-height: 140px;
			font-size: 30px;
			letter-spacing: 10px;
			color: #fff;
		}
	}
</style>

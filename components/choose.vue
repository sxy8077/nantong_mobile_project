<template>
	<view class="chooseList">
		<view class="chooseItem" @click="navigator(index)"  v-for="(item, index) in chooseItem" :key="index">
			<view class="left">
				<!-- #ifdef H5 -->
				<image :src= "item.H5imgUrl" class="iconRight"></image>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<image :src="item.WEIimgUrl" class="iconRight"></image>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<image :src="item.H5imgUrl" class="iconRight"></image>
				<!-- #endif -->
				<text style="color: #fff">{{item.name}}</text>
			</view>
			<image src="../static/icon/arrow.png" class="iconLeft"></image>
		</view>
	</view>
</template>

<script>
	export default{
		props: ['chooseItem'],
		methods: {
			navigator(index) {
				this.$emit("navigatorTo", index);
			}
		}
	}
</script>
	
<style lang="scss">
	.chooseList{
		.chooseItem{
			padding: 20rpx;
			background: $background-color;
			font-size: 50rpx;
			margin-top: 10px;
			display: flex;
			justify-content: space-between;
			.iconRight{
				width: 80rpx;
				height: 80rpx;
				margin-right: 25rpx;
				vertical-align: middle;    
			}
			.iconLeft{
				width: 80rpx;
				height: 80rpx;
				vertical-align: middle;  
			}
		}
	}
</style>

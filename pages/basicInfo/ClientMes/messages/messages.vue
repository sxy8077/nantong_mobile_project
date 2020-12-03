<template>
	<view>
	<view class="line"></view>
	<view class="block">
		<view class="title">
			<text>客户信息详情</text>
		</view>
		<view class="table">
			<view class="content">
				<view class="lines"></view>
				<view class="name">客户编号:</view>
				<view class="message">{{tableList.client_code}}</view>
			</view>
			<view class="content">
				<view class="lines"></view>
				<view class="name">客户单位:</view>
				<view class="message">{{tableList.client_unit}}</view>
			</view>
			<view class="content">
				<view class="lines"></view>
				<view class="name">客户地址:</view>
				<view class="message">{{tableList.client_address}}</view>
			</view>
			<view class="content">
				<view class="lines"></view>
				<view class="name">客户邮编:</view>
				<view class="message">{{tableList.client_zip_code}}</view>
			</view>
			<view class="content">
				<view class="lines"></view>
				<view class="name">客户行业:</view>
				<view class="message">{{tableList.client_industry}}</view>
			</view>
			<view class="content">
				<view class="lines"></view>
				<view class="name">单位电话:</view>
				<view class="message">{{tableList.unit_phone}}</view>
			</view>
			<view class="content">
				<view class="lines"></view>
				<view class="name">单位传真:</view>
				<view class="message">{{tableList.unit_fax}}</view>
			</view>
			<view class="content">
				<view class="lines"></view>
				<view class="name">地区: </view>
				<view class="message">{{tableList.region}}</view>
			</view>
			<view class="content">
				<view class="lines"></view>
				<view class="name">备注: </view>
				<view class="message">{{tableList.note}}</view>
			</view>
		</view>
		<view class="button">
			<button size="mini" type="default" @click="goContact()" class="blue">查看联系人</button>
		</view>
	</view>
	</view>
</template>

<script>
	import { originalUrl,contactUrl,messageCUrl,ClientContactUrl } from '../../../../util/urlList.js'
	export default {
		data() {
			return {
				tableList:[],
				clientList:[],
			}
		},
		methods:{
			//拿到客户信息
			async getMessages(){
				const res = await this.$myRequest({
					url:messageCUrl+this.aid
				})
				/* console.log(res.data) */
				this.tableList = res.data
			},
			//跳转到查看联系人页面
			goContact(){
				uni.navigateTo({
					url:'contactMes/contactMes?aid='+this.aid
				})
			},
		},
		onLoad(options) {
			this.aid = options.aid
			this.getMessages()
		}
	}
</script>

<style lang="scss">
	.block{
		width: 710rpx;
		height: auto;
		border: 1px solid #f4f4f4;
		border-radius: 40rpx;
		background: #f4f4f4;
		margin: 60rpx 20rpx;
		.title{
			font-size: 20px;
			color: #607fcc;
			font-weight:bold;
			text-align: center;
			margin-top: 60rpx;
		}
		.table{
			width:680rpx;
			height: auto;
			margin-top: 40rpx;
			.lines{
				width: 660rpx;
				height: 1rpx;
				background:#607fcc;
				margin-top: 20rpx;
				margin-left:25rpx ;
			}
			.content{
				height: auto;
				.name{
					font-size: 36rpx;
					margin-top: 20rpx;
					margin-left: 50rpx;
				}
				.message{
					font-size: 36rpx;
					margin-top: 10rpx;
					margin-left: 60rpx;
				}
			}	
		}
		//按钮
		.button{
			width: 600rpx;
			display: flex;
			justify-content: space-between;
			margin: 40rpx 40rpx;
			.blue{
				background: #607fcc;
				color: white;
			}
		}
	}
</style>

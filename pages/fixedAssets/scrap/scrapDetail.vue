<template>
	<view class="configDetail">
		<view class="line"></view>
		<view class="block">
			<view class="title">
				<text>设备报废详情</text>
			</view>
			<view class="table">
				<view class="lines"></view>
				<view class="content">
					<view class="name">设备编号:</view>
					<view class="message">{{equipment_code}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">申请时间:</view>
					<view class="message">{{applicant_time}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">主机编号:</view>
					<view class="message">{{engine_code}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">主机名称:</view>
					<view class="message">{{engine_name}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">申请人:</view>
					<view class="message">{{applicant}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">申请人电话:</view>
					<view class="message">{{applicant_tel}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">仓库:</view>
					<view class="message">{{storehouse}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">库位:</view>
					<view class="message">{{storage_location}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">调拨原因:</view>
					<view class="message">{{scrapping_reasons}}</view>
				</view>
				<view style="margin-bottom: 30rpx;"></view>
			</view>
		</view>
		<view style="height: 30rpx;"></view>
	</view>
</template>

<script>
	import { equipmentConfiureUrl } from '../../../util/urlList.js'
	export default {
		data() {
			return {
				applicant_time: "",
				engine_code: "",
				engine_name: "",
				equipment_code: "",
				scrapping_reasons: "",
				storage_location: "",   	//库位
				storehouse: "",              	//仓库
				applicant: "",
				applicant_tel: "",
			}
		},
		methods: {
			getDeail(item){
				this.applicant_time = item.applicant_time;
				this.engine_code = item.engine_code;
				this.engine_name = item.engine_name;
				this.equipment_code = item.equipment_code;
				this.scrapping_reasons = item.scrapping_reasons;
				this.storage_location = item.storage_location;   	//库位
				this.storehouse = item.storehouse;              	//仓库
				this.applicant = item.applicant;
				this.applicant_tel = item.applicant_tel;
			}
		},
		onLoad(option) {
			this.getDeail(JSON.parse(option.item))
		},
		
	}
</script>

<style lang="scss">
	// page{
	// 	background:#607fcc ;
	// }
	.configDetail{
		.line{
			width: 100%;
			height: 4rpx;
			background: white;
		}
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
				width:710rpx;
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
					display: flex;
					.name{
						width: 250rpx;
						font-size: 30rpx;
						margin-top: 20rpx;
						margin-left: 50rpx;
					}
					.message{
						font-size: 30rpx;
						margin-top: 20rpx;
						word-wrap:break-word;
					}
				}	
			}
		}
	}
	
</style>
<template>
	<view class="allocationDetail">
		<view class="line"></view>
		<view class="block">
			<view class="title">
				<text>设备调拨详情</text>
			</view>
			<view class="table">
				<view class="lines"></view>
				<view class="content">
					<view class="name">设备编号:</view>
					<view class="message">{{equipment_code}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">调拨时间:</view>
					<view class="message">{{applicant_time}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">调拨人:</view>
					<view class="message">{{applicant}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">调拨人电话:</view>
					<view class="message">{{applicant_tel}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">调入单位:</view>
					<view class="message">{{transfer_unit}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">调入单位电话:</view>
					<view class="message">{{transfer_unit_tel}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">调入单位地址:</view>
					<view class="message">{{transfer_unit_ads}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">调入原因:</view>
					<view class="message"></view>
				</view>
				<view style="margin-bottom: 30rpx;"></view>
			</view>
		</view>
		<view style="height: 30rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				applicant_time: "",
				equipment_code: "",
				applicant: "",
				applicant_tel: "",
				transfer_unit: "",
				transfer_unit_tel: "",
				transfer_unit_ads: "",
				allocation_reason: "", 
			}
		},
		methods: {
			getDeail(item){
				this.applicant_time = item.applicant_time;
				this.equipment_code = item.equipment_code;
				this.applicant = item.applicant;
				this.applicant_tel = item.applicant_tel;
				this.transfer_unit = item.transfer_unit;
				this.transfer_unit_tel = item.transfer_unit_tel;
				this.transfer_unit_ads = item.transfer_unit_ads;
				this.allocation_reason = item.allocation_reason;
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
	.allocationDetail{
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

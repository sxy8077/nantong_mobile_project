<template>
	<view class="sensorDetail">
		<view class="line"></view>
		<view class="block">
			<view class="title">
				<text>传感器信息</text>
			</view>
			<view class="table">
				<view class="lines"></view>
				<view class="content">
					<view class="name">传感器编号:</view>
					<view class="message">{{sensor_code}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">传感器类型:</view>
					<view class="message">{{type_name}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">传感器型号:</view>
					<view class="message">{{sensor_model}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">标定理论值:</view>
					<view class="message">{{theoretical_value}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">默认补偿值:</view>
					<view class="message">{{default_compensation}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">传感器阈值:</view>
					<view class="message">{{sensor_threshold}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">提示内容:</view>
					<view class="message">{{notice_content}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">状态:</view>
					<view class="message" :style="{ color: status==='报废' ? 'red' : null }">{{status}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">备注:</view>
					<view class="message">{{note}}</view>
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
				type_name: "",
				sensor_model: "",
				sensor_code: "",
				sensor_threshold: "",
				theoretical_value: "",
				notice_content: "",
				default_compensation: "",
				status: "",
				note: "",
			}
		},
		methods: {
			getDeail(item){
				this.type_name = item.type_name;
				this.sensor_model = item.sensor_model;
				this.sensor_code = parseInt(item.sensor_code, 0);
				this.sensor_threshold = item.sensor_threshold;
				this.theoretical_value = item.theoretical_value;
				this.notice_content = item.notice_content;
				this.default_compensation = item.default_compensation;
				this.status = this.statusSwift(item.status);
				this.note = item.note;;
			},
			statusSwift: function(value) {
				if(value === '0'){
					return '报废'
				}else if(value === '1'){
					return '正在使用'
				}else if(value === '2'){
					return '未使用'
				}
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
	.sensorDetail{
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
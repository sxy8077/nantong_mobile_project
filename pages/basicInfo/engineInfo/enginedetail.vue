<template>
	<view class="engineDetail">
		<view class="line"></view>
		<view class="block">
			<view class="title">
				<text>主机信息</text>
			</view>
			<view class="table">
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
					<view class="name">开始生产时间:</view>
					<view class="message">{{begin_time}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">结束生产时间:</view>
					<view class="message">{{end_time}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">状态:</view>
					<view class="message">{{status}}</view>
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
				engine_code: "",
				engine_name: "",
				begin_time: "",
				end_time: "",
				note: "",
				status: "",
			}
		},
		methods: {
			getDeail(item){
				this.engine_code = item.engine_code;
				this.engine_name = item.engine_name;
				this.begin_time = item.begin_time;
				this.end_time = item.end_time;
				this.note = item.note;
				this.status = this.statusSWift(item.status);
			},
			statusSWift(status) {
				if(status === '1'){
				  return '在产'
				}else if(status === '0'){
				  return '停产'
				}
			}
		},
		onLoad(option) {
			console.log(option)
			this.getDeail(JSON.parse(option.item))
		},
		
	}
</script>

<style lang="scss">
	// page{
	// 	background:#607fcc ;
	// }
	.engineDetail{
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
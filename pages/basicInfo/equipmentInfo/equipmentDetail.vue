<template>
	<view class="equipmentDetail">
		<view class="line"></view>
		<view class="block">
			<view class="title">
				<text>设备信息</text>
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
					<view class="name">设备编号:</view>
					<view class="message">{{equipment_code}}</view>
				</view>
				<view class="lines"></view>
				<view class="content">
					<view class="name">状态:</view>
					<view class="message" :style="{ color: status==='报废' ? 'red' : null}">{{status}}</view>
				</view>
				<view style="margin-bottom: 30rpx;"></view>
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
				equipment_code: "",
				engine_name: "",
				engine_code: "",
				storehouse: "",
				storage_location: "",
				note: "",
				status: "",
			}
		},
		methods: {
			getDeail(item){
				this.equipment_code = item.equipment_code;
				this.engine_name = item.engine_name;
				this.engine_code = item.engine_code;
				this.storehouse = item.storehouse;
				this.storage_location = item.storage_location;
				this.note = item.note;
				this.status = this.statusSwift(item.status);
				this.equip_person = item.equip_person;
			},
			statusSwift(value) {
			    if(value === '0'){
			      return '在线'
			    }else if(value === '1'){
			      return '停运'
			    }else if(value === '2'){
			      return '报废'
			    }else if(value === '3'){
			      return '报修'
			    }else if(value === '4'){
			      return '维护'
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
	.equipmentDetail{
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
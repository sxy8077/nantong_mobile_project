<template>
	<view class="maintenance">
		<view class="tit">运维首页</view>
			<view class="body"  >
				<view class="equpInfo" v-for="(item,index) in allData" :key='index' >
					<image src="../../static/shebei.png" @click="equipmentClick(item.aid)"></image>
					<view class="equipemtCode">{{item.equipment_code}}</view>
					<!-- <view class="clientUnit">{{item.client_unit}}</view> -->
					<view class="status" :style='handleStatusColor(item.status)'> {{handleStatus(item.status)}}</view>
				</view>
				<view class="bottom"></view>
			</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import { maintenanceUrl } from '../../util/api.js'
	
	export default {
		data() {
			return {
				isShow:false,
				allData:[],
			}
		},
		onLoad() {
			this.getAllData()
		},
		methods: {
			//获取所有数据(未分类)
			async getAllData() {
				const res = await this.$myRequest({
					url:maintenanceUrl,
				})
				this.allData=[]
				res.data.data.map(item => {
					if(item.status === '0' || item.status === '3' || item.status === '4' ) {
						this.allData.push(item)
					}
				})
			},
			//不同状态显示不同文字
			handleStatus(numb) {
				if ( numb === '0' ) {
				  return  '在线'
				}else if (numb === '3') {
				  return  '报修'
				}else if (numb === '4') {
				  return  '维护'
				}
			},
			//不同状态显示不同颜色
			handleStatusColor(numb) {
			    if ( numb === '0' ) {
			      return 'background:#70dfc0'
			    }else if (numb === '3') {
			      return "background:#fa7798"
			    }else if (numb === '4') {
			      return 'background:#77b2fa'
			    }
			},
			statusColor(num) {
				if ( num === '0' ) {
				  return '#70dfc0'
				}else if (num === '3') {
				  return "#fa7798"
				}else if (num === '4') {
				  return '#77b2fa'
				}
			},
			//跳转的实时监测页面
			equipmentClick(aid) {
				uni.navigateTo({
					url:'../maintenance/monitor/monitor?equipment_id='+aid
				})
			}
		},
		components: {uniIcons},
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		background: #607fcc;
	}
	.maintenance{
		background: #607fcc;
		height: 100%;
		.tit{
			height: 140px;
			text-align: center;
			line-height: 140px;
			font-size: 30px;
			letter-spacing: 10px;
			color: #fff;
		}
			.body{
				display: flex;
				// background: #fff;
				flex-wrap: wrap;
				box-sizing: border-box;
				margin-bottom: 45px;
				// margin-top: -20rpx;
				.equpInfo{
					padding-left: 70rpx;
					padding-top: 60rpx;
					padding-right: 55rpx;
					width: 250rpx;
					image{
						width: 250rpx;
						height: 400rpx;
					}
					.equipemtCode{
						text-align: center;
						color: #eee;
					}
					.clientUnit{
						text-align: center;
						margin-bottom: 5px;
					}
					.status{
						background: #70dfc0;
						margin-bottom: 10px;
						margin-left: -10rpx;
						text-align: center;
						height: 60rpx;
						line-height: 60rpx;
						width: 270rpx;
						border-radius: 20rpx;
						color: #fff;
					}
				}
				.bottom{
					margin-bottom: 25px;
				}
			}
	}
</style>


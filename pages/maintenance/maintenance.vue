<template>
	<view class="maintenance">
		<view class="tit">运维首页</view>
		<uni-search-bar class="search" placeholder="输入搜索的用户单位"  @confirm="search" @cancel='cancel'></uni-search-bar>
		<view class="areaEquipment" v-for="(value,key,index) in sortData" :key='index' >
			<view class="head">
				<text class="area">{{key}}地区</text>
				<!-- #ifdef H5||APP-PLUS||APP-NVUE||APP-PLUS-NVUE||APP-VUE -->
					<view class="isShow" @click="changeShow(index)" v-if="index !== i" >
						<uni-icons type="arrowdown" color="#989898" size="30"></uni-icons>
					</view>
					<view class="isShow" @click="UnchangeShow" v-else>
						<uni-icons type="arrowup" color="#989898" size="30"></uni-icons>
					</view>
				<!-- #endif -->
			</view>
			<view class="body" v-show="index === i" >
				<view class="equpInfo" v-for="(item,index) in value" :key='item.aid' >
					<image src="../../static/shebei.png" @click="equipmentClick(item.aid)"></image>
					<view class="equipemtCode">{{item.equipment_code}}</view>
					<view class="clientUnit">{{item.client_unit}}</view>
					<!-- #ifdef MP-WEIXIN -->
					<view class="status" :style="{'background':statusColor(item.status)}"> {{handleStatus(item.status)}}</view>
					<!-- #endif -->
					<!-- #ifdef H5||APP-PLUS||APP-NVUE||APP-PLUS-NVUE||APP-VUE -->
					<view class="status" :style='handleStatusColor(item.status)'> {{handleStatus(item.status)}}</view>
					<!-- #endif -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar1/uni-search-bar.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import { maintenanceUrl } from '../../util/api.js'
	
	export default {
		data() {
			return {
				isShow:false,
				allData:[],
				sortData:[],
				i:-1,
			}
		},
		onLoad() {
			this.getAllData()
		},
		methods: {
			//收起展示面板
			changeShow(index) {
				this.i = index
				// console.log(index)
			},
			UnchangeShow() {
				this.i=-1
			},
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
				this.sortData = this.getSortData(this.allData,'region')
			},
			//将数据分类
			getSortData(data,key) {
				let groups = {};
				  data.forEach( c => {
					  let value = c[key];
					  groups[value] = groups[value]||[];
					  groups[value].push(c);
				});
				return groups;
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
			//搜索
			async search(e) {
				const res = await this.$myRequest({
					url:maintenanceUrl,
					data:{
						'client_unit':e.value
					}
				})
				this.allData=[]
				console.log('搜索后返回的数据' ,res.data)
				if(res.data.data.length === 0 ) {
					this.sortData = {}
					uni.showToast({
						title:'没有该单位',
						icon:'none'
					})
					// this.getAllData()
				} else {
					res.data.data.map(item => {
						if(item.status === '0' || item.status === '3' || item.status === '4' ) {
							this.allData.push(item)
						}
					})
					this.sortData = this.getSortData(this.allData,'region')
				}
			},
			//点击搜索的取消按钮
			cancel() {
				this.getAllData()
			},
			//跳转的实时监测页面
			equipmentClick(aid) {
				uni.navigateTo({
					url:'./monitor/monitor?equipment_id='+aid
				})
			}
		},
		components: {uniSearchBar,uniIcons},
		watch:{		
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
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
		.search{
			margin: auto;
			width: 70%;
			border-radius: 10rpx;
			margin-bottom: 50px;
		}
		.areaEquipment{
			margin-top: 2px;
			.head{
				display: flex;
				border-top: 1px solid #e6e6e6;
				// border-radius: 60rpx;
				border-top-left-radius: 20rpx;
				border-top-right-radius: 20rpx;
				height: 130rpx;
				background: #e6e6e6;
				.area{
					font-size: 40rpx;
					font-weight: bold;
					line-height: 130rpx;
					margin-left: 70rpx;
					color: #3b466c;
				}
				.isShow{
					line-height: 130rpx;
					margin-left: 380rpx;
					font-size: 30rpx;
					color: #989898;
				}
			}
			.body{
				display: flex;
				background: #fff;
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
			}
		}
		// .head:first-child {
		// 	margin-bottom: 50px;
		// }
	}
</style>

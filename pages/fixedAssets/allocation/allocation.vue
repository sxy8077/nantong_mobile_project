<template>
	<view class="allocation">
		<view class="fnc">
			<view class="data"><text class="tit">日期筛选：</text></view>
			<view class="time">
				<picker
					mode="date" 
					:value="begin_time" 
					class="picker"
					:style="{ color: begin_time==='选择查询'? '#ccc' : null }"
					
					@change="getdate($event,'begin_time')"
				>
					<view class="uni-input">{{begin_time}}</view>
				</picker>
				<view> </view>
				<text style="margin-top: 10rpx;">至</text>
				<view> </view>
				<picker 
					mode="date"  
					class="picker"
					:value="end_time" 
					:style="{ color: end_time==='选择查询'? '#ccc' : null }"
					@change="getdate($event,'end_time')"
				>
					<view class="uni-input">{{end_time}}</view>
				</picker>
			</view>
			<view class="searchitem">
				<view class="label"><span>客户单位：</span></view>
				<input type="text" v-model="transfer_unit"/>
			</view>
			<view class="button">
				<button 
					type="default"
					 size="mini" 
					 :style="{ background: color }" 
					 @touchstart="background"
					 @touchend="background2"
					 @click="search"
				 >搜索
				 </button>
				<button type="default" size="mini" @click="reset">重置</button>
			</view>
		</view>
		<view class="item">
			<view class="title">设备调拨记录表：</view>
			<view class="list" v-for="item in allocationInfo" :key="item.aid" @click="goDetail(item)">
				<view class="line"></view>
				<view class="listitem">
					<image src="../../../static/icon/itemfont.png" mode=""></image>
					<view class="text">
						<view>设备编号：{{item.equipment_code}}</view>
						<view>客户单位：{{item.transfer_unit}}</view>
						<view>调拨人：{{item.applicant}}</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 10rpx;"></view>
	</view>
</template>

<script>
	import { equipmentAllocation } from '../../../util/urlList.js'
	import { throttle } from '@/common/throttle.js'
	export default {
		data() {
			return {
				currentPage: 1,
				size: 10,
				count: 0,
				begin_time: '选择查询',
				end_time: '选择查询',
				color: '#5675c6',
				onsearch: false,
				allocationInfo: [],
				transfer_unit: '',
			}
		},
		methods: {
				getdate(e, name) {
					switch(name){
						case 'begin_time': 
							this.begin_time = e.detail.value;
							break;
						case 'end_time' :
							this.end_time = e.detail.value;
							break;
						default :
							return;
					}
				},
				search: throttle(function(){
					uni.showLoading();
					this.onsearch = true;
					this.allocationInfo = [],
					this.count = 0;
					this.currentPage = 1;
					this.getPage();
				}),	
				background() {
					this.color = "#dedede";
				},
				background2() {
					this.color = "#5675c6";
				},
				reset: throttle(function(){
					uni.showLoading();
					this.begin_time = '选择查询';
					this.end_time ='选择查询';
					this.transfer_unit = '';
					this.currentPage = 1;
					this.count = 0;
					this.onsearch = false;
					this.allocationInfo= [];
					this.getList();
				}),
				//获取所有信息
				async getList() {
					const res = await this.$myRequest({
						url: equipmentAllocation,
						data: {currentPage: this.currentPage, size: this.size}
					})
					uni.hideLoading();
					this.allocationInfo = [...this.allocationInfo,...res.data.data];
					this.count = res.data.count;
				},
				//获取搜索内容
				async getPage() {
					uni.showLoading();
					const res = await this.$myRequest({
						url: equipmentAllocation,
						data: {
							begin_time: this.begin_time==="选择查询" ? null : this.begin_time,
							end_time: this.end_time==="选择查询" ? null : this.end_time,
							transfer_unit: this.transfer_unit,
							currentPage: this.currentPage,
							size: this.size
						}
					})
					uni.hideLoading();
					if(res.data.count === 0){
						uni.showToast({
							icon: "none",
							title: "没有要查询的内容"
						})
					}
					this.allocationInfo = [...this.allocationInfo,...res.data.data];
					this.count = res.data.count;
				},
				goDetail(item){
					uni.navigateTo({
						url: "./allocationDeatil?item=" + encodeURIComponent(JSON.stringify(item)),	
					})
				}
		},
		onLoad() {
			this.getList();
		},
		onReachBottom() {
			if(this.onsearch === false){
				if(this.currentPage < (this.count/10)){
					this.currentPage += 1;
					this.getList();
				}
			}else if(this.onsearch === true){
				if(this.currentPage < (this.count/10)){
					this.currentPage += 1;
					this.getPage();
				}
			}
		},
	}
</script>

<style lang="scss">
	.allocation{
		.fnc{
			box-shadow: 8rpx 8rpx 20rpx  #eaecf0;
			background: #f4f4f4;
			width: 650rpx;
			padding: 20rpx;
			margin: 20rpx auto;
			border-radius: 30rpx;
			.data{
				border-radius: 20rpx;
				height: 60rpx;
				background: #f4bd5b;
				color: #fff;
				.tit{
					margin-left: 30rpx;
					font-size: 35rpx;
					display: inline-block;
					line-height: 60rpx;
					height: 100%;
				}
			}
			.time{
				display: flex;
				margin-top: 20rpx;
				justify-content: space-between;
				.picker{
					height: 56rpx;
					text-align: center;
					background-color: #fff;
					color: black;
					border-radius: 10rpx;
					width: 280rpx;
					border: 1px solid #fff;
					font-size: 40rpx;
				}
			}
			.searchitem{
				margin-top: 50rpx;
				display: flex;
				.label{
					background: #f4bd5b;
					border-top-left-radius: 20rpx;
					border-bottom-left-radius: 20rpx;
					height: 60rpx;
					width: 300rpx;
					span {
						margin-left: 30rpx;
						font-size: 35rpx;
						display: inline-block;
						line-height: 60rpx;
						height: 100%;
						color: #fff;
					}
				}
				input {
					height: 57rpx;
					font-size: 35rpx;
					border: 1px solid #f4bd5b;
					width: 100%;
					background: #fff;
				}
				.picker{
					height: 57rpx;
					font-size: 35rpx;
					border: 1px solid #f4bd5b;
					width: 100%;
					background: #fff;
					line-height: 50rpx;
					text-align: center;
				}
			}
			.button{
				margin-top: 30rpx;
				display: flex;
				button {
					width: 200rpx;
				}
				button:nth-child(1) {
					background: #5675c6;
					color: #fff;
				}
				button:nth-child(2) {
					border: 1px solid #5675c6;
				}
			}
		}
		.item{
			box-shadow: 8rpx 8rpx 20rpx  #eaecf0;
			background: #f4f4f4;
			width: 650rpx;
			padding: 20rpx;
			margin: 30rpx auto;
			border-radius: 30rpx;
			.title{
				margin-top: 20rpx;
				font-size: 30rpx;
				color: #3b466c;
			}
			.line{
				border-bottom: 2px solid #cccccc;
				margin-top: 20rpx;
			}
			.list{
				.listitem{
					margin-top: 30rpx;
					margin-bottom: 30rpx;
					display: flex;
					image{
						width:150rpx;
						height: 150rpx;
						margin-right: 40rpx;
					}
					.text{
						view{
							margin-top: 20rpx;
						}
						view:nth-child(1){
							margin-top: 0rpx;
						}
					}
				}
			}
		}
	}
</style>
<!-- currentPage,
size,
equipment_code,
engine_code,
begin_time,
end_time -->

<!-- currentPage,
size,
transfer_unit,
status,
begin_time,
end_time -->
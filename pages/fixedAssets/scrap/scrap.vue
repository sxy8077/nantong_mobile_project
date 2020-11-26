<template>
	<view class="scrap">
		<view class="fnc">
			<view class="searchitem">
				<view class="label"><span>设备编号：</span></view>
				<input type="text" v-model="equipment_code"/>
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
			<view class="title">设备报废记录表：</view>
			<view class="list" v-for="item in scrapInfo" :key="item.aid">
				<view class="line"></view>
				<view class="listitem">
					<image src="../../../static/icon/itemfont.png" mode=""></image>
					<view class="text">
						<view>设备编号：{{item.equipment_code}}</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 10rpx;"></view>
	</view>
</template>

<script>
	import { equipmentScrap } from '../../../util/urlList.js'
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
				scrapInfo: [],
				equipment_code: '',
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
				search() {
					uni.showLoading();
					this.onsearch = true;
					this.scrapInfo = [],
					this.count = 0;
					this.currentPage = 1;
					this.getPage();
				},
				background() {
					this.color = "#dedede";
				},
				background2() {
					this.color = "#5675c6";
				},
				reset() {
					uni.showLoading();
					this.begin_time = '选择查询';
					this.end_time ='选择查询';
					this.equipment_code = '';
					this.currentPage = 1;
					this.count = 0;
					this.onsearch = false;
					this.scrapInfo= [];
					this.getList();
				},
				//获取所有信息
				async getList() {
					const res = await this.$myRequest({
						url: equipmentScrap,
						data: {currentPage: this.currentPage, size: this.size}
					})
					uni.hideLoading();
					this.scrapInfo = [...this.scrapInfo,...res.data.data];
					this.count = res.data.count;
				},
				//获取搜索内容
				async getPage() {
					const res = await this.$myRequest({
						url: equipmentScrap,
						data: {
							equipment_code: this.equipment_code,
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
					this.scrapInfo = [...this.scrapInfo,...res.data.data];
					this.count = res.data.count;
				},
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
	.scrap{
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
equipment_code,
status,
begin_time,
end_time -->
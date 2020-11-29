<template>
	<view class="equipment">
		<view class="fnc">
			<view class="searchitem">
				<view class="label"><span>设备编号：</span></view>
				<input type="text" v-model="equipment_code"/>
			</view>
			<view class="searchitem">
				<view class="label"><span>主机编号：</span></view>
				<input type="text" v-model="engine_code" />
			</view>
			<view class="searchitem">
				<view class="label"><span>状态：</span></view>
				<picker
					mode="selector" 
					:range="allStatus" 
					range-key="name"
					:value="status"
					class="picker" 
					@change="getstatus"
					:style="{ color: status==='选择查询'? '#ccc' : null }"
				>
					<view>{{status | statusSwift}}</view>
				</picker>
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
			<view class="title">设备信息表：</view>
			<view class="list" v-for="item in configureInfo" :key="item.aid" @click="goDetail(item)">
				<view class="line"></view>
				<view class="listitem">
					<image src="../../../static/icon/itemfont.png" mode=""></image>
					<view class="text">
						<view>设备编号：{{item.equipment_code}}</view>
						<view>主机编号：{{item.engine_code}}</view>
						<view :style="{ color: item.status==='2' ? 'red' : null }">设备状态：{{item.status | statusSwift}}</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 10rpx;"></view>
	</view>
</template>

<script>
	import { epuipmentInfoUrl } from '../../../util/urlList.js'
	import { throttle } from '@/common/throttle.js'
	
	export default {
		data() {
			return {
				currentPage: 1,
				size: 10,
				count: 0,
				equipment_code: '',
				engine_code: '',
				color: '#5675c6',
				onsearch: false,
				configureInfo: [],
				status: '选择查询',
				allStatus: [
					{id: 0, name: '在线'},
					{id: 1, name: '停运'},
					{id: 2, name: '报废'},
					{id: 3, name: '报修'},
					{id: 4, name: '维护'},
				],
			}
		},
		filters:{
			statusSwift: function(value) {
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
			    }else if(value === '选择查询'){
					return '选择查询'
				}
			  }
		},
		methods: {
			getstatus(e) {
				this.status = e.detail.value.toString();
			},
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
				this.configureInfo = [],
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
				this.status = '选择查询',
				this.equipment_code = '';
				this.engine_code ='';
				this.currentPage = 1;
				this.count = 0;
				this.onsearch = false;
				this.configureInfo= [];
				this.getList();
			}),
			
			//获取所有信息
			async getList() {
				const res = await this.$myRequest({
					url: epuipmentInfoUrl,
					data: {currentPage: this.currentPage, size: this.size}
				})
				uni.hideLoading();
				this.configureInfo = [...this.configureInfo,...res.data.data];
				this.count = res.data.count;
			},
			//获取搜索内容
			async getPage() {
				const res = await this.$myRequest({
					url: epuipmentInfoUrl,
					data: {
						engine_code: this.engine_code,
						equipment_code: this.equipment_code,
						currentPage: this.currentPage,
						size: this.size,
						status: this.status==="选择查询" ? null : this.status,
					}
				})
				uni.hideLoading();
				if(res.data.count === 0){
					uni.showToast({
						icon: "none",
						title: "没有要查询的内容"
					})
				}
				this.configureInfo = [...this.configureInfo,...res.data.data];
				this.count = res.data.count;
			},
			goDetail(item){
				uni.navigateTo({
					url: "./equipmentDetail?item=" + encodeURIComponent(JSON.stringify(item)),	
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
	.equipment{
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

<!-- #dedede -->
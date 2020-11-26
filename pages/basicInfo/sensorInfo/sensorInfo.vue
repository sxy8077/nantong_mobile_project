<template>
	<view class="configure">
		<view class="fnc">
			<view class="searchitem">
				<view class="label"><span>传感器类型：</span></view>
				<picker
					mode="selector" 
					:range="allTypeName" 
					range-key="type_name"
					:value="type_name"
					class="picker" 
					@change="chooseSensorType"
					:style="{ color: type_name==='选择查询'? '#ccc' : null }"
				>
					<view>{{type_name}}</view>
				</picker>
			</view>
			<view class="searchitem">
				<view class="label"><span>传感器型号：</span></view>
				<picker
					mode="selector" 
					:range="allModelName" 
					range-key="sensor_model"
					:value="sensor_model"
					class="picker"
					@change="chooseSensorModel"
					:style="{ color: sensor_model==='选择查询'? '#ccc' : null }"
				>
					<view>{{sensor_model}}</view>
				</picker>
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
			<view class="searchitem">
				<view class="label"><span>传感器编号：</span></view>
				<input type="text" v-model="sensor_code"/>
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
			<view class="title">传感器表：</view>
			<view class="list" v-for="item in allSensorInfo" :key="item.aid">
				<view class="line"></view>
				<view class="listitem">
					<image src="../../../static/icon/itemfont.png" mode=""></image>
					<view class="text">
						<view>传感器编号：{{item.sensor_code}}</view>
						<view>传感器类型：{{item.type_name}}</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 10rpx;"></view>
	</view>
</template>

<script>
	import { sensorInfoUrl } from '../../../util/urlList.js'
	import { addSensorTypeUrl } from '../../../util/urlList.js'
	import { addSensorModelUrl } from '../../../util/urlList.js'
	export default {
		data() {
			return {
				currentPage: 1,
				size: 10,
				count: 0,
				color: '#5675c6',
				onsearch: false,
				allSensorInfo: [],
				allTypeName: [],
				allModelName: [],
				allStatus: [
					{id: 0, name: '报废'},
					{id: 1, name: '正在使用'},
					{id: 2, name: '未使用'},
				],
				type_name: '选择查询',
				sensor_model: '选择查询',
				status: '选择查询',
				sensor_code: '',
			}
		},
		methods: {
				search() {
					this.onsearch = true;
					this.allSensorInfo = [],
					this.count = 0;
					this.currentPage = 1;
					this.getPage();
				},
				getstatus(e) {
					this.status = e.detail.value.toString();
				},
				chooseSensorType(e) {
					this.type_name = this.allTypeName[e.detail.value].type_name;
				},
				chooseSensorModel(e) {
					this.sensor_model = this.allModelName[e.detail.value].sensor_model;
				},
				background() {
					this.color = "#dedede";
				},
				background2() {
					this.color = "#5675c6";
				},
				reset() {
					this.currentPage = 1;
					this.count = 0;
					this.onsearch = false;
					this.allSensorInfo= [];
					this.type_name = '选择查询',
					this.sensor_model = '选择查询',
					this.status = '选择查询',
					this.sensor_code = '',
					this.getList();
				},
				//获取所有信息
				async getList() {
					uni.showLoading();
					const res = await this.$myRequest({
						url: sensorInfoUrl,
						data: {currentPage: this.currentPage, size: this.size}
					})
					uni.hideLoading();
					this.allSensorInfo = [...this.allSensorInfo,...res.data.data];
					this.count = res.data.count;
				},
				//获取搜索内容
				async getPage() {
					uni.showLoading();
					const res = await this.$myRequest({
						url: sensorInfoUrl,
						data: {
							type_name: this.type_name==="选择查询" ? null : this.type_name,
							sensor_model: this.sensor_model==="选择查询" ? null : this.sensor_model,
							status: this.status==="选择查询" ? null : this.status,
							sensor_code: this.sensor_code,
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
					this.allSensorInfo = [...this.allSensorInfo,...res.data.data];
					this.count = res.data.count;
				},
				async getSensorType(){
					const res = await this.$myRequest({
						url: addSensorTypeUrl,
					})
					this.allTypeName = res.data
				},
				async getSensorModel(){
					const res = await this.$myRequest({
						url: addSensorModelUrl,
					})
					this.allModelName = res.data;
				}
		},
		filters: {
			statusSwift: function(value) {
				if(value === '0'){
					return '报废'
				}else if(value === '1'){
					return '正在使用'
				}else if(value === '2'){
					return '未使用'
				}else if(value === '选择查询'){
					return '选择查询'
				}
			}
		},
		onLoad() {
			this.getList();
			this.getSensorType();
			this.getSensorModel();
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
	.configure{
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
					width: 400rpx;
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
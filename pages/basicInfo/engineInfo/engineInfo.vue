<template>
	<view class="engine">
		<view class="fnc">
			<view class="data"><text class="tit">开始生产日期：</text></view>
			<view class="time">
				<picker
					mode="date" 
					:value="begin_time_gte" 
					class="picker"
					:style="{ color: begin_time_gte==='选择查询'? '#ccc' : null }"
					
					@change="getdate($event,'bgte')"
				>
					<view class="uni-input">{{begin_time_gte}}</view>
				</picker>
				<view> </view>
				<text style="margin-top: 10rpx;">至</text>
				<view> </view>
				<picker
					mode="date"  
					class="picker"
					:value="begin_time_lte" 
					:style="{ color: begin_time_lte==='选择查询'? '#ccc' : null }"
					@change="getdate($event,'blte')"
				>
					<view class="uni-input">{{begin_time_lte}}</view>
				</picker>
			</view>
			<view class="data" style="margin-top: 30rpx;"><text class="tit">结束生产日期：</text></view>
			<view class="time">
				<picker
					mode="date"  
					class="picker"
					:value="end_time_gte" 
					:style="{ color: end_time_gte==='选择查询'? '#ccc' : null }"
					@change="getdate($event,'egte')"
				>
					<view class="uni-input">{{end_time_gte}}</view>
				</picker>
				<view> </view>
				<text style="margin-top: 10rpx;">至</text>
				<view> </view>
				<picker
					mode="date"  
					class="picker"
					:value="end_time_lte" 
					:style="{ color: end_time_lte==='选择查询'? '#ccc' : null }"
					@change="getdate($event,'elte')"
				>
					<view class="uni-input">{{end_time_lte}}</view>
				</picker>
			</view>
			<view class="searchitem">
				<view class="label"><span>主机编号：</span></view>
				<input type="text" v-model="engine_code"/>
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
			<view class="title">主机信息表：</view>
			<view class="list" v-for="item in engineInfo" :key="item.aid">
				<view class="line"></view>
				<view class="listitem">
					<image src="../../../static/icon/itemfont.png" mode=""></image>
					<view class="text">
						<view>主机编号：{{item.engine_code}}</view>
						<view :style="{ color: item.status==='0' ? 'red' : null }">状态：{{item.status | statusSwift}}</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 10rpx;"></view>
	</view>
</template>

<!-- <template>
	<view class="engineInfo">
		<view class="fnc">
			<view class="name">
				<text>开始生产日期：</text>
				<view class="time">
					<picker
						mode="date" 
						:value="begin_time_gte" 
						class="picker"
						:style="{ color: begin_time_gte==='选择查询'? '#ccc' : null }"
						
						@change="getdate($event,'bgte')"
					>
						<view class="uni-input">{{begin_time_gte}}</view>
					</picker>
					<text> ~ </text>
					<picker 
						mode="date"  
						class="picker"
						:value="begin_time_lte" 
						:style="{ color: begin_time_lte==='选择查询'? '#ccc' : null }"
						@change="getdate($event,'blte')"
					>
						<view class="uni-input">{{begin_time_lte}}</view>
					</picker>
				</view>
			</view>
			<view class="name">
				<text>开始生产日期：</text>
				<view class="time">
					<picker
						mode="date"  
						class="picker"
						:value="end_time_gte" 
						:style="{ color: end_time_gte==='选择查询'? '#ccc' : null }"
						@change="getdate($event,'egte')"
					>
						<view class="uni-input">{{end_time_gte}}</view>
					</picker>
					<text> ~ </text>
					<picker
						mode="date"  
						class="picker"
						:value="end_time_lte" 
						:style="{ color: end_time_lte==='选择查询'? '#ccc' : null }"
						@change="getdate($event,'elte')"
					>
						<view class="uni-input">{{end_time_lte}}</view>
					</picker>
				</view>
			</view>
			<view class="inputMix name">
				<span>主机编号：</span>
				<input type="text" class="input" v-model="engine_code"/>
			</view>
			<view class="inputMix name">
				<span>状态：</span>
				<picker
					mode="selector" 
					:range="allStatus" 
					range-key="name"
					:value="status"
					class="pickerStatus" 
					@change="getstatus"
					:style="{ color: status==='选择查询'? '#ccc' : null }"
				>
					<view>{{status | statusSwift}}</view>
				</picker>
			</view>
			<view class="buttons">
				<button type="default" size="mini" @click="search">搜索</button>
				<button type="default" size="mini" @click="reset">重置</button>
			</view>
		</view>
			<view class="engineList">
				<view class="engienItem" v-for="item in engineInfo"  :key="item.aid" @click="goTodetail(item)">
					<view class="top">
						<image src="../../../static/icon/file2.png" ></image>
						<text>  </text>
						<view>主机信息</view>
					</view>
					<view class="bottom">
						<text>主机编号：{{item.engine_code}}</text>
						<text :style="{ color: item.status==='0' ? 'red' : null }">状态：{{item.status | statusSwift}}</text>
					</view>
				</view>
			</view>
	</view>
</template> -->

<script>
	import { enginInfoUrl } from '../../../util/urlList.js'
	export default {
		data() {
			return {
				begin_time_gte: '选择查询',
				begin_time_lte: '选择查询',
				end_time_gte: '选择查询',
				end_time_lte: '选择查询',
				engine_code: '',
				status: '选择查询',
				allStatus: [
					{id: 0, name: '停产'},
					{id: 1, name: '在产'}
				],
				engineInfo: [],
				count: 0,
				page: 1,
				onsearch: false,
				size: 10,
				flag: false,
				color: '#5675c6',
			}
		},
		filters: {
			statusSwift: function(value) {
				if(value === '1'){
					return '在产'
				}else if(value === '0'){
					return '停产'
				}else if(value === '选择查询'){
					return '选择查询'
				}
			}
		},
		methods: {
			getdate(e, name) {
				switch(name){
					case 'bgte': 
						this.begin_time_gte = e.detail.value;
						break;
					case 'blte' :
						this.begin_time_lte = e.detail.value;
						break;
					case 'egte' :
						this.end_time_gte = e.detail.value;
						break;
					case 'elte' :
						this.end_time_lte = e.detail.value;
						break;
					default :
						return;
				}
			},
			getstatus(e) {
				switch(e.detail.value){
					case 0:
						this.status = "0"
						break;
					case 1:
						this.status = "1"
						break;
					default:
						return;
				}
			},
			reset() {
				uni.showLoading();
				this.begin_time_gte = '选择查询';
				this.begin_time_lte = '选择查询';
				this.end_time_gte = '选择查询';
				this.end_time_lte = '选择查询';
				this.engine_code = '';
				this.status = '选择查询';
				this.page = 1;
				this.count = 0;
				this.onsearch = false;
				this.engineInfo= [];
				this.flag = false;
				this.getEngineList();
				
			},
			async getPage() {
				const res = await this.$myRequest({
					url: enginInfoUrl,
					data: {
						begin_time_gte: this.begin_time_gte==="选择查询" ? null : this.begin_time_gte,
						begin_time_lte: this.begin_time_lte==="选择查询" ? null : this.begin_time_lte,
						end_time_gte: this.end_time_gte==="选择查询" ? null : this.end_time_gte,
						end_time_lte: this.end_time_lte==="选择查询" ? null : this.end_time_lte,
						engine_code: this.engine_code,
						status: this.status==="选择查询" ? null : this.status,
						currentPage: this.page,
						size: this.size
					}
				})
				uni.hideLoading()
				if(res.data.count === 0){
					uni.showToast({
						icon: "none",
						title: "没有要查询的内容"
					})
				}
				this.engineInfo = [...this.engineInfo,...res.data.results];
				this.count = res.data.count;
			},
			//搜索
			search() {
				uni.showLoading();
				this.onsearch = true;
				this.count = 0;
				this.engineInfo= [];
				this.page = 1;
				this.flag = false;
				this.getPage();
			},
			//获取所有信息
			async getEngineList() {
				const res = await this.$myRequest({
					url: enginInfoUrl,
					data: {currentPage: this.page, size: this.size}
				})
				this.engineInfo = [...this.engineInfo,...res.data.results];
				this.count = res.data.count;
				uni.hideLoading();
			},
			goTodetail(item) {
				uni.navigateTo({
					url: `./enginedetail?begin_time=${item.begin_time}&end_time=${item.end_time}&engine_code=${item.engine_code}&engine_name=${item.engine_name}&note=${item.note}&status=${item.status}`
				})
			},
			background() {
				this.color = "#dedede";
			},
			background2() {
				this.color = "#5675c6";
			},
		},
		onLoad() {
			this.getEngineList()
		},
		onReachBottom() {
			if(this.onsearch === false){
				if(this.page <= (this.count/10)){
					this.page += 1;
					this.getEngineList();
					this.flag = true;
				}
			}else if(this.onsearch === true){
				if(this.page <= (this.count/10)){
					this.page += 1;
					this.getPage();
					this.flag = true;
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.engine{
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

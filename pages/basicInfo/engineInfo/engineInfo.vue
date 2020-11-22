<template>
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
		<view style="height: 650rpx;"></view>
			<view class="engineList">
				<view class="engienItem" v-for="item in engineInfo"  :key="engineInfo.aid">
					<view class="top">
						<image src="../../../static/icon/file2.png" ></image>
						<text>  </text>
						<view>主机信息</view>
					</view>
					<view class="bottom">
						<text>主机编号：{{item.engine_code}}</text>
						<text :style="{ color: item.status==='0'? 'red' : null }">状态：{{item.status | statusSwift}}</text>
					</view>
				</view>
			</view>
	</view>
</template>

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
				this.begin_time_gte = '选择查询';
				this.begin_time_lte = '选择查询';
				this.end_time_gte = '选择查询';
				this.end_time_lte = '选择查询';
				this.engine_code = '';
				this.status = '选择查询';
				this.getEngineList();
			},
			//搜索
			async search() {
				const res = await this.$myRequest({
					url: enginInfoUrl,
					data: {
						begin_time_gte: this.begin_time_gte==="选择查询" ? null : this.begin_time_gte,
						begin_time_lte: this.begin_time_lte==="选择查询" ? null : this.begin_time_lte,
						end_time_gte: this.end_time_gte==="选择查询" ? null : this.end_time_gte,
						end_time_lte: this.end_time_lte==="选择查询" ? null : this.end_time_lte,
						engine_code: this.engine_code,
						status: this.status==="选择查询" ? null : this.status,
					}
				})
				this.engineInfo = res.data.results;
				this.count = res.data.count;
			},
			//获取所有信息
			async getEngineList() {
				const res = await this.$myRequest({
					url: enginInfoUrl
				})
				this.engineInfo = res.data.results;
				this.count = res.data.count;
			}
		},
		onLoad() {
			this.getEngineList()
		},
	}
</script>

<style lang="scss" scoped>
	.engineInfo{
		width: 750rpx;
		.fnc{
			position: fixed;
			width: 750rpx;
			background: $uni-bg-color;
			padding: 0 30rpx;
			z-index: 999;
			.name{
				font-size: 35rpx;
				color: #fff;
				margin-top: 20rpx;
				.time{
					display: flex;
					margin-left: 20rpx;
					margin-top: 10rpx;
					.picker{
						height: 56rpx;
						text-align: center;
						background-color: #fff;
						color: black;
						border-radius: 10rpx;
						width: 310rpx;
						border: 1px solid #fff;
						font-size: 40rpx;
					}
				}
				.pickerStatus{
					width: 400rpx;
					background: #fff;
					color: black;
					border-radius: 10rpx;
					margin-left: 20rpx;
					width: 655rpx;
					height: 60rpx;
					margin-top: 10rpx;
					text-align: center;
					font-size: 40rpx;
				}
			}
			.input{
				text-align: center;
				font-size: 40rpx;
				margin-left: 20rpx;
				height: 48rpx;
				border: 1px solid #fff;
				width: 650rpx;
				border-radius: 10rpx;
				background: #fff;
				color: black;
				margin-top: 10rpx;
			}
		}
		.buttons{
			padding: 20rpx;
			margin-left: 100rpx;
			button:nth-child(1){
				margin-right: 200rpx;
			}
		}
		.engineList{
			width: 100%;
			padding:30 0rpx;
			.engienItem{
				border-bottom: 1px solid #eee;
				padding: 30rpx;
				.top{
					display: flex;
					align-items: center;
					image{
						width: 50rpx;
						height: 50rpx;
						vertical-align: middle;
					}
					text{
						margin-left: 30rpx;
						font-size: 40rpx;
					}
				}
				.bottom{
					margin-top: 30rpx;
					display: flex;
					justify-content: space-between;
					text:nth-child(2){
						margin-left: 110rpx;
					}
				}
			}
		}
	}

</style>

<template>
	<view class="waterRemind">
		<view class="head">
			<view class="code">设备编号：{{equipmentCode}}</view>
		</view>
		<view class="blank">
			<view class="fnc">
				<view class="date"><text class="tit">日期筛选：</text></view>
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
						:style="{ color: end_time === '选择查询'? '#ccc' : null }"
						@change="getdate($event,'end_time')"
					>
						<view class="uni-input">{{end_time}}</view>
					</picker>
				</view>
				<view class="searchitem">
					<view class="label"><span>传感器类型：</span></view>
					<uni-combox class="combox" :candidates="sensorTypes" @input='getInput' v-model="sensorType" ></uni-combox>
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
					<button type="default" size="mini" @click="reset" >重置</button>
				</view>
			</view>
			<view class="item">
				<view class="title">传感器标定记录：</view>
				<view class="nodata" v-if="remindData.length === 0">暂无数据</view>
				<view class="list" v-for="(item,index) in remindData" :key='index' >
					<view class="line"></view>
					<view class="listitem" @click="pop(index)">
						<image src="../../../static/icon/itemfont.png" mode=""></image>
						<view class="text">
							<view>传感器类型：{{item.type_name}}</view>
							<view>标定日期：{{formatTime(item.calibrate_time)}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<pop ref="pop" direction="center" :is_close="true" :is_mask="true" :width="80">
			<t-table border="1" border-color="#ccccc" class="table">
				<t-tr font-size="14" color="#fff" background="#f4bd5b"  >
					<t-th align="center" >水质提醒记录</t-th>
				</t-tr>
				<t-tr font-size="12" color="#5d6f61" >
					<t-td align="left">标定时间:</t-td>
					<t-td align="left" v-if="popData.length !== 0" >{{formatTime(popData.calibrate_time) }}</t-td>
				</t-tr>
				<t-tr font-size="12" color="#5d6f61" >
					<t-td align="left">传感器类型:</t-td>
					<t-td align="left">{{popData.type_name}}</t-td>
				</t-tr>
				<t-tr font-size="12" color="#5d6f61" >
					<t-td align="left">标定理论值:</t-td>
					<t-td align="left">{{popData.theoretical_value}}</t-td>
				</t-tr>
				<t-tr font-size="12" color="#5d6f61" >
					<t-td align="left">标定实际值:</t-td>
					<t-td align="left" >{{popData.actual_value}}</t-td>
				</t-tr>
				<t-tr font-size="12" color="#5d6f61" >
					<t-td align="left">标定补偿值:</t-td>
					<t-td align="left">{{popData.calibrate_compensation}}</t-td>
				</t-tr>
			</t-table>
		</pop>
	</view>
</template>

<script>
	import { equipmentUrl, CalibrationMark,device } from '../../../util/urlList.js'
	import pop from "@/components/ming-pop/ming-pop.vue"
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	import uniCombox from "@/components/uni-combox/uni-combox"
	import { throttle } from '@/common/throttle.js'
	export default {
		data() {
			return {
				equipmentId:'',
				equipmentCode:'',
				begin_time: '选择查询',
				end_time: '选择查询',
				sensorTypes:[],
				sensorType:'',
				currentPage: 1,
				size: 10,
				count: 0,
				color: '#5675c6',
				remindData:[],
				sensorData:[],
				onsearch: false,
				popData:''
			}
		},
		onLoad(e) {
			this.equipmentId = e.equipment_id
			this.getEquipmentCode()
		},
		onReachBottom() {
			console.log(123)
			if(this.onsearch === false){
				if(this.currentPage <= (this.count/10)){
					this.currentPage += 1;
					this.getAllRemind();
				}
			}else if(this.onsearch === true){
				if(this.currentPage <= (this.count/10)){
					this.currentPage += 1;
					this.getPage();
				}
			}
		},
		methods: {
			//获得设备编号
			async getEquipmentCode() {
				const res = await this.$myRequest({
					url:equipmentUrl,
					data:{
						"equipment_id":this.equipmentId
					}
				})
				this.equipmentCode = res.data.data[0].equipment_code
				this.getAllRemind()
				this.getSensorTpye()
			},
			//为了获得传感器类型及型号
			async getSensorTpye() {
				const res = await this.$myRequest({
					url:device,
					data:{
						'deviceNum':this.equipmentCode
					}
				})
				this.sensorData = res.data
				this.getTpye(this.sensorData)
			},
			//将传感器类型拿出来
			getTpye(data) {
				data.map(item => {
					this.sensorTypes.push(item.type_name)
				})
			},
			//获得所有标定记录
			async getAllRemind() {
				const res = await this.$myRequest({
					url:CalibrationMark,
					data:{
						currentPage: this.currentPage, 
						size: this.size,
						deviceNum:this.equipmentCode
					}
				})
				// console.log(res.data)
				uni.hideLoading();
				this.remindData = [...this.remindData,...res.data.data];
				this.count = res.data.count
			},
			//获取搜索的值
			async getPage() {
				const res = await this.$myRequest({
					url: CalibrationMark,
					data: {
						begin_time: this.begin_time==="选择查询" ? null : this.begin_time,
						end_time: this.end_time==="选择查询" ? null : this.end_time,
						deviceNum:this.equipmentCode,
						type_name:this.sensorType,
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
				// console.log(res.data.data)
				this.remindData = [...this.remindData,...res.data.data];
				this.count = res.data.count;
			},
			//获得输入框的值
			getInput(e) {
				this.sensorType = e
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
			background() {
				this.color = "#dedede";
			},
			background2() {
				this.color = "#5675c6";
			},
			search: throttle(function() {
				uni.showLoading();
				this.onsearch = true;
				this.remindData = [],
				this.count = 0;
				this.currentPage = 1;
				this.getPage();
			}),
			reset: throttle(function() {
				uni.showLoading();
				this.sensorType = '';
				this.begin_time = '选择查询';
				this.end_time ='选择查询';
				this.currentPage = 1;
				this.count = 0;
				this.onsearch = false;
				this.remindData= [];
				this.getAllRemind();
			}),
			//时间格式
			formatTime(time) {
				let year = '' 
				let second = ''
				if (time !== null ) {
					year = time.slice(0,10)
					// second = time.slice(11,19)
					return  year + ' ' 
				}
			},
			//信息弹出框
			pop(index) {
				this.$refs.pop.show();
				this.popData = this.remindData[index]
				// console.log(this.popData)
			},
		},
		components: {uniCombox,pop, tTable, tTh, tTr, tTd}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.table{
		margin-top: 8px;
	}
	.waterRemind{
		background: $background-color;
		height: 100%;
		.head{
			color: #fff;
			padding-top: 20px;
			letter-spacing: 1px;
			font-weight: 500;
			.code{
				margin-left: 20rpx;
				width: 730rpx;
				margin-bottom: 5px;
			}
		}
		.blank{
			height: 100%;
			background: #fff;
			margin-top: 10px;
			border-radius: 50rpx;
			padding-top: 5px;
			.fnc{
				box-shadow: 8rpx 8rpx 20rpx  #eaecf0;
				background: #f4f4f4;
				width: 650rpx;
				padding: 20rpx;
				margin: 20rpx auto;
				border-radius: 30rpx;
				.date{
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
					.combox {
						height: 57rpx;
						font-size: 35rpx;
						border: 1px solid #f4bd5b;
						width: 100%;
						background: #fff;
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
				.nodata{
					text-align: center;
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
							view:nth-child(2){
								margin-top: 20rpx;
							}
						}
					}
				}
			}
		}
		
	}
</style>


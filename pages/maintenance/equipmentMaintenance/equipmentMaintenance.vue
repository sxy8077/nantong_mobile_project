<template>
	<view class="equipmentMaintenance">
		<view class="head">
			<view class="code">设备编号：{{equipmentCode}}</view>
		</view>
		<view class="blank">
			<view class="fnc">
				<view class="date"><text class="tit">登记时间：</text></view>
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
					<view class="label"><span>维护原因：</span></view>
					<uni-combox class="combox" :candidates="causes"  v-model="maintainCause" ></uni-combox>
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
					<button type="default" size="mini" @click="popMaintain"  >设备报修</button>
				</view>
			</view>
			<view class="item">
				<view class="title">设备维护记录：</view>
				<view class="nodata" v-if="maintainData.length === 0">暂无数据</view>
				<view class="list" v-for="(item,index) in maintainData " :key='item.aid' >
					<view class="line"></view>
					<view class="listitem" @click="pop(index)">
						<image src="../../../static/icon/itemfont.png" mode=""></image>
						<view class="text">
							<view>设备维护记录：</view>
							<view>维护原因：{{causeSWift(item.maintain_cause) }}</view>
							<view>登记时间：{{item.repair_time}}</view>
						</view>
					</view>
					<view class="rot" v-if="item.maintain_status === '0'" ></view>
				</view>
			</view>
		</view>
		<pop ref="popMaintain" direction="center" :is_close="true" :is_mask="true" :width="80" > 
			<view>
				<view class="title">设备报修：</view>
				<view class="Popline"></view>
				<view class="popitem">
					<view class="label"><span>维护原因：</span></view>
					<picker :range="causes" @change='getInput' :value="index"  >
						 <view class="input">{{causes[index]}}</view>
					</picker>
				</view>
				<view class="descirbe"><span>设备状况描述：</span></view>
				<input type="text" class="inputDescribe" v-model="descirbe" />
				<button class="submit"
				type="default"
				size="mini" 
				@click="send"
				>提交</button>
			</view>
		</pop>
		<pop ref="pop" direction="center" :is_close="true" :is_mask="true" :width="80" > 
			<t-table border="1" border-color="#ccccc" class="table">
				<t-tr font-size="14" color="#fff" background="#f4bd5b"  >
					<t-th align="center" >设备维护记录</t-th>
				</t-tr>
				<t-tr font-size="12" color="#5d6f61" >
					<t-td align="left">登记时间:</t-td>
					<t-td align="left">{{popData.repair_time}}</t-td>
				</t-tr>
				<t-tr font-size="12" color="#5d6f61" >
					<t-td align="left">维护时间:</t-td>
					<t-td align="left">{{popData.maintain_time}}</t-td>
				</t-tr>
				<t-tr font-size="12" color="#5d6f61" >
					<t-td align="left">维护原因:</t-td>
					<t-td align="left">{{causeSWift(popData.maintain_cause) }}</t-td>
				</t-tr>
				<t-tr font-size="12" color="#5d6f61" >
					<t-td align="center">设备状况描述:</t-td>
				</t-tr>
				<t-tr font-size="12" color="#5d6f61" >
					<t-td align="left">{{popData.fault_description}}</t-td>
				</t-tr>
				<t-tr font-size="12" color="#5d6f61" >
					<t-td align="left">维护状态:</t-td>
					<t-td align="left" :style="{ color: popData.maintain_status==='0' ? 'red' : null }" >{{statusSWift(popData.maintain_status) }}</t-td>
				</t-tr>
				<t-tr font-size="12" color="#5d6f61" >
					<t-td align="left">负责人:</t-td>
					<t-td align="left">{{popData.responsible_person}}</t-td>
				</t-tr>
			</t-table>
		</pop>
	</view>
</template>

<script>
	import { equipmentUrl, equipMaintainUrl,addEquipMaintainUrl } from '../../../util/urlList.js'
	import uniCombox from "@/components/uni-combox/uni-combox"
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	import pop from "@/components/ming-pop/ming-pop.vue"
	import { throttle } from '@/common/throttle.js'
	export default {
		data() {
			return {
				equipmentId:'',
				equipmentCode:'',
				begin_time: '选择查询',
				end_time: '选择查询',
				causes:['例行维护','用户报修','运维报修'],
				maintainCause:'',
				currentPage: 1,
				size: 10,
				count: 0,
				color: '#5675c6',
				maintainData:[],
				onsearch: false,
				addMaintainCause:'',
				descirbe:'',
				index:0,
				popData:''
			}
		},
		onLoad(e) {
			this.equipmentId = e.equipment_id
			this.getEquipmentCode()
			this.getAllRemind()
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
					},
				})
				this.equipmentCode = res.data.data[0].equipment_code
			},
			//获得所有提醒记录
			async getAllRemind() {
				const res = await this.$myRequest({
					url:equipMaintainUrl,
					data:{
						currentPage: this.currentPage, 
						size: this.size,
						equipment_id:this.equipmentId
					}
				})
				uni.hideLoading();
				// console.log(res.data)
				this.maintainData = [...this.maintainData,...res.data.data];
				this.count = res.data.count
			},
			//获取搜索的值
			async getPage() {
				const res = await this.$myRequest({
					url: equipMaintainUrl,
					data: {
						begin_time: this.begin_time==="选择查询" ? null : this.begin_time,
						end_time: this.end_time==="选择查询" ? null : this.end_time,
						equipment_id:this.equipmentId,
						maintain_cause:this.swift(this.maintainCause),
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
				this.maintainData = [...this.maintainData,...res.data.data];
				this.count = res.data.count;
			},
			//发送设备报修
			async send() {
				this.addMaintainCause = this.index
				const res = await this.$myRequest({
					url:addEquipMaintainUrl,
					method:'post',
					data:{
						equipment_id:this.equipmentId,
						maintain_cause:this.addMaintainCause,
						fault_description:this.descirbe
					}
				})
				this.maintainData = []
				this.getAllRemind()
				this.$refs.popMaintain.close();
				this.descirbe = ''
				this.addMaintainCause = 0
			},
			//获得下拉框的值
			getInput(e) {
				this.index = e.detail.value
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
				this.maintainData = [],
				this.count = 0;
				this.currentPage = 1;
				this.getPage();
			}),
			reset: throttle(function() {
				uni.showLoading();
				this.maintainCause = '';
				this.begin_time = '选择查询';
				this.end_time ='选择查询';
				this.currentPage = 1;
				this.count = 0;
				this.onsearch = false;
				this.maintainData= [];
				this.getAllRemind();
			}),
			causeSWift(status) {
				if(status === '0'){
				    return '例行维护'
				}else if(status === '1'){
				    return '用户报修'
				}else if(status === '2'){
				  return '运维报修'
				}
			},
			swift(status) {
				if(status === '例行维护'){
				    return '0'
				}else if(status === '用户报修'){
				    return '1'
				}else if(status === '运维报修'){
				  return '2'
				}
			},
			//维护结果的转化
			statusSWift(status) {
				if(status === '0'){
				  return '维护未结束'
				}else if(status === '1'){
				  return '维护结束'
				}
			},
			//设备报修信息弹出框
			popMaintain() {
				this.$refs.popMaintain.show();
			},
			//每条信息详情
			pop(index) {
				this.$refs.pop.show()
				this.popData = this.maintainData[index]
			},
		},
		components: {uniCombox,pop, tTh, tTr, tTd}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.table{
		margin-top: 8px;
	}
	.Popline{
		border-bottom: 1px solid #cccccc;
		margin-top: 20rpx;
	}
	.descirbe{
		height: 60rpx;
		width: 250rpx;
		margin-top: 10rpx;
		span {
			margin-left: 10rpx;
			font-size: 30rpx;
			display: inline-block;
			line-height: 60rpx;
			height: 100%;
		}
	}
	.submit{
		margin-top: 30rpx;
		border: 1px solid #5675c6;
		width: 200rpx;
		margin-left: 160rpx;
	}
	.inputDescribe{
		margin-left: 10rpx;
		height: 57rpx;
		font-size: 30rpx;
		border: 1px solid #eee;
		width: 92%;
	}
	.equipmentMaintenance{
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
					button:nth-child(3) {
						background: red;
						color: #fff;
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
					margin-bottom: -20rpx;
					.rot{
						position: relative;
						background: red;
						width: 30rpx;
						height: 30rpx;
						border-radius: 15rpx;
						left: 150rpx;
						top: -200rpx;
					}
					.listitem{
						margin-top: 30rpx;
						margin-bottom: 30rpx;
						display: flex;
						image{
							width:170rpx;
							height: 170rpx;
							margin-right: 40rpx;
						}
						.text{
							view:nth-child(2){
								margin-top: 20rpx;
							}
							view:nth-child(3){
								margin-top: 20rpx;
							}
						}
					}
				}
			}
		}
		.popitem{
			margin-top: 50rpx;
			display: flex;
			.label{
				height: 60rpx;
				width: 180rpx;
				span {
					margin-left: 10rpx;
					font-size: 30rpx;
					display: inline-block;
					line-height: 60rpx;
					height: 100%;
				}
			}
			picker {
				height: 57rpx;
				font-size: 35rpx;
				border: 1px solid #eee;
				width: 60%;
				.input{
					font-size: 30rpx;
					line-height: 60rpx;
				}
			}
		}
	}
</style>


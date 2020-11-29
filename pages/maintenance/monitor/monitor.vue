<template>
	<view class="monitor">
		<view class="head">
			<view class="left">设备编号：{{equipmentData.equipment_code}}</view>
			<view class="right">用户单位：{{equipmentData.client_unit}}</view>
			<!-- <view class="equipment_code">S123456789</view>
			<view class="clientUnit">上海一汽大众有限公司</view> -->
		</view>
		<view class="nav">
			<scroll-view class="scroll-view_H" scroll-x="true">
				<view id="demo1" class="scroll-view-item_H ">
					<view class="status" :style='handleStatusColor(equipmentData.status)'>{{handleStatus(equipmentData.status)}}</view>
					<view class="text">设备状态</view>
				</view>
				<view id="demo1" class="scroll-view-item_H " @click="navigatorTo('waterRemind')" >
					<uni-icons type="compose" color="#3b466c" size="60"></uni-icons>
					<view class="text">水质提醒记录</view>
				</view>
				<view id="demo1" class="scroll-view-item_H ">
					<uni-icons type="gear-filled" color="#3b466c" size="60" @click="navigatorTo('equipMaintenance')" ></uni-icons>
					<view class="text">设备维护</view>
				</view>
				<view id="demo1" class="scroll-view-item_H ">
					<uni-icons type="settings" color="#3b466c" size="60" @click="navigatorTo('sensorCalibration')" ></uni-icons>
					<view class="text">传感器标定</view>
				</view>
				<view id="demo1" class="scroll-view-item_H " @click="pop" >
					<uni-icons type="list" color="#3b466c" size="60"></uni-icons>
					<view class="text">设备详情</view>
				</view>
			</scroll-view>
		</view>
		<view class="pic">
			<view class='navTab'>
				<!-- 导航栏 agents导航栏标题 -->
				<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
			</view>
			<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
			<swiper  :current="currentTab" @change="swiperTab">
				<swiper-item class="swiper" v-for="(listItem,listIndex) in tabTitle" :key="listIndex">
					<view class="nowVal">当前测量值：{{nowVal(listItem)}}</view>
					<view class="searchNav">
						<view class="Time">
							<view class="time">开始时间：</view>
							<picker 
								mode="date" 
								class="picker"
								:style="{ color: begin_time==='选择查询'? '#ccc' : null }"
								@change="getdate($event,'begin')"
							>
								<view class="uni-input">{{begin_time}}</view>
							</picker>
						</view>
						<view class="Time">
							<view class="time">结束时间：</view>
							<picker
								mode="date" 
								class="picker"
								:style="{ color: end_time==='选择查询'? '#ccc' : null }"
								@change="getdate($event,'end')"
							>
								<view class="uni-input">{{end_time}}</view>
							</picker>
						</view>
						<view class="action">
							<button class="search" @click="search">搜索</button>
							<button class="reset" @click="reset">重置</button>
						</view>
						<line-pic :canvasData="chooseData(listItem)" :id='listItem' ></line-pic>
					</view>
				</swiper-item>
			</swiper>
			<!-- <line-pic :canvasData="sensorData" :id='changeStr(listIndex)' ></line-pic> -->
		</view>
		<pop ref="pop" direction="center" :is_close="true" :is_mask="true" :width="80"> 
			<t-table border="1" border-color="#95b99e" class="table">
				<t-tr font-size="14" color="#5d6f61" >
					<t-th align="center">设备详情</t-th>
				</t-tr>
				<t-tr font-size="12" color="#5d6f61" >
					<t-td align="left">主机编号:</t-td>
					<t-td align="left">{{equipCode.engine_code}}</t-td>
				</t-tr>
				<t-tr font-size="12" color="#5d6f61" >
					<t-td align="left">主机型号:</t-td>
					<t-td align="left">{{equipCode.engine_name}}</t-td>
				</t-tr>
				<view v-for="(item,index) in finalEquipInfo" :key='index' >
					<t-tr font-size="12" color="#5d6f61" >
						<t-td align="left">联系人:</t-td>
						<t-td align="left">{{item.contact_person}}</t-td>
					</t-tr>
					<t-tr font-size="12" color="#5d6f61" >
						<t-td align="left">联系人电话:</t-td>
						<t-td align="left">{{item.contact_tel}}</t-td>
					</t-tr>
				</view>
				<t-tr font-size="12" color="#5d6f61" >
					<t-td align="center">设备配置</t-td>
				</t-tr>
				<t-tr font-size="12" color="#5d6f61" v-for="item in sensorTypeName" :key='item.type_name' >
					<t-td align="left">{{item.type_name}}</t-td>
					<t-td align="left">{{item.sensor_model}}</t-td>
				</t-tr>
			</t-table>
		</pop>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import pop from "@/components/ming-pop/ming-pop.vue"
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	import { throttle } from '@/common/throttle.js'
	import navTab from '../../../components/navTab.vue';
	import linePic from '../../../components/LinePic.vue';
	import { equipmentUrl, device, sensorDataUrl, equipmentInfoUrl } from '../../../util/urlList.js'
	
	export default {
		data() {
			return {
				equipmentId:0,
				currentTab: 0,
				tabTitle:[],
				list: [], //数据格式
				sensorData: {  categories: [], series: [{name:'pH值',data: [],color: '#000000'}],canvas:null,day:'0'},
				pHSensorData: {  categories: [], series: [{name:'pH值',data: [],color: '#000000'}],canvas:null,day:'0'},
				orpSensorData: {  categories: [], series: [{name:'pH值',data: [],color: '#000000'}],canvas:null,day:'0'},
				conductSensorData: {  categories: [], series: [{name:'pH值',data: [],color: '#000000'}],canvas:null,day:'0'},
				temperSensorData: {  categories: [], series: [{name:'pH值',data: [],color: '#000000'}],canvas:null,day:'0'},
				begin_time: '选择查询',
				end_time: '选择查询',
				equipmentData:[], //设备的编号单位及状态
				sensorTypeName:[] ,//传感器类型及型号
				time:[],//存储传感器对应数据
				pH:[],
				orp:[],
				conduct:[],
				temper:[],
				timer:null,
				EquipInfoData:[],//设备详情信息
				finalEquipInfo:[],//最终设备详情
				equipCode:[],//存放设备型号和编号
				tel:[]
			}
		},
		onLoad(e) {
			this.equipmentId = e.equipment_id
			this.getEquipmentData()
			this.getAllSensorData()
			this.refresh()
			this.getEquipInfoData()
		},
		onUnload:function(){
			this.clearTimer()
		},
		methods: {
			changeTab(index){
				this.currentTab = index
			},
			//转化为字符串
			changeStr(e){
				return String(e)
			},
			// swiper 滑动
			swiperTab: function(e) {
				var index = e.detail.current //获取索引
				this.$refs.navTab.longClick(index);
			},
			getdate(e, name) {
				switch(name){
					case 'begin': 
						this.begin_time = e.detail.value;
						break;
					case 'end' :
						this.end_time= e.detail.value;
						break;
					default :
						return;
				}
			},
			//重置
			reset:throttle(function() {
				uni.showLoading();
				this.begin_time = '选择查询';
				this.end_time = '选择查询';
				this.getAllSensorData()
			}),
			//搜索
			 search:throttle(function() {
				 uni.showLoading();
				 this.getAllSensorData()
			 }),
			//获得设备数据
			async getEquipmentData() {
				const res = await this.$myRequest({
					url:equipmentUrl,
					data:{
						"equipment_id":this.equipmentId
					}
				})
				this.equipmentData = res.data.data[0]
				this.getSensorTpye()
				},
			//获得设备详情数据
			async getEquipInfoData() {
				const res = await this.$myRequest({
					url:equipmentInfoUrl,
					data:{
						"equipment_id":this.equipmentId
					}
				})
				if(res.data.length === 0) return null
				this.equipCode = res.data[0]
				res.data.map(item => {
					if(item.status === '1') {
						this.EquipInfoData.push(item)
					}
				})
				this.EquipInfoData.map(item => {
					if(this.tel.indexOf(item['contact_tel']) == -1) {
					                this.tel.push(item['contact_tel'])
					                this.finalEquipInfo.push(item)
					}
				})
			},
			//获得传感器类型及型号
			async getSensorTpye() {
				const res = await this.$myRequest({
					url:device,
					data:{
						'deviceNum':this.equipmentData.equipment_code
					}
				})
				this.sensorTypeName = res.data
				// console.log(this.sensorTypeName)
				if(this.sensorTypeName.length === 0 ) {
					return	this.tabTitle = ['该设备未配置传感器']
				}
				this.getTpye(this.sensorTypeName)
			},
			//将传感器类型拿出来
			getTpye(data) {
				if(data.length === 0 ) return null
				data.map(item => {
					this.tabTitle.push(item.type_name)
				})
				// console.log(this.tabTitle)
			},
			//获得测量数据
			async getAllSensorData() {
				const res = await this.$myRequest({
					url:sensorDataUrl,
					data:{
						'deviceNum':'001',
						'begin_time': this.begin_time==="选择查询" ? null : this.begin_time,
						'end_time': this.end_time==="选择查询" ? null : this.end_time,
					}
				})
				uni.hideLoading();
				this.handleData(res.data)
			},
			//处理获得的数据
			handleData(data) {
				if( data !== undefined ) {
					this.time = []
					this.pH = []
					this.orp = []
					this.conduct = []
					this.temper = []
					data.map(item => {
						this.time.push(this.formatTime(item.time))
						this.pH.push(parseFloat(item.ph).toFixed(2))
					    this.orp.push(parseFloat(item.orp).toFixed(2))
					    this.conduct.push(parseFloat(item.conduct).toFixed(2))
					    this.temper.push(parseFloat(item.temper).toFixed(2))
					})
				}
				this.sensorData.categories = this.time
				this.pHSensorData.categories = this.time
				this.orpSensorData.categories = this.time
				this.conductSensorData.categories = this.time
				this.temperSensorData.categories = this.time
			},
			//时间格式
			formatTime(time) {
				let year = '' 
				let second = ''
				if (time !== null ) {
					year = time.slice(0,10)
					second = time.slice(11,19)
					return  year + ' ' + second
				}
			},
			//返回传感器对应数据
			chooseData(item) {
				if(item === 'PH传感器' || item === 'Ph传感器' || item === 'ph传感器' || item === 'ph传感器传感器' ) {
					this.pHSensorData.series[0].name = 'pH值'
					this.pHSensorData.series[0].data = this.pH
				return this.pHSensorData
				} else if(item === "ORP传感器" || item === 'orp传感器' || item === 'orp传感器传感器' || item === 'ORP传感器传感器' ) {
					this.orpSensorData.series[0].name = 'ORP值'
					this.orpSensorData.series[0].data = this.orp
					return this.orpSensorData
				} else if(item === "电导率传感器" || item === "电导率传感器传感器") {
					this.conductSensorData.series[0].name = '电导率'
					this.conductSensorData.series[0].data = this.conduct
					return this.conductSensorData
				} else if(item === "温度传感器" || item === '温度传感器传感器') {
					this.temperSensorData.series[0].name = '温度值'
					this.temperSensorData.series[0].data = this.temper
					return this.temperSensorData
				} else {
					this.sensorData.series[0].name = '暂无该数据'
					this.sensorData.series[0].data = []
					return this.sensorData
				}
			},
			//现在测量值
			nowVal(item) {
				if(item === 'PH传感器' || item === 'Ph传感器' || item === 'ph传感器' || item === 'ph传感器传感器' ) {
					if(this.pHSensorData.series[0].data.length === 0) {
						return "无该时间段测量值"
					} else {
						return this.pHSensorData.series[0].data[this.pHSensorData.series[0].data.length -1]
					}
				} else if(item === "ORP传感器" || item === 'orp传感器' || item === 'orp传感器传感器' || item === 'ORP传感器传感器' ) {
					if(this.orpSensorData.series[0].data.length === 0) {
						return "无该时间段测量值"
					} else {
						return this.orpSensorData.series[0].data[this.orpSensorData.series[0].data.length -1]
					}
				} else if(item === "电导率传感器" || item === "电导率传感器传感器") {
					if(this.conductSensorData.series[0].data.length === 0) {
						return "无该时间段测量值"
					} else {
						return this.conductSensorData.series[0].data[this.conductSensorData.series[0].data.length -1]
					}
				} else if(item === "温度传感器" || item === '温度传感器传感器') {
					if(this.temperSensorData.series[0].data.length === 0) {
						return "无该时间段测量值"
					} else {
						return this.temperSensorData.series[0].data[this.temperSensorData.series[0].data.length -1]
					}
				} else {
					return '无'
				}
			},
			//刷新数据定时器
			refresh() {
				this.timer = setInterval(() => {
					this.getAllSensorData()
				}, 300000);
			},
			//清除定时器
			clearTimer() {
				clearInterval(this.timer);
				this.timer = null;
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
			//设备信息弹出框
			pop() {
				this.$refs.pop.show();
			},
			//页面跳转
			navigatorTo(page) {
				switch(page) {
					case 'waterRemind':
						uni.navigateTo({
							url:'../waterRemind/waterRemind?equipment_id='+this.equipmentId
						})
						break;
					case 'equipMaintenance':
						uni.navigateTo({
							url:'../equipmentMaintenance/equipmentMaintenance?equipment_id='+this.equipmentId
						})
						break;
					case 'sensorCalibration':
						uni.navigateTo({
							url:'../sensorCalibration/sensorCalibration?equipment_id='+this.equipmentId
						})
						break;
				}
			}
		},
		components: {uniIcons, navTab, linePic, pop, tTable, tTh, tTr, tTd}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.table{
		margin-top: 8px;
	}
	.monitor{
		background: $background-color;
		height: 100%;
		.head{
			display: flex;
			color: #fff;
			padding-top: 20px;
			flex-wrap: wrap;
			letter-spacing: 1px;
			font-weight: 500;
			.left{
				margin-left: 20rpx;
				width: 730rpx;
				margin-bottom: 5px;
			}
			.right{
				margin-left: 20rpx;
				width: 730rpx;
			}
			// .equipment_code{
			// 	width: 335rpx;
			// 	margin-left: 40rpx;
			// 	margin-top: 2px;
			// }
			// .clientUnit{
			// 	width: 340rpx;
			// 	margin-left: 25rpx;
			// 	margin-top: 2px;
			// 	margin-right: 10rpx;
			// }
		}
		.nav{
			margin-top: 50rpx;
				.scroll-view_H {
					white-space: nowrap;
					width: 100%;
				}
				.scroll-view-item_H {
					display: inline-block;
					height: 180rpx;
					// line-height: 300rpx;
					text-align: center;
					font-size: 33rpx;
					width: 240rpx;
					background: #fff;
					border-radius: 25rpx;
					margin: 0 20rpx;
					color: #3b466c;
					font-weight: 650;
					letter-spacing: 1px;
					.status{
						margin: 0 auto;
						margin-top: 35rpx;
						margin-bottom: 35rpx;
						width: 120rpx;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						color: #fff;
					}
					.text{
						// margin-top: -6px;
					}
				}
		}
		.pic{
			// height: 100%;
			background: #fff;
			margin-top: 25px;
			border-radius: 50rpx;
			swiper{
				height: 800rpx;
			}
			.navTab {
				left: 0;
				top: 0;
				color: white;
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: flex-start;
				font-size: 24upx;
				// background-color: #50B7EA;
				z-index: 996;
			}
			.nowVal{
				margin-left: 20rpx;
			}
			.searchNav{
				display: flex;
				margin-top: 10px;
				flex-wrap: wrap;
				width: 750rpx;
				.Time {
					margin: 0 20rpx;
					.time{
						background: #f4bd5b;
						color: #fff;
						width: 225rpx;
						padding-left: 15rpx;
						height: 56rpx;
						line-height: 56rpx;
						border-radius: 30rpx;
						margin-bottom: 5px;
					}
					.picker{
						height: 56rpx;
						text-align: center;
						background-color: #fff;
						color: black;
						border-radius: 10rpx;
						width: 240rpx;
						border: 1px solid #fff;
						font-size: 40rpx;
						border: 1px solid #f4bd5b;
					}
				}
				.action{
					width: 180rpx;
					.search{
						background: #5675c6;
						border-radius: 30rpx;
						width: 160rpx;
						height: 56rpx;
						line-height: 56rpx;
						color: #fff;
						text-align: center;
						margin: 0 auto;
					}
					.reset{
						border: 1px solid #5675c6;
						border-radius: 30rpx;
						width: 160rpx;
						height: 56rpx;
						line-height: 56rpx;
						text-align: center;
						margin: 0 auto;
						margin-top: 5px;
					}
				}
			}
		}
	}
</style>

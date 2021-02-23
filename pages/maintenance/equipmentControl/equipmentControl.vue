<template>
	<view class="equipmentControl">
		<view class="item">
			<view class="title">设备编号：{{equipmentCode}}</view>
			<!-- 阀1 -->
			<view class="list" v-for="(pump, index) in pumps" :key='index' >
				<view class="line"></view>
				<view class="listitem" >
					<image src="../../../static/icon/itemfont.png" mode=""></image>
					<view class="text">
						<view>{{pump.pump_name}}</view>
						<view>流量：{{pump.fluid_flow}} L/s</view>
						<view>状态：<view class="status" :style="{ background: status[index] ? '#84d3c9' : '#b3b3b3' }">启动</view></view>
					</view>
				</view>
				<view class="time">
					<countdown-timer ref="countdown" :time="time[index]" @finish="onFinish(pump.pump_name, index)" @sendRemain='getRemain($event, index)' autoStart>
					    <template v-slot="{day, hour, minute, second, remain, time}" >
							<view class="custom">
								<view>{{fillWithZero(hour + (day * 24), 2)}}</view>
								<view>:</view>
								<view>{{fillWithZero(minute, 2)}}</view>
								<view>:</view>
								<view>{{fillWithZero(second, 2)}}</view>
							</view>
					    </template>
					</countdown-timer>
					<switch :checked="treatChecked[pump.pump_name]"  color="#84d3c9" @change='switchChange($event, pump.pump_name, index, pump.fluid_flow, pump.pump_code)'  />
				</view>
			</view>
			<!-- 加药量设置时间弹窗 -->
			<pop ref="popTime" direction="center" :is_close="true" :is_mask="true" :width="80" @childVal='getFalse'>
				<view class="pop">
					<view class="tit">剂量设置</view>
					<view class="input" >
						<view class="label"><span >剂量:</span></view>
						<input type="number" class="inputNum" @input='inputChange' v-model="dosage" />
						<span class='L' >L(升)</span>
					</view>
					<view class="runtime" >
						<view class="label"><span >运行时长:</span></view>
						<input type="number" class="inputNum" disabled :value="startTime[showIndex]" />
						<span class='L' >S(秒)</span>
					</view>
					<!-- <view class="seletTime">
						<view >运行时长:</view>
						<uni-number-box class="selcet" :value="startTime[showIndex]" @change="bindChange"></uni-number-box>
						<view>秒</view>
					</view> -->
					<view class="button">
						<button v-if="this.success" type="default" @click="commit">提交</button>
						<button @click="reset">重置</button>
					</view>
				</view>
			</pop>
		<!-- 加药完毕弹窗 -->
		<!-- <pop ref="pop12" direction="center" :is_close="true" :is_mask="true" :width="80" @childVal='getFalse1' >
			<t-table border="1" border-color="#eee" class="table">
				<t-tr font-size="20" color="#fff" background="#f4bd5b" >
					<t-th align="center">设备执行反馈</t-th>
				</t-tr>
				<t-tr font-size="15" color="#5d6f61" >
					<t-td align="left">主机编号:</t-td>
					<t-td align="left">{{equipmentCode}}</t-td>
				</t-tr>
				<t-tr v-if="backInfo === '12'" font-size="15" color="#5d6f61" >
					<t-td align="left">加药量:</t-td>
					<t-td align="left">{{this.DoneTime1/1000*5}}升</t-td>
				</t-tr>
				<t-tr v-if="backInfo === '12'" font-size="15" color="#5d6f61" >
					<t-td align="left">执行结果:</t-td>
					<t-td align="left">成功</t-td>
				</t-tr>
				<t-tr v-else font-size="15" color="#5d6f61" >
					<t-td align="left">执行结果:</t-td>
					<t-td align="left">设备关闭失败，请检查设备!</t-td>
				</t-tr>
			</t-table>
		</pop> -->
		<pop ref="popFinish" direction="center" :is_close="true" :is_mask="true" :width="80" @childVal='getFalse' >
			<t-table border="1" border-color="#eee" class="table">
				<t-tr font-size="20" color="#fff" background="#f4bd5b" >
					<t-th align="center">设备执行反馈</t-th>
				</t-tr>
				<t-tr font-size="15" color="#5d6f61" >
					<t-td align="left">主机编号:</t-td>
					<t-td align="left">{{equipmentCode}}</t-td>
				</t-tr>
				<!-- <t-tr  font-size="15" color="#5d6f61" >
					<t-td align="left">加药量:</t-td>
					<t-td align="left">{{this.DoneTime[this.showIndex]/1000*this.NowFluid}}升</t-td>
				</t-tr> -->
				<t-tr  font-size="15" color="#5d6f61" >
					<t-td align="left">执行结果:</t-td>
					<t-td align="left">成功</t-td>
				</t-tr>
				<!-- <t-tr v-else font-size="15" color="#5d6f61" >
					<t-td align="left">执行结果:</t-td>
					<t-td align="left">设备关闭失败，请检查设备!</t-td>
				</t-tr> -->
			</t-table>
		</pop>
		</view>
	</view>
</template>

<script>
	import { equipmentUrl,websocketUrl, wsUrl, getEquipmentPumpsUrl } from '../../../util/urlList.js'
	import pop from "@/components/ming-pop/ming-pop.vue"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	import { createWebSocket, closeWebSocket, websocket } from '../../../common/websocket.js';
	
	export default {
		data() {
			return {
				equipmentId:'',
				equipmentCode:'',
				// startTime1:'0',
				// time1:0,
				// treatChecked:{'check1':false, 'check2':false},
				treatChecked:{},
				// remainTime1:0,
				// DoneTime1:0,
				aimId:'',
				backInfo:'',
				// status1:false,
				userId: '11',
				pumps: [],
				status: [false, false],
				remainTime: [],
				DoneTime: [],
				startTime: [],
				time: [],
				showIndex: null,
				success:'',
				dosage: null,
				NowFluid: null,
				pumpCode: null
			}
		},
		onLoad(e) {
			this.equipmentId = e.equipment_id
			this.getEquipmentCode()
			let me = this
			uni.getStorage({
				key:'uerInfo',
				success:function(res) {
					me.userId = res.data.user_id
				}
			})
			uni.startPullDownRefresh();
		},
		onUnload() {
			closeWebSocket()
		},
		onPullDownRefresh() {
			this.getEquipmentCode()
			let me = this
			uni.getStorage({
				key:'uerInfo',
				success:function(res) {
					me.userId = res.data.user_id
				}
			})
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
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
				this.getAimId();
				this.getEquipmentPumps()
			},
			// 获得设备对应的泵信息
			async getEquipmentPumps() {
				const res = await this.$myRequest({
					url: getEquipmentPumpsUrl,
					data: {
						"equipment_code": this.equipmentCode,
					}
				})
				if(res.data.msg === "获取成功") {
					this.pumps = res.data.pump_object_list
					if( this.time.length !== res.data.pump_object_list.length ) {
						for (let i = 0; i < res.data.pump_object_list.length; i++) {
							this.status.push(false)
							this.remainTime.push(0)
							this.DoneTime.push(0)
							this.startTime.push(0)
							this.time.push(0)
							this.treatChecked[res.data.pump_object_list[i].pump_name] = false
						}
						// console.log(this.treatChecked)
					}	
				} else {
					this.pumps = []
				}
			},
			//倒计时格式
			fillWithZero(num, n) {
				var len = num.toString().length;
				while (len < n) {
					num = "0" + num;
					len++;
				}
				return num;
			},
			inputChange() {
				console.log(this.dosage)
				this.startTime[this.showIndex] = (this.dosage/this.NowFluid).toFixed(2)
			},
			//获得aimId
			async getAimId() {
				const res = await this.$myRequest({
					url:websocketUrl,
					data:{
						"object_code": this.equipmentCode,
						"distinguish_code":"0"
					}
				})
				console.log('aimId',res.data.websocket_id)
				this.aimId = res.data.websocket_id
			},
			//连接
			connect(opration) {
				if(this.aimId === undefined ) {
					this.aimId = ''
				} 
				let actionInfo = {
					pump_code: this.pumpCode,
					open_time: this.startTime[this.showIndex],
					dosage: this.dosage + 'L'
				}
					let json={
						send_id: this.userId,                    //用户id
						equipment_code: this.equipmentCode,   //设备id      
						action: actionInfo,
						distinguish_code: "1",
						aim_id: this.aimId,
					}
				// console.log(backInfo)
				console.log(JSON.stringify(json))
				uni.sendSocketMessage({
					data:JSON.stringify(json)
				})
			},
			//开关选择器改变
			switchChange(e, pump, index, fluid_flow, code) {
				let value = e.target.value
				// this.$set(this.treatChecked,this.treatChecked[0], value) 
				this.$set(this.treatChecked, pump, value)
				if(value) {
					createWebSocket(wsUrl, this)
					this.$refs.popTime.show()
					this.showIndex = index
					this.NowFluid = parseInt(fluid_flow)
					this.pumpCode = code
				}
			},
			// switch1Change(e) {
			// 	let value = e.target.value
			// 	this.$set(this.treatChecked, 'checked1', value)   // 将点击改变的状态赋给treatChecked.checked1
			// 	if(value) {
			// 		createWebSocket(wsUrl, this)
			// 		this.$refs.pop1.show();
			// 	} else {
			// 		this.$refs.countdown1.pause()
			// 		this.connect('12')
			// 		uni.showLoading({
			// 			title:''
			// 		})
			// 		setTimeout(
			// 			()  => {
			// 				if(this.backInfo !== '12') {
			// 					uni.hideLoading()
			// 					this.$refs.pop12.show();
			// 					this.status1 = false
			// 					closeWebSocket()
			// 					// uni.showToast({
			// 					// 	title:'设备关闭失败，请检查设备！',
			// 					// 	icon:"none"
			// 					// })
			// 					// console.log(this.backInfo);
			// 				} else{
			// 					uni.hideLoading()
			// 					this.$refs.pop12.show();
			// 					this.status1 = false
			// 					closeWebSocket()
			// 				}
			// 			},1000 )
			// 	}
			// },
			//选择时间
			bindChange(e) {
				this.startTime[this.showIndex] = e
			},
			bindChange1(e) {
				this.startTime1 = e
				// console.log(this.startTime1)
			},
			commit() {
				if(  this.success === false ) {
					uni.showToast({
					    title: '请刷新页面,确保连接成功！',
						icon: "none"
					});
				} else{ 
					if(this.dosage === null) {
						uni.showToast({
						    title: '剂量不能为空',
							icon:"none"
						});
					}else {
						this.connect()
						uni.showLoading({
							title:''
						})
						setTimeout(
							()  => {
								if(this.backInfo !== '11') {
									uni.hideLoading()
									if(this.backInfo === '该设备未登录') {
										uni.showToast({
											title:'该设备未登录！',
											icon:"none"
										})
									} else {
										uni.showToast({
											title:'设备开启失败，请重新再试！',
											icon:"none"
										})
									}
								} else{
									this.$refs.popTime.close();
									this.status[this.showIndex] = true
									this.time[this.showIndex] = 0
									this.time[this.showIndex] = Number(this.startTime[this.showIndex])*1000
									// console.log(this.time)
									this.startTime[this.showIndex] = 0
									this.$forceUpdate()
								}
							},1000 )
					}
				}
			},
			// commit1() {
			// 	if( this.aimId === undefined || this.success === false ) {
			// 		uni.showToast({
			// 		    title: '请等待或刷新页面',
			// 			icon: "none"
			// 		});
			// 	} else{
			// 		if(this.startTime1 == 0) {
			// 			uni.showToast({
			// 			    title: '时间不能为0',
			// 				icon:"none"
			// 			});
			// 		}else {
			// 			this.connect('11')
			// 			uni.showLoading({
			// 				title:''
			// 			})
			// 			// console.log(this.backInfo)
			// 			setTimeout(
			// 				()  => {
			// 					if(this.backInfo !== '11') {
			// 						uni.hideLoading()
			// 						uni.showToast({
			// 							title:'设备开启失败，请重新再试！',
			// 							icon:"none"
			// 						})
			// 						// console.log(this.backInfo);
			// 					} else{
			// 						uni.hideLoading()
			// 						this.$refs.pop1.close();
			// 						this.status1 = true
			// 						this.time1 = 0
			// 						this.time1 = Number(this.startTime1)*1000
			// 						this.startTime1 = '0'
			// 						// console.log(this.backInfo);
			// 					}
			// 				},1000 )
			// 		}
			// 	}
			// },
			reset() {
				this.startTime[this.showIndex] = 0
				this.dosage = null
			},
			//倒计时结束后
			onFinish(pump, index) {
				this.$set(this.treatChecked, pump, false)
				this.status[index] = false
				console.log(this.status)
				uni.showLoading({
					title:''
				})
				uni.hideLoading()
				this.$refs.popFinish.show();
			},
			// onFinish1() {
			// 	this.$set(this.treatChecked, 'checked1', false)
			// 	this.status1 = false
			// 	this.connect('12')
			// 	uni.showLoading({
			// 		title:''
			// 	})
			// 	setTimeout(
			// 		()  => {
			// 			if(this.backInfo !== '12') {
			// 				uni.hideLoading()
			// 				this.$refs.pop12.show();
			// 				closeWebSocket()
			// 			} else{
			// 				uni.hideLoading()
			// 				this.$refs.pop12.show();
			// 				closeWebSocket()
			// 			}
			// 		},1000 )
			// },
			//点击弹窗外部分传来的值
			getFalse(num) {
				// this.$set(this.treatChecked, 'checked1', num)
				const me = this
				for(let i =0; i< me.pumps.length; i++) {
					me.$set(me.treatChecked, me.pumps[i].pump_name, num)
				}
				// console.log(this.treatChecked)
				const index = this.showIndex
				this.startTime[index] = 0
				this.time[index] = 0
				this.showIndex = null
				this.NowFluid = null
				this.pumpCode = null
				this.dosage = null
				closeWebSocket()
			},
			//获得剩余时间
			getRemain(e, index) {
				// this.remainTime[index] = e
				this.$set(this.remainTime, index, e)
				// console.log(this.remainTime[index])
			},
			getRemain1(remain) {
				this.remainTime1 = remain
				// console.log(this.remainTime1)
			}
		},
		components: {pop,uniNumberBox,tTable, tTh, tTr, tTd},
		watch:{
			'remainTime':{
				handler:function(newVal,oldVal) {
					// console.log('n',newVal)
					this.DoneTime[this.showIndex] = Number(this.time[this.showIndex]) - Number(newVal[this.showIndex])
					// console.log('已过', this.DoneTime[this.showIndex])
				},
				immediate: true,
				deep: true,
			},
			// 'remainTime2':{
			// 	handler:function(newVal,oldVal) {
			// 		this.DoneTime2 = Number(this.time2) - Number(newVal) 
			// 		// console.log("已过2",this.DoneTime2)
			// 	},
			// 	immediate: true,
			// 	deep: true,
			// },
			'backInfo':{
				handler:function(newVal,oldVal) {
					console.log('n',newVal,'o',oldVal)
				},
				immediate: true,
				deep: true,
			},
			'success':{
				handler:function(newVal,oldVal) {
				},
				immediate: true,
				deep: true,
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.equipmentControl{
		background: $background-color;
		padding-top: 30rpx;
		// height: 100%;
		padding-bottom: 30px;
		.item{
			box-shadow: 8rpx 8rpx 20rpx  #5774bc;
			background: #f4f4f4;
			width: 650rpx;
			padding: 20rpx;
			margin: 30rpx auto;
			border-radius: 30rpx;
			.title{
				margin-top: 20rpx;
				font-size: 35rpx;
				color: #3b466c;
				font-weight: bold;
				margin-left: 20rpx;
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
						width:190rpx;
						height: 190rpx;
						margin-left: 20rpx;
						margin-right: 40rpx;
					}
					.text{
						view:nth-child(1){
							font-size: 38rpx;
							font-weight: bold;
							margin-bottom: 20rpx;
						}
						view:nth-child(2){
							font-size: 28rpx;
							margin-top: 20rpx;
						}
						view:nth-child(3){
							font-size: 28rpx;
							margin-top: 20rpx;
							display: flex;
							height: 55rpx;
							line-height: 55rpx;
							.status{
								width: 100rpx;
								height: 55rpx;
								font-size: 28rpx;
								font-weight: 500;
								letter-spacing: 2px;
								text-align: center;
								border-radius: 15rpx;
								background: #84d3c9;
								color: #fff;
							}
						}
					}
				}
				.time{
					margin-left: 20rpx;
					margin-bottom: 20rpx;
					font-size: 40rpx;
					display: flex;
					justify-content: space-between;
					.custom {
						display: flex;
						font-size: 50rpx;
						
					}
					.custom :nth-child(even) {
						padding: 0 5upx;
					}
					.custom :nth-child(odd) {
						padding: 2upx 4upx;
						border-radius: 5upx;
						text-align: center;
					}
				}
			}
		}
		.pop{
			.tit{
				font-size: 50rpx;
				text-align: center;
			}
			.input{
				margin-top: 30rpx;
				display: flex;
				.label{
					height: 60rpx;
					width: 150rpx;
					span {
						margin-left: 30rpx;
						font-size: 35rpx;
						display: inline-block;
						line-height: 60rpx;
						height: 100%;
					}
				}
				.inputNum{
					border: 0.5rpx solid;
					margin-left: 54rpx;
					height: 56rpx;
					font-size: 35rpx;
					width: 200rpx;
					text-align:center;
				}
				.L {
					margin-left: 20rpx;
					font-size: 35rpx;
					line-height: 60rpx;
					height: 100%;
				}
			}
			.runtime{
				margin-top: 30rpx;
				margin-bottom: 30rpx;
				display: flex;
				.label{
					height: 60rpx;
					width: 200rpx;
					span {
						margin-left: 30rpx;
						font-size: 35rpx;
						display: inline-block;
						line-height: 60rpx;
						height: 100%;
					}
				}
				.inputNum{
					border: 0.5rpx solid;
					margin-left: 4rpx;
					height: 56rpx;
					font-size: 35rpx;
					width: 200rpx;
					text-align:center;
				}
				.L {
					margin-left: 20rpx;
					font-size: 35rpx;
					line-height: 60rpx;
					height: 100%;
				}
			}
			.seletTime{
				display: flex;
				height: 90rpx;
				line-height: 90rpx;
				margin: 30rpx auto;
				view:nth-child(1){
					margin-left: 30rpx;
					margin-right: 40rpx;
				}
				.selcet{
					margin: auto 0rpx;
					width: 240rpx;
					margin-right: 10rpx;
				}
			}
			.button{
				display: flex;
				button:nth-child(1) {
					background: #5675c6;
					color: #fff;
				}
				button:nth-child(2) {
					border: 1px solid #5675c6;
				}
			}
			
		}
	}
</style>

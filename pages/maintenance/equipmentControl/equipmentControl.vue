<template>
	<view class="equipmentControl">
		<view class="item">
			<view class="title">设备编号：{{equipmentCode}}</view>
			<!-- 阀1 -->
			<view class="list"  >
				<view class="line"></view>
				<view class="listitem" >
					<image src="../../../static/icon/itemfont.png" mode=""></image>
					<view class="text">
						<view>加药泵</view>
						<view>加药量：</view>
						<view>状态：<view class="status">启动</view></view>
					</view>
				</view>
				<view class="time">
					<countdown-timer ref="countdown1" :time="time1" @finish="onFinish1" @sendRemain='getRemain1' autoStart>
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
					<switch :checked="treatChecked.checked1"  color="#84d3c9" @change='switch1Change'  />
				</view>
			</view>
			<!-- 阀2 -->
			<view class="list">
				<view class="line"></view>
				<view class="listitem" >
					<image src="../../../static/icon/itemfont.png" mode=""></image>
					<view class="text">
						<view>排污泵</view>
						<view>加药量：</view>
						<view>状态：<view class="status">启动</view></view>
					</view>
				</view>
				<view class="time">
					<countdown-timer ref="countdown2" :time="time2" @finish="onFinish2" @sendRemain='getRemain2' autoStart>
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
					<switch :checked="treatChecked.checked2"  color="#84d3c9" @change='switch2Change'  />
				</view>
			</view>
		</view>
			<!-- 加药量设置时间弹窗 -->
		<pop ref="pop1" direction="center" :is_close="true" :is_mask="true" :width="80" @childVal='getFalse1'>
			<view class="pop">
				<view class="tit">运行时长设置</view>
				<view class="seletTime">
					<view >运行时长:</view>
					<uni-number-box class="selcet" :value="startTime1" @change="bindChange1"></uni-number-box>
					<view>秒</view>
				</view>
				<view class="button">
					<button type="default" @click="commit1">提交</button>
					<button @click="reset1">重置</button>
				</view>
			</view>
		</pop>
			<!-- 排污量设置时间弹窗 -->
		<pop ref="pop2" direction="center" :is_close="true" :is_mask="true" :width="80" @childVal='getFalse2'>
			<view class="pop">
				<view class="tit">运行时长设置</view>
				<view class="seletTime">
					<view >运行时长:</view>
					<uni-number-box class="selcet" :value="startTime2" @change="bindChange2"></uni-number-box>
					<view>秒</view>
				</view>
				<view class="button">
					<button type="default" @click="commit2">提交</button>
					<button @click="reset2">重置</button>
				</view>
			</view>
		</pop>
		<!-- 加药完毕弹窗 -->
		<pop ref="pop12" direction="center" :is_close="true" :is_mask="true" :width="80" @childVal='getFalse1' >
			<t-table border="1" border-color="#eee" class="table">
				<t-tr font-size="20" color="#fff" background="#f4bd5b" >
					<t-th align="center">设备执行反馈</t-th>
				</t-tr>
				<t-tr font-size="15" color="#5d6f61" >
					<t-td align="left">主机编号:</t-td>
					<t-td align="left">{{equipmentCode}}</t-td>
				</t-tr>
				<t-tr font-size="15" color="#5d6f61" >
					<t-td align="left">加药量:</t-td>
					<t-td align="left">已经过去{{this.DoneTime1}}毫秒</t-td>
				</t-tr>
				<t-tr font-size="15" color="#5d6f61" >
					<t-td align="left">执行结果:</t-td>
					<t-td align="left">成功</t-td>
				</t-tr>
			</t-table>
		</pop>
		<!-- 排污量完毕弹窗 -->
		<pop ref="pop22" direction="center" :is_close="true" :is_mask="true" :width="80" @childVal='getFalse2' >
			<t-table border="1" border-color="#eee" class="table">
				<t-tr font-size="20" color="#fff" background="#f4bd5b" >
					<t-th align="center">设备执行反馈</t-th>
				</t-tr>
				<t-tr font-size="15" color="#5d6f61" >
					<t-td align="left">主机编号:</t-td>
					<t-td align="left">{{equipmentCode}}</t-td>
				</t-tr>
				<t-tr font-size="15" color="#5d6f61" >
					<t-td align="left">排污量:</t-td>
					<t-td align="left">已经过去{{this.DoneTime2}}毫秒</t-td>
				</t-tr>
				<t-tr font-size="15" color="#5d6f61" >
					<t-td align="left">执行结果:</t-td>
					<t-td align="left">成功</t-td>
				</t-tr>
			</t-table>
		</pop>
	</view>
</template>

<script>
	import { equipmentUrl,websocketUrl } from '../../../util/urlList.js'
	import pop from "@/components/ming-pop/ming-pop.vue"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	import { createWebSocket ,closeWebSocket , websocket, backInfo } from '../../../common/websocket.js';
	export default {
		data() {
			return {
				equipmentId:'',
				equipmentCode:'',
				startTime1:'0',
				time1:0,
				treatChecked:{checked1:false,checked2:false},
				remainTime1:0,
				DoneTime1:0,
				startTime2:0,
				time2:0,
				remainTime2:0,
				DoneTime2:0,
				aimId:'',
				backInfo:''
			}
		},
		onLoad(e) {
			this.equipmentId = e.equipment_id
			this.getEquipmentCode()
			const url = 'ws://10.41.119.14:90';
			createWebSocket(url)
			this.getAimId();
			uni.$on('back',function(data) {
				this.backInfo = data.info
				console.log(this.backInfo)
			})
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
			//获得aimId
			async getAimId() {
				const res = await this.$myRequest({
					url:websocketUrl,
					data:{
						"object_id": this.equipmentId,
						"distinguish_code":"0"
					}
				})
				// console.log(res.data.websocket_id)
				this.aimId = res.data.websocket_id
			},
			//连接
			connect() {
				let json={
					send_id:"325",                         //用户id
					equipment_id: this.equipmentId,   //设备id      
					action: "打开",
					distinguish_code: "1",
					aim_id: this.aimId,
				}
				console.log(backInfo)
				console.log(JSON.stringify(json));
				websocket.send(JSON.stringify(json))
			},
			//开关选择器改变
			switch1Change(e) {
				let value = e.target.value
				this.$set(this.treatChecked, 'checked1', value)   // 将点击改变的状态赋给treatChecked.checked1
				if(value) {
					this.$refs.pop1.show();
				} else {
					this.$refs.countdown1.pause()
					this.$refs.pop12.show();
				}
			},
			switch2Change(e) {
				let value = e.target.value
				this.$set(this.treatChecked, 'checked2', value)   // 将点击改变的状态赋给treatChecked.checked1
				if(value) {
					this.$refs.pop2.show();
				} else {
					this.$refs.countdown2.pause()
					this.$refs.pop22.show();
				}
			},
			//选择时间
			bindChange1(e) {
				this.startTime1 = e
				// console.log(this.startTime1)
			},
			bindChange2(e) {
				this.startTime2 = e
			},
			commit1() {
				if(this.startTime1 == 0) {
					uni.showToast({
					    title: '时间不能为0',
						icon:"none"
					});
				}else {
					this.$refs.pop1.close();
					this.time1 = Number(this.startTime1)*1000
					this.startTime1 = '0'
					this.connect()
				}
			},
			reset1() {
				this.startTime1 = '0'
			},
			commit2() {
				if(this.startTime2 == 0) {
					uni.showToast({
					    title: '时间不能为0',
						icon:"none"
					});
				}else {
					this.$refs.pop2.close();
					this.time2 = Number(this.startTime2)*1000
					this.startTime2 = '0'
				}
			},
			reset2() {
				this.startTime2 = '0'
			},
			//倒计时结束后
			onFinish1() {
				this.$set(this.treatChecked, 'checked1', false)
				this.$refs.pop12.show();
			},
			onFinish2() {
				this.$set(this.treatChecked, 'checked2', false)
				this.$refs.pop22.show();
			},
			//点击弹窗外部分传来的值
			getFalse1(num) {
				this.$set(this.treatChecked, 'checked1', num)
				this.startTime1 = 0
				this.time1 = 0
			},
			getFalse2(num) {
				this.$set(this.treatChecked, 'checked2', num)
				this.startTime2 = 0
				this.time2 = 0
			},
			//获得剩余时间
			getRemain1(remain) {
				this.remainTime1 = remain
				// console.log(this.remainTime1)
			},
			getRemain2(remain) {
				this.remainTime2 = remain
				// console.log(this.remainTime2)
			},
		},
		components: {pop,uniNumberBox,tTable, tTh, tTr, tTd},
		watch:{
			'remainTime1':{
				handler:function(newVal,oldVal) {
					this.DoneTime1 = Number(this.time1) - Number(newVal) 
					// console.log("已过1",this.DoneTime1)
				},
				immediate: true,
				deep: true,
			},
			'remainTime2':{
				handler:function(newVal,oldVal) {
					this.DoneTime2 = Number(this.time2) - Number(newVal) 
					// console.log("已过2",this.DoneTime2)
				},
				immediate: true,
				deep: true,
			},
			// 'backInfo':{
			// 	handler:function(newVal,oldVal) {
			// 		console.log('n',newVal,'o',oldVal)
			// 	},
			// 	immediate: true,
			// 	deep: true,
			// }
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
		height: 100%;
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
			.seletTime{
				display: flex;
				height: 90rpx;
				line-height: 90rpx;
				margin: 30rpx auto;
				view:nth-child(1){
					margin-left: 50rpx;
					margin-right: 40rpx;
				}
				.selcet{
					margin: auto 0rpx;
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

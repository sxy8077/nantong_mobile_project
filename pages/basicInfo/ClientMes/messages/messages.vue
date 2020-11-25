<template>
	<view>
	<view class="line"></view>
	<view class="block">
		<view class="title">
			<text>客户信息详情</text>
		</view>
		<view class="table">
			<view class="content">
				<view class="lines"></view>
				<view class="name">客户编号:</view>
				<view class="message">{{tableList.client_code}}</view>
			</view>
			<view class="content">
				<view class="lines"></view>
				<view class="name">客户单位:</view>
				<view class="message">{{tableList.client_unit}}</view>
			</view>
			<view class="content">
				<view class="lines"></view>
				<view class="name">客户地址:</view>
				<view class="message">{{tableList.client_address}}</view>
			</view>
			<view class="content">
				<view class="lines"></view>
				<view class="name">客户邮编:</view>
				<view class="message">{{tableList.client_zip_code}}</view>
			</view>
			<view class="content">
				<view class="lines"></view>
				<view class="name">客户行业:</view>
				<view class="message">{{tableList.client_industry}}</view>
			</view>
			<view class="content">
				<view class="lines"></view>
				<view class="name">单位电话:</view>
				<view class="message">{{tableList.unit_phone}}</view>
			</view>
			<view class="content">
				<view class="lines"></view>
				<view class="name">单位传真:</view>
				<view class="message">{{tableList.unit_fax}}</view>
			</view>
			<view class="content">
				<view class="lines"></view>
				<view class="name">地区: </view>
				<view class="message">{{tableList.region}}</view>
			</view>
			<view class="content">
				<view class="lines"></view>
				<view class="name">备注: </view>
				<view class="message">{{tableList.note}}</view>
			</view>
		</view>
		<view class="button">
			<button size="mini" type="default" @click="topop" class="blue">查看联系人</button>
			<button size="mini" type="default" @click="pop" class="yellow">新增联系人</button>
		</view>
		<!-- 查看联系人弹窗内容 -->
		<pop ref="pop" direction="center" :is_close="true" :is_mask="true" :width="94">
			<view class="goclient">
				<view class="table2" v-for="(item,index) in clientList" v-bind:key='item.aid'>
					<view class="contact" >
						<view class="photo" >
							<image style="width: 80rpx;height:80rpx; " 
								:mode="array.mode" :src="src">
							</image>
						</view>
						<view class="item">
							<view>联系人:{{item.contact_person}}</view>
							<view>联系人职位:{{item.contact_position}}</view>
							<view>联系人电话:{{item.contact_tel}}</view>
							<view>备注:{{item.remark}}</view>
						</view>
					</view>
				</view>
			</view>
		</pop>
		<!-- 新增联系人弹窗内容 -->
		<pop ref="pops" direction="center" :is_close="true" :is_mask="true" :width="90">
			<view class="addpop">
				<view class="addClient">
					<span style="height: 40rpx;">联系人:</span>
					<input  class="add" v-model="inputValue.contact_person"/>
				</view>
				<view class="addClient">
					<span style="height: 40rpx;">联系人职位:</span>
					<input  class="add" v-model="inputValue.contact_position"/>
				</view>
				<view class="addClient">
					<span style="height: 40rpx;">联系人电话:</span>
					<input  class="add" v-model="inputValue.contact_tel"/>
				</view>
				<view class="addClient">
					<span style="height: 40rpx;">备注:</span>
					<input  class="add" v-model="inputValue.remark"/>
				</view>
				<view class="save">
					<button size="mini" class="yellow" @click="getclient">保存</button>
					<button size="mini" class="blue" @click="clear">重置</button>
				</view>
			</view>
		</pop>
	</view>
	</view>
</template>

<script>
	import pop from '@/components/ming-pop/ming-pop.vue';
	import {  originalUrl,contactUrl } from '../../../../util/urlList.js'
	export default {
		 components: {pop},
		data() {
			return {
				tableList:[],
				clientList:[],
				array: [{
				            mode: 'scaleToFill',    
				         }],
				src:'../../../../static/icon/photo.png',
				inputValue:[]
			}
		},
		methods:{
			//拿到客户信息
			async getMessages(){
				const res = await this.$myRequest({
					url:'client/'+this.aid
				})
				console.log(res.data)
				this.tableList = res.data
			
			},
			//拿到联系人数据
			async getClientMes(){
				const res = await this.$myRequest({
					url:'app/ClientContactPeople/',
					data:{
						client_id:this.aid
					}
				})
				console.log(res.data.data)
				this.clientList = res.data.data
			},
			//联系人展示弹窗
			topop() {
				this.$refs.pop.show();
			},
			//展示新增联系人弹窗
			pop(){
				this.$refs.pops.show();
			},
			//新增联系人
			getclient(){
				uni.request({
					url:  originalUrl + contactUrl,
					method:'POST',
					data:{
						contact_person:this.inputValue.contact_person,
						contact_position:this.inputValue.contact_position,
						contact_tel:this.inputValue.contact_tel,
						remark:this.inputValue.remark,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded', 
						/* token:token */
					},
					dataType:'json',
					success: (res) => {
							console.log(res.data);
							/* this.clientList = res.data */
							this.inputValue = ''
						}
				})
			},
			//弹框重置
			clear(){
				this.inputValue = ''
			}
			
		},
		onLoad(options) {
			this.aid = options.aid
			this.getMessages()
			this.getClientMes()
		}
	}
</script>

<style lang="scss">
	page{
		background:#607fcc ;
	}
	.line{
		width: 100%;
		height: 4rpx;
		background: white;
	}
	.block{
		width: 710rpx;
		height: auto;
		border: 1px solid #f4bd5b;
		border-radius: 40rpx;
		background: #fff;
		margin: 60rpx 20rpx;
		.title{
			font-size: 20px;
			color: #607fcc;
			font-weight:bold;
			text-align: center;
			margin-top: 60rpx;
		}
		.table{
			width:710rpx;
			height: auto;
			margin-top: 40rpx;
			.lines{
				width: 660rpx;
				height: 2rpx;
				background:#607fcc;
				margin-top: 20rpx;
				margin-left:25rpx ;
			}
			.content{
				height: auto;
				.name{
					font-size: 36rpx;
					margin-top: 20rpx;
					margin-left: 50rpx;
				}
				.message{
					font-size: 36rpx;
					margin-top: 10rpx;
					margin-left: 60rpx;
				}
			}	
		}
		//按钮
		.button{
			width: 600rpx;
			display: flex;
			justify-content: space-between;
			margin: 40rpx 75rpx;
			.yellow{
				background: #f4bd5b;
				color: white;
			}
			.blue{
				background: #607fcc;
				color: white;
			}
		}
		//查看联系人弹窗
		.goclient{
			margin-top: 20px;
			.table2{
				width: 88;
				height: auto;
				border: 1px solid #9eafdb;
				border-radius: 10rpx;
				margin: 20rpx 2;
				.contact{
					display: flex;
					flex-direction: row;
					.photo{
						width: 80rpx;
						height: 80rpx;
						margin-top: 60rpx;
						margin-left: 35rpx;
					}
					.item{
						line-height: 52rpx;
						margin-left: 20rpx;
					}
				}
			}
		}
		//新增联系人弹窗
		.addpop{
			width: 98%;
			height: auto;
			border: 1px solid #9eafdb;
			border-radius: 10rpx;
			margin-top: 20px;
			.addClient{
				width: 90%;
				display: flex;
				justify-content: space-between;
				margin-top: 20px;
				margin-left: 20rpx;
				span {
					display: inline-block;
				}
				.add{
					font-size: 20rpx;
					height: 40rpx;
					border: 1px solid #9eafdb;
					width: 360rpx;
					border-radius: 4rpx;
					background: #fff;
					color: black;
				}
			}
			.save{
				width: 540rpx;
				height: 60rpx;
				display: flex;
				flex-direction: row;
				margin: 40rpx 20rpx;
			}
			.yellow{
				background: #f4bd5b;
				color: white;
			}
			.blue{
				background: #607fcc;
				color: white;
			}
		}
	}
</style>

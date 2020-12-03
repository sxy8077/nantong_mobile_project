<template>
	<view class="pages">
		<!-- 搜索区 -->
		<view class="gary">
			<view class="header">
				<view class="label"><span >客户单位:</span></view>
				<input  type="text"  confirm-type="search" v-model="client_unit" />
			</view>
			<view class="button">
				<button 
					size="mini" 
					:style="{ background: color }" 
					@click="search" 
					class="blue"
					@touchstart="background"
					@touchend="background2">
				搜索</button>
				<button size="mini" @click="reset" class="border">重置</button>
				<button class="yellow" size="mini" @click="addClient">新增客户</button>
			</view>
			<!-- 弹窗内容 -->
			<pop ref="pop" direction="center" :is_close="true" :is_mask="true" :width="90">
				<view class="pops">
					<view class="addClient">
						<span style="height: 40rpx;">客户编号:</span>
						<input  class="add" v-model="client_code"/>
					</view>
					<view class="addClient">
						<span style="height: 40rpx;">客户单位:</span>
						<input  class="add" v-model="client_unit"/>
					</view>
					<view class="addClient">
						<span style="height: 40rpx;">客户地址:</span>
						<input  class="add" v-model="client_address"/>
					</view>
					<view class="addClient">
						<span style="height: 40rpx;">客户邮编:</span>
						<input  class="add" v-model="client_zip_code"/>
					</view>
					<view class="addClient">
						<span style="height: 40rpx;">客户行业:</span>
						<input  class="add" v-model="client_industry"/>
					</view>
					<view class="addClient">
						<span style="height: 40rpx;">单位电话:</span>
						<input  class="add" v-model="unit_phone"/>
					</view>
					<view class="addClient">
						<span style="height: 40rpx;">单位传真:</span>
						<input  class="add" v-model="unit_fax"/>
					</view>
					<view class="addClient">
						<span style="height: 40rpx;">地区:</span>
						<input  class="add" v-model="region"/>
					</view>
					<view class="addClient">
						<span style="height: 40rpx;">备注:</span>
						<input  class="add" v-model="note"/>
					</view>
					<view class="save">
						<button 
							size="mini" 
							class="yellow" 
							@click="save"
						>保存</button>
						<button size="mini" class="blue" @click="resets">重置</button>
					</view>
				</view>
			</pop>
		</view>
		<!-- 信息展示区 -->
		<view class="messages_list">
			<view class="news">客户信息</view>
				<view class="messages_item" v-for="(item,index) in clientList" v-bind:key='item.id' @click="goMesDetail(item.aid)">
					<view class="line"></view>
					<view class='setting'>
						<image class="picture"
							style="width: 60px;height:60px; " 
							:mode="array.mode" :src="src" >
						</image>
						<view class="name">
							<view>客户信息</view>
							<text>客户单位：{{item.client_unit}}</text>
						</view>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	import {  originalUrl,messageCUrl } from '../../../util/urlList.js'
	import pop from '@/components/ming-pop/ming-pop.vue'
	import { throttle } from '@/common/throttle.js'
	export default {
		components:{pop},
		data() {
			return{
				array: [{
				            mode: 'scaleToFill',    
				         }],
				src:'../../../static/icon/itemfont.png',	 
				clientList:[],
				Page: 1,
				size: 10,
				count: 0,
				onsearch: false,
				color: '#5675c6',
				client_unit:'',
				client_code:'',
				client_address:'',
				client_zip_code:'',
				client_industry:'',
				unit_phone:'',
				unit_fax:'',
				region:'',
				note:''
			}
		},
		methods: {
			//拿到页面数据
			async getClientunit(){
				const res = await this.$myRequest({
					url:messageCUrl,
					data:{
						size: this.size
					}
				})
				/* console.log(res) */
				this.clientList = res.data.results
				/* console.log(2222,res.data.count) */
				this.count = res.data.count;
				uni.hideLoading();
			},
			//页面跳转
			goMesDetail(aid){
				uni.navigateTo({
					url:'messages/messages?aid='+aid
				})
			},
			//搜索框重置
			reset:throttle(function(){
				uni.showLoading();
				this.page = 1;
				this.count = 0;
				this.onsearch = false;
				this.client_unit = '';
				this.getClientunit();
			}),
			//点击搜索
			search:throttle(function(){
				uni.showLoading();
				this.onsearch = true;
				/* this.clientList = [], */
				this.count = 0;
				this.currentPage = 1;
				this.getsearch();
			}),
			background() {
				this.color = "#dedede";
			},
			background2() {
				this.color = "#5675c6";
			},
			//获取搜索内容
			async getsearch(){
				const res = await this.$myRequest({
					url:messageCUrl,
					data:{
						size: this.size,
						client_unit:this.client_unit
					}
				})
				uni.hideLoading()
				if(res.data.count === 0){
					uni.showToast({
						icon: "none",
						title: "没有要查询的内容"
					})
				}
				/* console.log(res) */
				this.clientList = res.data.results
				/* console.log(res.data.count) */
				this.count = res.data.count;
			},
			//展示弹窗
			addClient(){
				this.$refs.pop.show();
			},
			//发送数据
			save(){
				uni.request({
					url:  originalUrl + messageCUrl,
					method:'POST',
					data:{
						client_code:this.client_code,
						client_unit:this.client_unit,
						client_address:this.client_address,
						client_zip_code:this.client_zip_code,
						client_industry:this.client_industry,
						unit_phone:this.unit_phone,
						unit_fax:this.unit_fax,
						region:this.region,
						note:this.note
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded', 
					},
					dataType:'json',
					success: (res) => {
							/* console.log(res.data); */
							this.client_code='',
							this.client_unit='',
							this.client_address='',
							this.client_zip_code='',
							this.client_industry='',
							this.unit_phone='',
							this.unit_fax='',
							this.region='',
							this.note='',
							this.getClientunit(),
							this.$refs.pop.close()
						},
					fail:(res) => {
						this.client_code='',
						this.client_unit='',
						this.client_address='',
						this.client_zip_code='',
						this.client_industry='',
						this.unit_phone='',
						this.unit_fax='',
						this.region='',
						this.note='',
						message.warning('新建客户失败，请重试')
					}
				})
			},
			//弹框内容重置
			resets(){
				this.client_code='',
				this.client_unit='',
				this.client_address='',
				this.client_zip_code='',
				this.client_industry='',
				this.unit_phone='',
				this.unit_fax='',
				this.region='',
				this.note=''
			},
		},
		onLoad(){
			this.getClientunit()
		},
	}
</script>

<style lang="scss" scoped>
	//搜索框部分样式
	.gary{
		box-shadow: 8rpx 8rpx 20rpx  #eaecf0;
		background: #f4f4f4;
		width: 650rpx;
		padding: 20rpx;
		margin: 20rpx auto;
		border-radius: 30rpx;
		.header{
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
				height: 56rpx;
				font-size: 35rpx;
				border: 1px solid #f4bd5b;
				width: 100%;
				background: #fff;
			}
		}
		.button{
			width: 650rpx;
			display: flex;
			flex-direction: row;
			margin: 50rpx 20rpx;
		}
		.yellow{
			background: #f4bd5b;
			color: white;
		}
		.border{
			border: 1px solid #607fcc;
		}
		.blue{
			background: #607fcc;
			color: white;
		}
	}
	//客户信息部分样式
	.messages_list{
		box-shadow: 8rpx 8rpx 20rpx  #eaecf0;
		background: #f4f4f4;
		width: 650rpx;
		padding: 20rpx;
		margin: 30rpx auto;
		border-radius: 30rpx;
		.news{
			margin-top: 20rpx;
			font-size: 30rpx;
			color: #3b466c;
		}
		.line{
			border-bottom: 2px solid #cccccc;
			margin-top: 20rpx;
		}
		.messages_item{
			width: 100%;
			height: 90px;
			overflow: hidden;
			margin-bottom: 1px;
			.setting{
				height: 45rpx;
				display: flex;
				flex-direction: row;
				.picture{
					margin: 15px 10px 15px 30px;
				}
				.name{
					margin: 15px 20px;
					line-height: 30px;
				}
			}	
		}
	}
	//弹窗样式
	.pops{
		width: 98%;
		height: auto;
		border: 1px solid #9eafdb;
		border-radius: 10rpx;
		margin-top: 20px;
		.addClient{
			width: 95%;
			display: flex;
			justify-content: space-between;
			margin-top: 20px;
			margin-left: 14rpx;
			span {
				display: inline-block;
			}
			.add{
				font-size: 20rpx;
				margin-left: 20rpx;
				height: 40rpx;
				border: 1px solid #9eafdb;
				width: 400rpx;
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
			margin: 30rpx 20rpx;
		}
	}
	
</style>

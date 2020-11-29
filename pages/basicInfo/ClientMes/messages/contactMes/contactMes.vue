<template>
	<view class="border">
		<view class="a">
			<text  v-if="test">暂时没有联系人</text>
		</view>
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
			<button size="mini"  class="blue" @click="addContact">添加联系人</button>
		</view>
		<!-- 弹窗内容 -->
		<pop ref="pop" direction="center" :is_close="true" :is_mask="true" :width="90">
			<view class="addpop">
				<view class="addClient">
					<span style="height: 40rpx;">联系人:</span>
					<input  class="add" v-model="contact_person"/>
				</view>
				<view class="addClient">
					<span style="height: 40rpx;">联系人职位:</span>
					<input  class="add" v-model="contact_position"/>
				</view>
				<view class="addClient">
					<span style="height: 40rpx;">联系人电话:</span>
					<input  class="add" v-model="contact_tel"/>
				</view>
				<view class="addClient">
					<span style="height: 40rpx;">备注:</span>
					<input  class="add" v-model="remark"/>
				</view>
				<view class="save">
					<button size="mini" class="yellow" @click="getclient">保存</button>
					<button size="mini" class="blue" @click="clear">重置</button>
				</view>
			</view>
		</pop>
	</view>
</template>

<script>
	import { ClientContactUrl,originalUrl, contactUrl } from "../../../../../util/urlList.js"
	import pop from '@/components/ming-pop/ming-pop.vue'
	export default {
		components: {pop},
		data() {
			return {
				clientList:[],
				array: [{
				            mode: 'scaleToFill',    
				         }],
				src:'../../../../../static/icon/photo.png',
				size: 10,
				contact_person:'',
				contact_position:'',
				contact_tel:'',
				remark:'',
				count: 0,
				test: false
			}
		},
		//watch来响应数据的变化，count是监视对象
		watch: {  
		            count: {
						handler(){
							if(this.count > 0){
								this.test = false;
							}else{
								this.test = true;
							}
						},
						immediate: true
					}
		        },
		methods: {
			//拿到联系人数据
			async getClientMes(){
				const res = await this.$myRequest({
					url:ClientContactUrl,
					data:{
						client_id:this.aid,
						size:this.size
					}
				})
				/* console.log(111,res.data.data) */
				this.clientList = res.data.data
				this.count = res.data.count;			
			},
			//展示弹窗
			addContact(){
				this.$refs.pop.show();
			},
			//添加联系人
			getclient(){
				uni.request({
					url:  originalUrl + contactUrl,
					method:'POST',
					data:{
						contact_person:this.contact_person,
						contact_position:this.contact_position,
						contact_tel:this.contact_tel,
						remark:this.remark,
						client_id: this.aid
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded', 
					},
					dataType:'json',
					success: (res) => {
							/* console.log(res.data); */
							this.contact_person='',
							this.contact_position='',
							this.contact_tel='',
							this.remark='',
							this.getClientMes()
							this.$refs.pop.close();
						},
					fail:(res) => {
						this.contact_person='',
						this.contact_position='',
						this.contact_tel='',
						this.remark='',
						message.warning('新建联系人失败，请重试')
					}
				})
			},
			//弹框重置
			clear(){
				this.contact_person='',
				this.contact_position='',
				this.contact_tel='',
				this.remark=''
			}	        
		},
		onLoad(options){
			this.aid = options.aid
			this.getClientMes()
		}
	}
</script>

<style lang="scss">
	.a{
		margin: 50rpx 220rpx;
		text{
			font-size: 40rpx;
			color: #9eafdb;
		}
	}
	//查看联系人
	.goclient{
		width: 600rpx;
		margin-top: 80rpx;
		margin-left:75rpx ;
		.table2{
			width:500rpx;
			height: auto;
			border: 1px solid #9eafdb;
			border-radius: 30rpx;
			margin: 20rpx 50rpx;
			.contact{
				display: flex;
				flex-direction: row;
				.photo{
					width: 60rpx;
					height: 60rpx;
					margin-top: 60rpx;
					margin-left: 35rpx;
				}
				.item{
					line-height: 52rpx;
					margin-left: 40rpx;
				}
			}
		}
		.blue{
			background: #9eafdb;
			color: white;
			margin: 40rpx 200rpx;
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
</style>

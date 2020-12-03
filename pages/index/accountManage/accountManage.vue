<template>
	<view>
		<!-- 搜索区 -->
		<view class="gary">
			<view class="account">
				<view class="label"><span>账户名：</span></view>
				<input  type="text"  confirm-type="search"  v-model="account"/>
			</view>
			<view class="account">
				<view class="label"><span class="title">角色：</span></view>
				<picker 
					mode="selector"
					:range="allRolename"
					class="picker"
					:value="role_name"
					@change="getRolename"
					:style="{ color: role_name===''? '#ccc' : null }"
				>
					<view >{{allRolename[role_name]}}</view>
				</picker>
			</view>
			<view class="button">
				<button 
					size="mini" 
					@click="search" 
					class="blue"
					:style="{ background: color }" 
					@touchstart="background"
					@touchend="background2"
					>搜索
				</button>
				<button size="mini" @click="reset" class="border">重置</button>
			</view>
		</view>
		<!-- 内容展示区 -->
		<view class="messages_list">
			<button class="role"  size="mini" @click="gorolePower">角色权限查看</button>
			<view class="messages_item" v-for="(item,index) in accountList" v-bind:key='item.aid' >
				<view class="line"></view>
				<view class='setting'>
					<image class="picture"
						style="width: 60px;height:60px; " 
						:mode="array.mode" :src="src" >
					</image>
					<view >
						<view class="mes">
							<view class="name">姓名:{{item.name}}</view>
							<view>账号:{{item.account}}</view>
							<view>角色:{{getRoler(item)}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { user,role } from '../../../util/urlList.js'
	import { getKeyByValue } from '../../../common/getKeyByValue.js'
	import { throttle } from '@/common/throttle.js'
	export default {
		data() {
			return {
				accountList:[],
				array: [{
				            mode: 'scaleToFill',    
				         }],
				src:'../../../static/icon/itemfont.png',
				currentPage: 1,
				size: 20,
				count: 0,
				color: '#5675c6',
				onsearch: false,
				rolesObject:{},
				allRolename: [ "设备维护","设备管理","客户经理","客户"],
				role_name: '',
				account:'',
				role_id:'',
				key:''
			}
		},
		methods: {
			//获取账户信息
			 async getaccount(){
				const res = await this.$myRequest({
					url:user,
					data:{
						size:this.size
					}
				})
				/* console.log(1111,res) */
				this.accountList = res.data.results
			},
			//获取角色信息
			async getrole(){
				const res = await this.$myRequest({
					url:role,
				})
				// console.log(2222,res)
				const rolesObject = {}
				for (let i = 0; i < res.data.length; i++) {
				   rolesObject[res.data[i]['aid']] = res.data[i]['role_name']
				}
				//console.log(222,rolesObject)/* 拿到四种角色的键值对  这个对象 */
				this.rolesObject = rolesObject
			},
			//这里的item为accountList的item
			getRoler(item) {
				if (this.rolesObject) {
				       return this.rolesObject[item['role_id']]
				    }
				 return ''
			},
			//下拉框选择内容
			getRolename: function(e) {
						/* console.log(e.target.value)拿的是对应的索引值 */  
			            this.role_name = e.target.value
			        },
			//查看权限内容
			gorolePower(){
				uni.navigateTo({
					url:'rolePower/rolePower'
				})
			},
			//搜索
			search: throttle(function(){
				uni.showLoading();
				this.onsearch = true;
				this.count = 0;
				this.currentPage = 1;
				this.getRoleids()
				this.getsearch();
			}),
			background() {
				this.color = "#dedede";
			},
			background2() {
				this.color = "#5675c6";
			},
			//重置
			reset: throttle(function(){
				uni.showLoading();
				this.account='',
				this.currentPage = 1;
				this.count = 0;
				this.onsearch = false;
				this.role_name='',
				this.getaccount()
				this.getrole()
			}),
			//获取搜索内容
			async getsearch(){
				const res = await this.$myRequest({
					url:user,
					data:{
						size:this.size,
						account:this.account,
						role_id:this.key
					}
				})
				uni.hideLoading()
				if(res.data.count === 0){
					uni.showToast({
						icon: "none",
						title: "没有要查询的内容"
					})
				}
				/* console.log(22222,res) */
				this.accountList = res.data.results
				this.count = res.data.count;
			},
			//拿到role_id
			getRoleids(){
				this.key = getKeyByValue(this.rolesObject,this.allRolename[this.role_name]);
			}
		},
		
		onLoad(){
			this.getaccount()
			this.getrole()
			this.getsearch()	
		}
	}
</script>

<style lang="scss">
	//搜索区域样式
	.gary{
		box-shadow: 8rpx 8rpx 20rpx  #eaecf0;
		background: #f4f4f4;
		width: 650rpx;
		padding: 20rpx;
		margin: 20rpx auto;
		border-radius: 30rpx;
		.account{
			margin-top: 30rpx;
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
			.picker{
				height: 56rpx;
				font-size: 35rpx;
				border: 1px solid #f4bd5b;
				width: 100%;
				background: #fff;
				line-height: 50rpx;
				text-align: center;
			}
		}
		.button{
			width: 650rpx;
			display: flex;
			flex-direction: row;
			margin-top: 40rpx;
			margin-bottom: 30rpx;
		}
		.border{
			border: 1px solid #607fcc;
		}
		.blue{
			background: #607fcc;
			color: white;
		}
	}
	//账户信息部分样式
	.messages_list{
		box-shadow: 8rpx 8rpx 20rpx  #eaecf0;
		background: #f4f4f4;
		width: 650rpx;
		padding: 20rpx;
		margin: 30rpx auto;
		border-radius: 30rpx;
		.role{
			border: 1rpx solid #607fcc;
			background: #607fcc;
			color: white;
			margin: 20rpx 40rpx;
		}
		.line{
			width: 670rpx;
			height: 1rpx;
			background:#cccccc;
			margin-left: 5rpx;
		}
		.messages_item{
			width: 100%;
			height: auto;
			overflow: hidden;
			margin-bottom: 1px;
			.setting{
				display: flex;
				flex-direction: row;
				.picture{
					margin: 15px 10px 15px 15px;
				}
			}
			.mes{
				margin-top:20rpx;
				margin-left: 10px;
				line-height: 50rpx;
			}
		}
	}
</style>

<template>
	<view>
		<!-- 搜索区 -->
		<view class="gary">
			<view class="account">
				<span class="title">账户名：</span>
				<input class="input" type="text" maxlength="500rpx" confirm-type="search"  v-model="account"/>
			</view>
			<view class="roles">
				<span class="title">角色：</span>
				<picker 
					mode="selector"
					:range="allRolename"
					class="input"
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
						style="width: 80px;height:80px; " 
						:mode="array.mode" :src="src" >
					</image>
					<view >
						<view class="a">
							<text>账户信息</text>
							<view class="name">姓名:{{item.name}}</view>
						</view>
						<view class="mes">
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
				rolesObject:null,
				allRolename: ["设备维护","设备管理","客户经理","客户"],
				role_name: '',
				account:'',
				role_id:null
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
				/* console.log(222,rolesObject)拿到四种角色的键值对  这个对象*/
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
			/* search(){
				this.onsearch = true;
				
				this.count = 0;
				this.currentPage = 1;
				this.getsearch();
			}, */
			background() {
				this.color = "#dedede";
			},
			background2() {
				this.color = "#5675c6";
			},
			//重置
			reset(){
				this.account='',
				this.currentPage = 1;
				this.count = 0;
				this.onsearch = false;
				this.role_name='',
				this.getaccount()
				this.getrole()
				this.getRoler()
			},
			//获取搜索内容
			async getsearch(){
				const res = await this.$myRequest({
					url:user,
					data:{
						size:this.size,
						account:this.account,
					
					}
				})
				/* console.log(22222,res) */
				this.clientList = res.data.results
			},
			
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
		width: 680rpx;
		height: auto;
		border: 0.5px solid #DCDCDC;
		border-radius: 30rpx;
		background: #f4f4f4;
		margin: 60rpx 35rpx;
		.account{
			width: 610rpx;
			margin-top: 25px;
			margin-left: 35rpx;
			display: flex;
			justify-content: space-between;
			.title{
				line-height: 80rpx;
				font-size: 15px;
				color:black;
			}
			.input{
				text-align: left;
				font-size: 40rpx;
				height: 48rpx;
				border: 1px solid #f4bd5b;
				width: 480rpx;
				border-radius: 10rpx;
				background: #fff;
				color: black;
				margin-top: 10rpx;
			}
		}
		.roles{
				width: 610rpx;
				margin-left: 35rpx;
				display: flex;
				justify-content: space-between;
				.title{
					line-height: 80rpx;
					font-size: 15px;
					color:black;
				}
				.input{
					text-align: left;
					font-size: 40rpx;
					height: 48rpx;
					border: 1px solid #f4bd5b;
					width: 480rpx;
					border-radius: 10rpx;
					background: #fff;
					color: black;
					margin-top: 10rpx;
				}
		}
		.button{
			width: 650rpx;
			display: flex;
			flex-direction: row;
			margin-top: 40rpx;
			margin-bottom: 40rpx;
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
		width: 680rpx;
		height: auto;
		border: 0.5px solid #DCDCDC;
		border-radius: 30rpx;
		background: #f4f4f4;
		margin: 60rpx 35rpx;
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
				.a{
					width: auto;
					display: flex;
					flex-direction: row;
					margin: 15px 10px 0 10px;
					line-height: 30px;
					.name{
						margin-left: 40rpx;
					}
				}
			}
			.mes{
				margin-top:10rpx;
				margin-left: 10px;
				line-height: 50rpx;
			}
		}
	}
</style>

<template>
	<view>
		<!-- 搜索区 -->
		<view class="gary">
			<view class="account">
				<span class="title">账户名：</span>
				<input class="input" type="text" maxlength="500rpx" confirm-type="search"  />
			</view>
			<view class="roles">
				<span class="title">角色：</span>
				<input class="input" type="text" maxlength="500rpx" confirm-type="search" />
			</view>
			<view class="button">
				<button size="mini" @click="search" class="blue">搜索</button>
				<button size="mini" @click="reset" class="border">重置</button>
			</view>
		</view>
		<!-- 内容展示区 -->
		<view class="messages_list">
			<button class="role"  size="mini" @click="gorolePower">角色权限查看</button>
			<view class="messages_item" v-for="(item,index) in accountList" v-bind:key='item.id' >
				<view class="line"></view>
				<view class='setting'>
					<image class="picture"
						style="width: 60px;height:60px; " 
						:mode="array.mode" :src="src" >
					</image>
					<view class="name">
						<text>账户信息</text>
					</view>
				</view>
				<view>
					<view>姓名:{{item.name}}</view>
					<view>账号:{{item.account}}</view>
					<view>角色:{{item.role_id}}</view>
				</view>
				<view class="lines"></view>
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
			}
		},
		methods: {
			//获取账户信息
			 async getaccount(role_id){
				const res = await this.$myRequest({
					url:user,
				})
				console.log(res)
				/* this.accountList = res.data.results */
			},
			//获取角色信息
			async getrole(){
				const res = await this.$myRequest({
					url:role,
					data:{
						aid:this.role_id
					}
				})
				console.log(res)
			},
			//查看权限内容
			gorolePower(){
				uni.navigateTo({
					url:'rolePower/rolePower'
				})
			}
			
		},
		onLoad(options){
			this.role_id = options.role_id
			this.getaccount()
			this.getrole()
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
			width: 640rpx;
			margin-top: 25px;
			margin-left: 20rpx;
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
				width: 640rpx;
				/* margin-top: 25px; */
				margin-left: 20rpx;
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
			background:#3b466c;
			margin-left: 5rpx;
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
		.lines{
			width: 600rpx;
			height: 2rpx;
			background:#cccccc;
			margin-left:40rpx ;
			margin-top: 134rpx;
		}
	}
</style>

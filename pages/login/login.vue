<style lang="scss" scoped>
</style>
<template>
    <view>
        <view class="input-box">
            <view class="input-item">
                <view class="input-label">账号</view>
				<view class="input-body">
					<input v-model="userName"  type="text" placeholder="请输入账号admin" class="input" >
				</view>
            </view>
            <view class="input-item">
				<view class="input-label">密码</view>
				<view class="input-body">
					<input v-model="password" type="text" :password="isHidePassword?true:false" style="margin-right: 50upx;" placeholder="请输入密码1234567" maxlength="20"  class="input" />
					<image @click="isHidePasswordClick" class="eye" :src="isHidePassword?'/static/img/attention.png':'/static/img/attention_forbid.png'"></image>
				</view>
            </view>
        </view>
        <button class="button" @click="submit">登录</button>
    </view>
</template>
<script>
	import {checkPwd} from "@/common/common.js"
	export default {
		data() {
			return {
				isHidePassword:true,
				userName:"",
				password:""
			};
		},
		onLoad() {
		},
		methods: {
			isHidePasswordClick(){
				this.isHidePassword=!this.isHidePassword
			},
			submit() {
				// if(!checkuserName(this.userName)){
				// 	return;
				// };
				if(!checkPwd(this.password)){
					return;
				};
				/*
				* 登录逻辑
				*/
				this.$store.commit('update',['isLogin',true]);
				// uni.reLaunch({
				// 	url:'/pages/index/index'
				// })
					if(this.userName === "admin" && this.password === "1234567"){
						 // 验证成功跳转目标页面 
						 uni.reLaunch({
						 	url:'/pages/index/index'
						 })
					}
				
			}
		}
	}	
</script>

<style lang="scss">
	button::after{
		border: none;
	},
	.input-box {
		padding: 50upx;
		font-size: 30upx;
		.input-item {
			display: flex;
			background: white;
			border-bottom: 1upx solid #eeeeee;
			line-height: 100upx;
			height: 100upx;
			.input-label {
				width: 150upx;
			}
			.input-body{
				position: relative;
				height: 100upx;
				width: calc(100% - 150upx);
				.input {
					line-height: 100upx;
					height: 100upx;
					position: relative;
					font-size: 28upx;
				}
				.eye{
					position: absolute;
					height: 50upx;
					width: 50upx;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
				}
				.btn-code{
				    position: absolute;
				    right: 0upx;
				    top:50%;
				    transform: translateY(-50%);
					background: none;
					color: #205592;
					width: 160upx;
					font-size: 24upx;
					box-sizing: border-box;
					text-align: right;
					padding: 0;
					height: 100upx;
					line-height: 100upx;
				}
			}
			
		}
	},
	.button{
		margin:0 30upx;
		background: #08B6F2;
		border-radius:50upx;
		line-height: 80upx;
		height: 80upx;
		color: white;
		font-size: 32upx;
		}
 </style>
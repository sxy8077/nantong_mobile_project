<template>
	<form class='loginView' @submit="bindLogin">
        <view class="input-box">
            <view class="input-item">
                <view class="input-label">账号</view>
				<view class="input-body">
					<input   type="text" placeholder="请输入账号" class="input" name="nameValue" >
				</view>
            </view>
            <view class="input-item">
				<view class="input-label">密码</view>
				<view class="input-body">
					<input type="text" :password="isHidePassword?true:false" style="margin-right: 50upx;" placeholder="请输入密码" maxlength="20"  class="input" name="passwordValue"  />
					<image @click="isHidePasswordClick" class="eye" :src="isHidePassword?'/static/img/attention.png':'/static/img/attention_forbid.png'"></image>
				</view>
            </view>
        </view>
        <button :loading="loading" class="button" formType="submit">登录</button>
	</form>
</template>

<script>
	// import { checkPwd } from "@/common/common.js"
	import {
	    mapMutations
	} from 'vuex';
	

	export default {
		data() {
			return {
				isHidePassword:true,
				loading: false
				// userName:"",
				// password:""
			};
		},
		onLoad() {
		},
		methods: {
			isHidePasswordClick(){
				this.isHidePassword=!this.isHidePassword
			},

			
			bindLogin(e) {
					console.log(e);
			        this.loading = true;
			        let name = e.detail.value.nameValue,
			            password = e.detail.value.passwordValue;
			
			        // if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(name)) {
			        //     this.loading = false;
			        //     uni.showModal({
			        //         content: "请输入正确账号",
			        //         showCancel: false
			        //     })
			        //     return;
			        // }
			
			        /* if (password.length < 6) {
			            this.loading = false;
			            uni.showModal({
			                content: "密码大于5位",
			                showCancel: false
			            })
			            return;
			        } */
			
			        uni.request({
			            url: `${this.$serverUrl}app/login_in/`,
			            // header: {
			            //     "Content-Type": "application/x-www-form-urlencoded"
			            // },
			            data: {
			                account: name,
			                password: password
			            },
			            method: "POST",
			            success: (e) => {
							console.log(66,e)
			                if (e.statusCode !== 200) {
			                    uni.showModal({
			                        content: "用户名密码错误！",
			                        showCancel: false
			                    });
			                    return;
			                }
			                if (e.data.msg === "登陆成功") {
			                    this.login(e.data);
								// uni.redirectTo({
								// 	url:'../index/index'
								// })
								uni.reLaunch({
									url:'../index/index'
								})
			                } else {
			                    uni.showModal({
			                        content: e.data.message,
			                        showCancel: false
			                    })
			                }
			            },
			            fail: (e) => {
			                uni.showModal({
			                    content: "请求失败，请重试！",
			                    showCancel: false
			                })
			            },
			            complete: () => {
			                this.loading = false;
			            }
			        })
			    },
			    ...mapMutations(['login'])
			}
			
			// submit() {
			// 	// if(!checkuserName(this.userName)){
			// 	// 	return;
			// 	// };
			// 	if(!checkPwd(this.password)){
			// 		return;
			// 	};
			// 	/*
			// 	* 登录逻辑
			// 	*/
			// 	this.$store.commit('update',['isLogin',true]);
			// 	// uni.reLaunch({
			// 	// 	url:'/pages/index/index'
			// 	// })
			// 		if(this.userName === "admin" && this.password === "1234567"){
			// 			 // 验证成功跳转目标页面 
			// 			 uni.reLaunch({
			// 			 	url:'/pages/index/index'
			// 			 })
			// 	}	
			// }
		
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

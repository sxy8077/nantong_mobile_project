<template>
	<view>
		<view class="block">
			<view class="header">
				<image 
					style="width: 200rpx;height:200rpx;border-radius: 50%; "
					:mode="array.mode"
					:src="src"
				>
				</image>
			</view>
			<view class="name" >
				<text>{{uerInfo.userName}}</text>
			</view>
			<view class="button">
				<button  size="mini"  @click="bindLogin">退出登录</button>
				<button size="mini" @click="goaccountManage" v-if="test">账户管理</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import { role, outLoginUrl } from '../../util/urlList.js'
	
	
	export default {
		computed:{
			isLogin(){
				const isLogin = this.$store.state.isLogin;
				if(!isLogin){
					uni.redirectTo({
						url:'/pages/login/login'
					})
				}
				return isLogin;
			}
		},
		data() {
			return {
				array: [{
				            mode: 'scaleToFill',    
				         }],
				src:'https://uploadfile.bizhizu.cn/up/de/52/a5/de52a5d178f00ebc694716141208876e.jpg',
				test:false,
				aid:'',
				roleid:''
			}
		},
		
		
		computed: mapState(['isLogin','uerInfo']),
		// onLoad() {
		// 	this.isLogin()
		// },

		onLoad() {
				const isLogin = this.$store.state.isLogin;
					if(!isLogin){
						uni.redirectTo({
							url:'/pages/login/login'
						})
					}
				// this.getRoleaid()
				
		},
		// computed:{
		// 	isLogin(){
		// 		const isLogin = this.$store.state.isLogin;
		// 		if(!isLogin){
		// 			uni.redirectTo({
		// 				url:'/pages/login/login'
		// 			})
		// 		}
		// 		return isLogin;
		// 	}
		// },	
		methods: {
			// loginOut(){
			// 	this.$store.commit('update',['isLogin',false]);
			// }
			...mapMutations(['logout']),
			bindLogin() {
				let me = this
				if (this.isLogin) {
					uni.getStorage({
						key:'uerInfo',
						success:async function(res) {
							const outLogin = await me.$myRequest({
											url:outLoginUrl,
											data:{
												user_id:res.data.user_id
											}
										})
							if( outLogin.data.msg === "登出成功" ) {
								uni.showToast({
									title:"退出成功"
								})
							}
						}
					})
					this.logout()
					uni.reLaunch({
						url:'../login/login'
					})
					
				} 
				// else {
				// 	uni.navigateTo({
				// 		url: '../login/login'
				// 	})
				// }
			},
			
			//拿到不同角色的aid           async + await，使异步问题同步化
			// async getRoleaid(){
			// 	const me = this;
			// 	const res = await this.$myRequest({
			// 		url:role,
			// 	})
			// 	this.aid = res.data[3].aid
			// 	//console.log(22,this.aid)
			// 	// uni.getStorage 从本地缓存中异步获取指定 key 对应的内容。
			// 	uni.getStorage({
			// 		key:'uerInfo',
			// 		success:function(res) {
			// 			//console.log(22211,res)
			// 			me.roleid = res.data.role_id
			// 			//console.log(333,me.roleid)
			// 			if(me.roleid === me.aid){
			// 				me.test = true;
			// 			}
			// 		}
			// 	})
				
			// },
			
			//跳转到账户管理页面
			goaccountManage(){
				uni.navigateTo({
					url:'accountManage/accountManage'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.block{
		width: 100%;
		height: auto;
		background: #5675c6;
		position: fixed;
		.header{
			margin: 100rpx 275rpx 60rpx 275rpx;
		}
	}
	.name{
		margin-top: 60 rpx;
		display:flex;
		align-items:center;
		justify-content:center;
		font-size: 60rpx;
	}
	.button{
		width: 500rpx;
		display: flex;
		justify-content: space-between;
		margin: 20rpx 125rpx;
	}
	
</style>

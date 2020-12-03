<template>
	<view >
		<view class="block">
			<view class="swip">
				<swiper-nav
					:height="height"
					:width="width"
					:current="current"
					:nav-list="list"
					:bg-color="bgColor"
					:border-bg-color="borderBgColor"
					:active-color="activeColor"
					:color="color"
					@current-change="currentChange"></swiper-nav>
			</view>
	        <view class="content">
	            <view  v-if="current === 0">
					<view class="true">
						<view class="title">已允许</view>
						<view class="b">
							<text>客户信息查看</text>
							<image 
								style="width: 80rpx;height:40rpx; "
								:mode="array.mode" :src="srcs">
							</image>
						</view>
						<view class="b">
							<text>主机信息查看</text>
							<image 
								style="width: 80rpx;height:40rpx; "
								:mode="array.mode" :src="srcs">
							</image>
						</view>
						<view class="b">
							<text>传感器信息查看</text>
							<image 
								style="width: 80rpx;height:40rpx;"
								:mode="array.mode" :src="srcs">
							</image>
						</view>
						<view class="b">
							<text>设备信息查看</text>
							<image 
								style="width: 80rpx;height:40rpx; "
								:mode="array.mode" :src="srcs">
							</image>
						</view>
					</view>
					<view class="false">
						<view class="title">已禁用</view>
						<view class="a">
							<text>角色权限查看</text>
							<image 
								style="width: 80rpx;height:40rpx; "
								:mode="array.mode" :src="src">
							</image>
						</view>
						<view class="a">
							<text>客户信息管理</text>
							<image 
								style="width: 80rpx;height:40rpx; "
								:mode="array.mode" :src="src">
							</image>
						</view>
						<view class="a">
							<text>客户端管理</text>
							<image 
								style="width: 80rpx;height:40rpx;"
								:mode="array.mode" :src="src">
							</image>
						</view>
						<view class="a">
							<text>账户管理</text>
							<image 
								style="width: 80rpx;height:40rpx; "
								:mode="array.mode" :src="src">
							</image>
						</view>
						<view class="a">
							<text>主机信息管理</text>
							<image 
								style="width: 80rpx;height:40rpx; "
								:mode="array.mode" :src="src">
							</image>
						</view>
						<view class="a">
							<text>设备信息管理</text>
							<image 
								style="width: 80rpx;height:40rpx; "
								:mode="array.mode" :src="src">
							</image>
						</view>
						<view class="a">
							<text>传感器信息管理</text>
							<image 
								style="width: 80rpx;height:40rpx; "
								:mode="array.mode" :src="src">
							</image>
						</view>
					</view>
	            </view>
				
				
	            <view class="border"  v-if="current === 1">
					<view class="true">
						<view class="title">已允许</view>
						<view class="b">
							<text>客户信息查看</text>
							<image 
								style="width: 80rpx;height:40rpx; "
								:mode="array.mode" :src="srcs">
							</image>
						</view>
						<view class="b">
							<text>主机信息查看</text>
							<image 
								style="width: 80rpx;height:40rpx; "
								:mode="array.mode" :src="srcs">
							</image>
						</view>
						<view class="b">
							<text>传感器信息查看</text>
							<image 
								style="width: 80rpx;height:40rpx; "
								:mode="array.mode" :src="srcs">
							</image>
						</view>
						<view class="b">
							<text>设备信息查看</text>
							<image 
								style="width: 80rpx;height:40rpx; "
								:mode="array.mode" :src="srcs">
							</image>
						</view>
					</view>
	                <view class="b">
	                	<text>主机信息管理</text>
	                	<image 
	                		style="width: 80rpx;height:40rpx; "
	                		:mode="array.mode" :src="srcs">
	                	</image>
	                </view>
	                <view class="b">
	                	<text>设备信息管理</text>
	                	<image 
	                		style="width: 80rpx;height:40rpx; "
	                		:mode="array.mode" :src="srcs">
	                	</image>
	                </view>
	                <view class="b">
	                	<text>传感器信息管理</text>
	                	<image 
	                		style="width: 80rpx;height:40rpx; "
	                		:mode="array.mode" :src="srcs">
	                	</image>
	                </view>
					<view class="false">
						<view class="title">已禁用</view>
						<view class="a">
							<text>角色权限查看</text>
							<image 
								style="width: 80rpx;height:40rpx; "
								:mode="array.mode" :src="src">
							</image>
						</view>
						<view class="a">
							<text>客户信息管理</text>
							<image 
								style="width: 80rpx;height:40rpx; "
								:mode="array.mode" :src="src">
							</image>
						</view>
						<view class="a">
							<text>客户端管理</text>
							<image 
								style="width: 80rpx;height:40rpx; "
								:mode="array.mode" :src="src">
							</image>
						</view>
						<view class="a">
							<text>账户管理</text>
							<image 
								style="width: 80rpx;height:40rpx; "
								:mode="array.mode" :src="src">
							</image>
						</view>
					</view>
	            </view>
				
				
	            <view class="border"  v-if="current === 2">
	               <view class="true">
	               	<view class="title">已允许</view>
	               	<view class="b">
	               		<text>客户信息查看</text>
	               		<image 
	               			style="width: 80rpx;height:40rpx; "
	               			:mode="array.mode" :src="srcs">
	               		</image>
	               	</view>
					<view class="b">
						<text>客户信息管理</text>
						<image 
							style="width: 80rpx;height:40rpx; "
							:mode="array.mode" :src="srcs">
						</image>
					</view>
	               	<view class="b">
	               		<text>主机信息查看</text>
	               		<image 
	               			style="width: 80rpx;height:40rpx; "
	               			:mode="array.mode" :src="srcs">
	               		</image>
	               	</view>
	               	<view class="b">
	               		<text>传感器信息查看</text>
	               		<image 
	               			style="width: 80rpx;height:40rpx; "
	               			:mode="array.mode" :src="srcs">
	               		</image>
	               	</view>
	               	<view class="b">
	               		<text>设备信息查看</text>
	               		<image 
	               			style="width: 80rpx;height:40rpx; "
	               			:mode="array.mode" :src="srcs">
	               		</image>
	               	</view>
	               </view>
				   <view class="false">
				   	<view class="title">已禁用</view>
				   	<view class="a">
				   		<text>角色权限查看</text>
				   		<image 
				   			style="width: 80rpx;height:40rpx;"
				   			:mode="array.mode" :src="src">
				   		</image>
				   	</view>
				   	<view class="a">
				   		<text>客户端管理</text>
				   		<image 
				   			style="width: 80rpx;height:40rpx;"
				   			:mode="array.mode" :src="src">
				   		</image>
				   	</view>
				   	<view class="a">
				   		<text>账户管理</text>
				   		<image 
				   			style="width: 80rpx;height:40rpx;"
				   			:mode="array.mode" :src="src">
				   		</image>
				   	</view>
					<view class="a">
						<text>主机信息管理</text>
						<image 
							style="width: 80rpx;height:40rpx;"
							:mode="array.mode" :src="src">
						</image>
					</view>
					<view class="a">
						<text>设备信息管理</text>
						<image 
							style="width: 80rpx;height:40rpx;"
							:mode="array.mode" :src="src">
						</image>
					</view>
					<view class="a">
						<text>传感器信息管理</text>
						<image 
							style="width: 80rpx;height:40rpx;"
							:mode="array.mode" :src="src">
						</image>
					</view>
				   </view>
	            </view>
				
				
	            <view class="border"  v-if="current === 3">
	                <view class="true">
	                 	<view class="title">已允许</view>
						<view class="b">
							<text>客户端管理</text>
							<image 
								style="width: 80rpx;height:40rpx; "
								:mode="array.mode" :src="srcs">
							</image>
						</view>
					</view>
					<view class="false">
						<view class="title">已禁用</view>
						<view class="a">
							<text>角色权限查看</text>
							<image 
								style="width: 80rpx;height:40rpx;"
								:mode="array.mode" :src="src">
							</image>
						</view>
						<view class="a">
							<text>客户信息查看</text>
							<image 
								style="width: 80rpx;height:40rpx;"
								:mode="array.mode" :src="src">
							</image>
						</view>
						<view class="a">
							<text>客户信息管理</text>
							<image 
								style="width: 80rpx;height:40rpx;"
								:mode="array.mode" :src="src">
							</image>
						</view>
						<view class="a">
							<text>账户管理</text>
							<image 
								style="width: 80rpx;height:40rpx;"
								:mode="array.mode" :src="src">
							</image>
						</view>
						<view class="a">
							<text>主机信息查看</text>
							<image 
								style="width: 80rpx;height:40rpx;"
								:mode="array.mode" :src="src">
							</image>
						</view>
						<view class="a">
							<text>传感器信息查看</text>
							<image 
								style="width: 80rpx;height:40rpx;"
								:mode="array.mode" :src="src">
							</image>
						</view>
						<view class="a">
							<text>设备信息查看</text>
							<image 
								style="width: 80rpx;height:40rpx;"
								:mode="array.mode" :src="src">
							</image>
						</view>
						<view class="a">
							<text>主机信息管理</text>
							<image 
								style="width: 80rpx;height:40rpx;"
								:mode="array.mode" :src="src">
							</image>
						</view>
						<view class="a">
							<text>设备信息管理</text>
							<image 
								style="width: 80rpx;height:40rpx;"
								:mode="array.mode" :src="src">
							</image>
						</view>
						<view class="a">
							<text>传感器信息管理</text>
							<image 
								style="width: 80rpx;height:40rpx;"
								:mode="array.mode" :src="src">
							</image>
						</view>
					</view>
				</view>
			</view>
	    </view>
	</view>
</template>

<script>
	import swiperNav from '@/components/wee-swiper-nav/wee-swiper-nav.vue'
	export default {
		components: {
		     swiperNav
		    },
		data() {
			return {
				list:['设备维护', '设备管理', '客户经理', '客户',], //导航栏格式 --导航栏组件
				current: 0,
				height: 80,
				width: 150,
				bgColor: '#f4f4f4',
				activeColor: '#607fcc',
				borderBgColor: '#607fcc',
				color: 'black',
				array: [{
				            mode: 'scaleToFill',    
				         }],
				src:'../../../../static/icon/false.png',
				srcs:'../../../../static/icon/true.png'
			}
		},
		methods: {
			currentChange(e) {
			            /* console.log(e) */
			            this.current = e
			        }
		}
	}
</script>

<style lang="scss">
	page{
		background: #607fcc;
	}
	.block{
		width: 680rpx;
		height: auto;
		border: 1rpx solid black;
		margin: 80rpx 35rpx;
		background: white;
		border-radius: 40rpx;
		.swip{
			width: 660rpx;
			height: auto;
			border: 1rpx solid white;
			border-radius: 40rpx;
			overflow:scroll ;
			margin-top: 10rpx;
			margin-left: 10rpx;
		}
	}
		
	.title{
		font-size: 30rpx;
		color: #607fcc;
		margin-top: 40rpx;
		margin-left: 60rpx;
	}
	.a{
		width: 560rpx;
		display: flex;
		justify-content: space-between;
		margin: 10rpx 60rpx;
		text{
			font-size:30rpx;
			line-height: 40rpx;
			color: black;
		}	
	}
	.b{
		width: 560rpx;
		display: flex;
		justify-content: space-between;
		margin: 10rpx 60rpx;
		text{
			font-size:30rpx;
			line-height: 40rpx;
			color: black;
		}	
	}
	.true{
		margin-top: 100rpx;
	}
	.false{
		margin-top: 80rpx;
		margin-bottom: 80rpx;
	}
	
</style>

<template>
	<view >
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
	        <view class="content">
	            <view class="border"  v-if="current === 0">
	                <view class="a">
	                	<image 
							style="width: 60rpx;height:60rpx; "
							:mode="array.mode" :src="src">
						</image>
						<text>角色权限查看</text>
	                </view>
					<view class="b">
						<image 
							style="width: 60rpx;height:60rpx; "
							:mode="array.mode" :src="srcs">
						</image>
						<text>客户信息查看</text>
					</view>
					<view class="a">
						<image 
							style="width: 60rpx;height:60rpx; "
							:mode="array.mode" :src="src">
						</image>
						<text>客户信息管理</text>
					</view>
					<view class="b">
						<image 
							style="width: 60rpx;height:60rpx; "
							:mode="array.mode" :src="srcs">
						</image>
						<text>传感器信息查看</text>
					</view>
					<view class="b">
						<image 
							style="width: 60rpx;height:60rpx; "
							:mode="array.mode" :src="srcs">
						</image>
						<text>主机信息查看</text>
					</view>
					<view class="b">
						<image 
							style="width: 60rpx;height:60rpx; "
							:mode="array.mode" :src="srcs">
						</image>
						<text>设备信息查看</text>
					</view>
					<view class="a">
						<image 
							style="width: 60rpx;height:60rpx; "
							:mode="array.mode" :src="src">
						</image>
						<text>客户端管理</text>
					</view>
					<view class="a">
						<image 
							style="width: 60rpx;height:60rpx; "
							:mode="array.mode" :src="src">
						</image>
						<text>账户管理</text>
					</view>
					<view class="a">
						<image 
							style="width: 60rpx;height:60rpx; "
							:mode="array.mode" :src="src">
						</image>
						<text>主机信息管理</text>
					</view>
					<view class="a">
						<image 
							style="width: 60rpx;height:60rpx; "
							:mode="array.mode" :src="src">
						</image>
						<text>设备信息管理</text>
					</view>
					<view class="a">
						<image 
							style="width: 60rpx;height:60rpx; "
							:mode="array.mode" :src="src">
						</image>
						<text>传感器信息管理</text>
					</view>
	            </view>
				
				
	            <view class="border"  v-if="current === 1">
	                <view class="a">
	                	<image 
	                		style="width: 60rpx;height:60rpx; "
	                		:mode="array.mode" :src="src">
	                	</image>
	                	<text>角色权限查看</text>
	                </view>
	                <view class="b">
	                	<image 
	                		style="width: 60rpx;height:60rpx; "
	                		:mode="array.mode" :src="srcs">
	                	</image>
	                	<text>客户信息查看</text>
	                </view>
	                <view class="a">
	                	<image 
	                		style="width: 60rpx;height:60rpx; "
	                		:mode="array.mode" :src="src">
	                	</image>
	                	<text>客户信息管理</text>
	                </view>
	                <view class="b">
	                	<image 
	                		style="width: 60rpx;height:60rpx; "
	                		:mode="array.mode" :src="srcs">
	                	</image>
	                	<text>传感器信息查看</text>
	                </view>
	                <view class="b">
	                	<image 
	                		style="width: 60rpx;height:60rpx; "
	                		:mode="array.mode" :src="srcs">
	                	</image>
	                	<text>主机信息查看</text>
	                </view>
	                <view class="b">
	                	<image 
	                		style="width: 60rpx;height:60rpx; "
	                		:mode="array.mode" :src="srcs">
	                	</image>
	                	<text>设备信息查看</text>
	                </view>
	                <view class="a">
	                	<image 
	                		style="width: 60rpx;height:60rpx; "
	                		:mode="array.mode" :src="src">
	                	</image>
	                	<text>客户端管理</text>
	                </view>
	                <view class="a">
	                	<image 
	                		style="width: 60rpx;height:60rpx; "
	                		:mode="array.mode" :src="src">
	                	</image>
	                	<text>账户管理</text>
	                </view>
	                <view class="b">
	                	<image 
	                		style="width: 60rpx;height:60rpx; "
	                		:mode="array.mode" :src="srcs">
	                	</image>
	                	<text>主机信息管理</text>
	                </view>
	                <view class="b">
	                	<image 
	                		style="width: 60rpx;height:60rpx; "
	                		:mode="array.mode" :src="srcs">
	                	</image>
	                	<text>设备信息管理</text>
	                </view>
	                <view class="b">
	                	<image 
	                		style="width: 60rpx;height:60rpx; "
	                		:mode="array.mode" :src="srcs">
	                	</image>
	                	<text>传感器信息管理</text>
	                </view>
	            </view>
				
				
	            <view class="border"  v-if="current === 2">
	               <view class="a">
						<image 
							style="width: 60rpx;height:60rpx; "
							:mode="array.mode" :src="src">
						</image>
						<text>角色权限查看</text>
	               </view>
	               <view class="b">
						<image 
							style="width: 60rpx;height:60rpx; "
							:mode="array.mode" :src="srcs">
						</image>
						<text>客户信息查看</text>
	               </view>
	               <view class="b">
						<image 
							style="width: 60rpx;height:60rpx; "
							:mode="array.mode" :src="srcs">
						</image>
						<text>客户信息管理</text>
	               </view>
	               <view class="b">
						<image 
							style="width: 60rpx;height:60rpx; "
							:mode="array.mode" :src="srcs">
						</image>
						<text>传感器信息查看</text>
	               </view>
	               <view class="b">
						<image 
							style="width: 60rpx;height:60rpx; "
							:mode="array.mode" :src="srcs">
						</image>
						<text>主机信息查看</text>
	               </view>
	               <view class="b">
						<image 
							style="width: 60rpx;height:60rpx; "
							:mode="array.mode" :src="srcs">
						</image>
						<text>设备信息查看</text>
	               </view>
	               <view class="a">
						<image 
							style="width: 60rpx;height:60rpx; "
							:mode="array.mode" :src="src">
						</image>
						<text>客户端管理</text>
	               </view>
	               <view class="a">
						<image 
							style="width: 60rpx;height:60rpx; "
							:mode="array.mode" :src="src">
						</image>
						<text>账户管理</text>
	               </view>
	               <view class="a">
						<image 
							style="width: 60rpx;height:60rpx; "
							:mode="array.mode" :src="src">
						</image>
						<text>主机信息管理</text>
	               </view>
	               <view class="a">
						<image 
							style="width: 60rpx;height:60rpx; "
							:mode="array.mode" :src="src">
						</image>
						<text>设备信息管理</text>
	               </view>
	               <view class="a">
						<image 
							style="width: 60rpx;height:60rpx; "
							:mode="array.mode" :src="src">
						</image>
						<text>传感器信息管理</text>
	               </view>
	            </view>
				
				
	            <view class="border"  v-if="current === 3">
	                    <view class="a">
	                    	<image 
	                			style="width: 60rpx;height:60rpx; "
	                			:mode="array.mode" :src="src">
	                		</image>
	                		<text>角色权限查看</text>
	                    </view>
	                	<view class="a">
	                		<image 
	                			style="width: 60rpx;height:60rpx; "
	                			:mode="array.mode" :src="src">
	                		</image>
	                		<text>客户信息查看</text>
	                	</view>
	                	<view class="a">
	                		<image 
	                			style="width: 60rpx;height:60rpx; "
	                			:mode="array.mode" :src="src">
	                		</image>
	                		<text>客户信息管理</text>
	                	</view>
	                	<view class="a">
	                		<image 
	                			style="width: 60rpx;height:60rpx; "
	                			:mode="array.mode" :src="src">
	                		</image>
	                		<text>传感器信息查看</text>
	                	</view>
	                	<view class="a">
	                		<image 
	                			style="width: 60rpx;height:60rpx; "
	                			:mode="array.mode" :src="src">
	                		</image>
	                		<text>主机信息查看</text>
	                	</view>
	                	<view class="a">
	                		<image 
	                			style="width: 60rpx;height:60rpx; "
	                			:mode="array.mode" :src="src">
	                		</image>
	                		<text>设备信息查看</text>
	                	</view>
	                	<view class="b">
	                		<image 
	                			style="width: 60rpx;height:60rpx; "
	                			:mode="array.mode" :src="srcs">
	                		</image>
	                		<text>客户端管理</text>
	                	</view>
	                	<view class="a">
	                		<image 
	                			style="width: 60rpx;height:60rpx; "
	                			:mode="array.mode" :src="src">
	                		</image>
	                		<text>账户管理</text>
	                	</view>
	                	<view class="a">
	                		<image 
	                			style="width: 60rpx;height:60rpx; "
	                			:mode="array.mode" :src="src">
	                		</image>
	                		<text>主机信息管理</text>
	                	</view>
	                	<view class="a">
	                		<image 
	                			style="width: 60rpx;height:60rpx; "
	                			:mode="array.mode" :src="src">
	                		</image>
	                		<text>设备信息管理</text>
	                	</view>
	                	<view class="a">
	                		<image 
	                			style="width: 60rpx;height:60rpx; "
	                			:mode="array.mode" :src="src">
	                		</image>
	                		<text>传感器信息管理</text>
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
				height: 100,
				width: 160,
				bgColor: '#007AFF',
				activeColor: 'red',
				borderBgColor: 'red',
				color: '#fff',
				array: [{
				            mode: 'scaleToFill',    
				         }],
				src:'../../../../static/icon/false.png',
				srcs:'../../../../static/icon/true.png'
			}
		},
		methods: {
			currentChange(e) {
			            console.log(e)
			            this.current = e
			        }
		}
	}
</script>

<style lang="scss">
	.border{
		width: 680rpx;
		height: auto;
		border: 1rpx solid  #607fcc;
		border-radius: 40rpx;
		margin: 40rpx 35rpx;
		.a{
			display: flex;
			flex-direction: row;
			margin: 40rpx 60rpx;
			text{
				font-size:40rpx;
				line-height: 60rpx;
				margin-left: 30rpx;
			}
		}
		.b{
			display: flex;
			flex-direction: row;
			margin: 40rpx 60rpx;
			text{
				font-size:40rpx;
				line-height: 60rpx;
				margin-left: 30rpx;
				color: #607fcc;
			}
		}
	}
</style>

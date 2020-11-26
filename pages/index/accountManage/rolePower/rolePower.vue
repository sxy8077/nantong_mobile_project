<template>
	<view class="">
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
	            <view v-if="current === 0">
	                选项卡1的内容
	            </view>
	            <view v-if="current === 1">
	                选项卡2的内容
	            </view>
	            <view v-if="current === 2">
	                选项卡3的内容
	            </view>
	            <view v-if="current === 3">
	                选项卡4的内容
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
				list: ['设备维护', '设备管理', '客户经理', '客户', ],
				current: 0,
				height: 100,
				width: 160,
				bgColor: '#007AFF',
				activeColor: 'red',
				borderBgColor: 'red',
				color: '#fff'
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

<style>

</style>

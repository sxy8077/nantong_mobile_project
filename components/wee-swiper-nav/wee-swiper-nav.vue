<template>
	<view class="container" :style="{ backgroundColor: bgColor }">
		<view class="swiper-nav">
			<template v-for="(item, i) in navList">
				<view class="swiper-nav-list"
					:style="{ height: height + 'rpx', lineHeight: height + 'rpx', width: width + 'rpx', color: myactiveColor(i) }"
					:key="i"
					@click="setCurrent(i)">{{item}}</view>
			</template>
			<view class="tips" :style="{ left: offWidth, width: width+'rpx', backgroundColor: borderBgColor }"></view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			"nav-list": {
				type: Array
			},
			current: {
				type: Number,
				default: 0
			},
			height: {
				type: Number,
				default: 100
			},
			width: {
				type: Number,
				default: 160
			},
			"bg-color": {
				type: String
			},
			"border-bg-color": {
				type: String,
				default: 'red'
			},
			"active-color": {
				type: String
			},
			"color": {
				type: String
			}
		},
		data() {
			return {
				mycurrent: this.current,
				offWidth: '0rpx'
				// myactiveColor: this.activeColor
			}
		},
		methods: {
			setNavActive (index) {
				return this.mycurrent === index
			},
			setCurrent (index) {
				this.mycurrent = index
				this.offWidth = (index) * (this.width + 20) + 'rpx'
			},
			returnCurrent () {
				this.$emit('current-change', this.mycurrent)
			},
			myactiveColor (index) {
				return this.mycurrent === index ? this.activeColor : this.color
			}
		},
		mounted() {
			this.returnCurrent()
		},
		computed: {
			
		},
		watch: {
			mycurrent () {
				this.returnCurrent()
			}
		}
	}
</script>
<style scoped>
	.container {
		padding: 0 20rpx;
	}
	.swiper-nav {
		display: -webkit-box;
		overflow-x: scroll;
		-webkit-overflow-scrolling: touch;
		position: relative;
	}
	.swiper-nav::-webkit-scrollbar {
		display:none
	}
	.swiper-nav-list {
		transition: .5s;
		text-align: center;
	}
	.swiper-nav-list + .swiper-nav-list {
		margin-left: 20rpx;
	}
	.nav-active {
		color: #fff;
	}
	.tips {
		position: absolute;
		bottom: 0;
		height: 4rpx;
		transition: left .5s;
	}
</style>

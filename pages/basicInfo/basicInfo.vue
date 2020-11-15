<template>
	<view class="basicInfo">
		<choose-list :chooseItem="choose" @navigatorTo="navigatorTo"></choose-list>
	</view>
</template>

<script>
	import chooseList from '../../components/choose.vue'
	export default {
		data() {
			return {
				choose: [
							{name: '客户信息', H5imgUrl: '../../static/icon/email.png', WEIimgUrl: '../static/icon/email.png'},
							{name: '主机信息', H5imgUrl: '/'},
							{name: '传感器信息', H5imgUrl: '/'},
							{name: '设备信息', H5imgUrl: '/'},
					],
			}
		},
		methods: {
			navigatorTo(index) {
				switch(index){
					case 0:
						uni.navigatorTo({
							url: '/'
						})
						break;
					case 1:
						uni.navigateTo({
							url: 'engineInfo/engineInfo'
						})
						break;
					case 2:
						uni.navigateTo({
							url: 'sensorInfo/sensorInfo'
						})
						break;
					case 3:	
					
				}
					
				
			}
		},
		components:{
			"choose-list": chooseList
		}
	}
</script>

<style lang="scss">
	
</style>

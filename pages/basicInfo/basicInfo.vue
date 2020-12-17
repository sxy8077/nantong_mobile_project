<template>
	<view class="basicInfo">
		<choose-list :chooseItem="choose" @navigatorTo="navigatorTo" :title="title"></choose-list>
	</view>
</template>

<script>
	import chooseList from '../../components/choose.vue'
	export default {
		data() {
			return {
				choose: [
							{name: '客户信息', H5imgUrl: '../../static/icon/email.png', WEIimgUrl: '../static/icon/email.png'},
							{name: '主机信息', H5imgUrl: '../../static/icon/engine.png', WEIimgUrl: '../static/icon/engine.png'},
							{name: '传感器信息', H5imgUrl: '../../static/icon/sensor.png', WEIimgUrl: '../static/icon/sensor.png'},
							{name: '设备信息', H5imgUrl: '../../static/icon/equipment.png', WEIimgUrl: '../static/icon/equipment.png'},
					],
				title: "基本信息"
			}
		},
		methods: {
			navigatorTo(index) {
				switch(index){
					case 0:
						uni.navigateTo({
							url: 'ClientMes/ClientMes'
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
						uni.navigateTo({
							url: 'equipmentInfo/equipmentInfo'
						})
					default:
						return;
				}
					
				
			}
		},
		components:{
			"choose-list": chooseList
		}
	}
</script>

<style lang="scss">
	page {
	  background-color:$background-color;
	}
</style>

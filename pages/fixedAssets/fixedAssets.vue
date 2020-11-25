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
							{name: '设备配置记录', H5imgUrl: '../../static/icon/configure.png', WEIimgUrl: '../static/icon/configure.png'},
							{name: '设备调拨记录', H5imgUrl: '../../static/icon/allocation.png', WEIimgUrl: '../static/icon/allocation.png'},
							{name: '设备报废记录', H5imgUrl: '../../static/icon/scrap.png', WEIimgUrl: '../static/icon/scrap.png'},
					],
				title: "固定资产"
			}
		},
		methods: {
			navigatorTo(index) {
				switch(index){
					case 0:
						uni.navigateTo({
							url: 'configure/configure'
						})
						break;
					case 1:
						uni.navigateTo({
							url: 'allocation/allocation'
						})
						break;
					case 2:
						uni.navigateTo({
							url: 'scrap/scrap'
						})
						break;
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


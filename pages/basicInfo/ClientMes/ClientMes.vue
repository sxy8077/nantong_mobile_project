<template>
	<view >
		<view class="line"></view>
		<!-- 搜索区 -->
		<view class="header">
			<view class="title">客户单位：</view>
			<uni-search-bar placeholder=""  @confirm="search" maxlength="500rpx" radius="15"></uni-search-bar>
		</view>
		<!-- 信息展示区 -->
		<view class="messages_list">
				<view class="messages_item" v-for="(item,index) in client" v-bind:key='item.id' @click="goMesDetail(item.aid)">
					<view class='setting'>
						<image style="width: 60px;height: 60px;" :mode="array.mode" :src="src" ></image>
						<view class="name">
							<view>客户信息</view>
							<text>客户单位：{{item.client_unit}}</text>
						</view>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	export default {
		data() {
			return{
				array: [{
				            mode: 'scaleToFill',    
				         }],
				src:'https://tse4-mm.cn.bing.net/th/id/OIP.jiJ5VFNRfVdYqfPJ-4F4ugHaHa?pid=Api&rs=1',
				client:[]
						 
			}
		},
		methods: {
			async getClientunit(){
				const res = await this.$myRequest({
					url:'client/',
				})
				/* console.log(res) */
				this.client = res.data.results
			},
			goMesDetail(aid){
				uni.navigateTo({
					url:'messages/messages?aid='+aid
				})
			}
		},
		onLoad(){
			this.getClientunit()
			// this.goMesDetail()
		},
		components: {uniSearchBar}
	}
</script>

<style lang="scss">
	page{
		background-color: #607fcc;
	}
	.line{
		width: 100%;
		height: 3px;
		background-color: white;
	}
	.header{
		margin: 50px 20px 10px 20px;
		.title{
			font-size: 15px;
			color: white;
		}
	}
	.messages_list{
		margin: 30px 0;
		.messages_item{
			width: 100%;
			height: 70px;
			background-color: white;
			overflow: hidden;
			margin: 5px 0;
			.setting{
				height: 50rpx;
				display: flex;
			    flex-direction: row;
			    image{
					margin: 5px 15px;
				}
			    .name{
					margin: 5px 20px;
					line-height: 30px;
				}
			}	
		}
		
	}
	
</style>

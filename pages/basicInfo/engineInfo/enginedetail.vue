<template>
	<view class="engineDetail">
		<text class="engine">666666666666666666661111111111111111111111111111111111111111111</text>
		<!-- <t-table class="detailTable">
			<t-tr>
				<t-th>主机编号：{{engine_code}}</t-th>
			</t-tr>
			<t-tr>
				<t-td class="td"></t-td>
				<t-td>1</t-td>
			</t-tr>
		</t-table> -->
	</view>
</template>


<script>
	// import tTable from '@/components/t-table/t-table.vue';
	// import tTh from '@/components/t-table/t-th.vue';
	// import tTr from '@/components/t-table/t-tr.vue';
	// import tTd from '@/components/t-table/t-td.vue';
	import	tTable from './booleen-single-table.vue'
	export default{
		components: {
			// tTable,
			// tTh,
			// tTr,
			// tTd
		},
		data(options) {
			return {
				begin_time: '',
				end_time: '',
				engine_code: '',
				engine_name: '',
				note: '',
				status: '',
			}
		},
		onLoad(options) {
			this.begin_time = options.begin_time;
			this.end_time = options.end_time;
			this.engine_code = options.engine_code;
			this.engine_name = options.engine_name;
			this.note = options.note;
			this.status = options.status;
		}
	}
	
	
</script>
	
<style lang="scss">
	.engineDetail{
		.detailTable{
			width: 700rpx;
			margin: 100rpx auto;
			.td{
				width: 30rpx;
			}
		}
	}
	.engine{
		overflow: hidden; 
		text-overflow: ellipsis; 
		white-space: nowrap;
		width: 300rpx;
	}
</style>

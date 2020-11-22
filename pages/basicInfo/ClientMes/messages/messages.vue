<template>
	<view>
	<t-table border="2" border-color="#95b99e" class="table">
		<t-tr font-size="14" color="#5d6f61" >
			<t-th align="center">客户信息详情</t-th>
		</t-tr>
		<t-tr font-size="12" color="#5d6f61" >
			<t-td align="left">客户编号: {{tableList.client_code}}</t-td>
		</t-tr>
		<t-tr font-size="12" color="#5d6f61" >
			<t-td align="left">客户单位: {{tableList.client_unit}}</t-td>
		</t-tr>
		<t-tr font-size="12" color="#5d6f61" >
			<t-td align="left">客户地址: {{tableList.client_address}}</t-td>
		</t-tr>
		<t-tr font-size="12" color="#5d6f61" >
			<t-td align="left">客户邮编: {{tableList.client_zip_code}}</t-td>
		</t-tr>
		<t-tr font-size="12" color="#5d6f61" >
			<t-td align="left">客户行业: {{tableList.client_industry}}</t-td>
		</t-tr>
		<t-tr font-size="12" color="#5d6f61" >
			<t-td align="left">单位电话: {{tableList.unit_phone}}</t-td>
		</t-tr>
		<t-tr font-size="12" color="#5d6f61" >
			<t-td align="left">单位传真: {{tableList.unit_fax}}</t-td>
		</t-tr>
		<t-tr font-size="12" color="#5d6f61" >
			<t-td align="left">地区: {{tableList.region}}</t-td>
		</t-tr>
		<t-tr font-size="12" color="#5d6f61" >
			<t-td align="left">备注: {{tableList.note}}</t-td>
		</t-tr>
		<t-tr font-size="12" color="#5d6f61" >
			<t-td align="left">
				<button size="mini" type="default" @click="topop()">查看联系人</button>
				<button size="mini" type="default" @click="pop()" >新增联系人</button>
			</t-td>
		</t-tr>
	</t-table>
	<pop ref="pop" direction="center" :is_close="true" :is_mask="true" :width="90">
		<t-table border="1" border-color="#95b99e" class="table2">
			<t-tr font-size="5" color="#5d6f61" >
				<t-td align="left">客户编号: {{tableList.client_code}}</t-td>
			</t-tr>
		</t-table>
	</pop>
	</view>
</template>

<script>
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	import pop from '@/components/ming-pop/ming-pop.vue';
	export default {
		 components: {
					tTable,
					tTh,
					tTr,
					tTd,
					pop
				},
		data() {
			return {
				tableList:[],
				clientList:[]
			}
		},
		methods:{
			//拿到客户信息
			async getMessages(){
				const res = await this.$myRequest({
					url:'client/'+this.aid
				})
				/* console.log(res.data) */
				this.tableList = res.data
			
			},
			//拿到联系人数据
			async getClientMes(){
				const res = await this.$myRequest({
					url:'app/ClientContactPeople/',
					data:{
						"client_id":this.aid
					}
				})
				console.log(res)
				
			},
			topop() {
				this.$refs.pop.show();
			}
			
		},
		onLoad(options) {
			this.aid = options.aid
			this.getMessages()
			this.getClientMes()
		}
	}
</script>

<style lang="scss">
	.table{
		width:730rpx;
		height: auto;
		margin: 30px 10rpx 0px 10rpx;
	}
	.table2{
		margin-top: 20px;
	}
</style>

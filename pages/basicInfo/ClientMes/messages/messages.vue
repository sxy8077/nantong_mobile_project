<template>
	<view class="table">
		 <t-table border="1" border-color="#95b99e" v-for="item in filterList" :key="item.aid" >
			<t-tr font-size="14" color="#5d6f61" >
				<t-th align="center">客户信息详情</t-th>
			</t-tr>
			<t-tr font-size="12" color="#5d6f61" >
				<t-td align="left">客户编号</t-td>
				<t-td align="left">{{item.client_code }}</t-td>
			</t-tr>
			<!-- <t-tr font-size="12" color="#5d6f61" >
				<t-td align="left">客户单位</t-td>
				<t-td align="left">{{item.client_unit}}</t-td>
			</t-tr>
			<t-tr font-size="12" color="#5d6f61" >
				<t-td align="left">客户地址</t-td>
				<t-td align="left">{{item.client_address}}</t-td>
			</t-tr>
			<t-tr font-size="12" color="#5d6f61" >
				<t-td align="left">客户邮编</t-td>
				<t-td align="left">{{item.client_zip_code}}</t-td>
			</t-tr>
			<t-tr font-size="12" color="#5d6f61" >
				<t-td align="left">客户行业</t-td>
				<t-td align="left">{{item.client_industry}}</t-td>
			</t-tr>
			<t-tr font-size="12" color="#5d6f61" >
				<t-td align="left">单位电话</t-td>
				<t-td align="left">{{item.unit_phone}}</t-td>
			</t-tr>
			<t-tr font-size="12" color="#5d6f61" >
				<t-td align="left">单位传真</t-td>
				<t-td align="left">{{item.unit_fax}}</t-td>
			</t-tr>
			<t-tr font-size="12" color="#5d6f61" >
				<t-td align="left">地区</t-td>
				<t-td align="left">{{item.region}}</t-td>
			</t-tr>
			<t-tr font-size="12" color="#5d6f61" >
				<t-td align="left">备注</t-td>
				<t-td align="left">{{item.region}}</t-td>
			</t-tr> -->
		</t-table>
	</view>
</template>

<script>
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	export default {
		 components: {
		            tTable,
		            tTh,
		            tTr,
		            tTd
		        },
		data() {
			return {
				aid:0,
				tableList:[]
				
			}
		},
		methods: {
			async getMessages(){
				const res = await this.$myRequest({
					url:'client/'
				})
				console.log(res)
				this.tableList = res.data.results
			}
			
		},
		computed:{
		    // 筛选指定字段
		    filterList:function(){
		        return this.tableList.filter(function(item){
		          if(item.aid=aid){
		            return item;
		          }
		        });
		     }
		},
		onLoad() {
			this.getMessages()
		}
	}
</script>

<style lang="scss">
	.table{
		margin: 50px 10px;
	}
</style>

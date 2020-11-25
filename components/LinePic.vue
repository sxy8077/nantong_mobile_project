<template>
		<view class="qiun-columns">
			<view class="qiun-charts" >
				<canvas :canvas-id="id" :id="id" class="charts" disable-scroll=true @touchstart="touchLineA"></canvas>
			</view>
		</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
		var _self;
		// var canvaLineA=null;
		export default {
			name:'linePic',
			props:['canvasData','id'],
			data() {
				return {
					cWidth:'',
					cHeight:'',
					pixelRatio:1,
				}
			},
			mounted() {
				_self = this;
				_self.cWidth=uni.upx2px(750);
				_self.cHeight=uni.upx2px(500);
			},
			watch:{
				'canvasData.categories':{
					 // 监听数据变化后重新生成图表
					 handler:function(newName,oldName) {
						setTimeout(() => {
						    this.showLineA(this.canvasData,this.id);
						}, 100); 
					 },
					 immediate: true,
					 deep: true
				}
			},
			methods: {
				showLineA(chartData,id){
					 this.canvasData.canvas=new uCharts({
						$this:_self,
						canvasId: id,
						type: 'line',
						fontSize:11,
						legend:{show:true},
						dataLabel:false,
						dataPointShape:true,
						background:'#FFFFFF',
						
						pixelRatio:this.pixelRatio,
						
						dataPointShape:false,
						categories: chartData.categories,
						series: chartData.series,
						animation: true,
						xAxis: {
							type:'grid',
							labelCount: 3,
							itemCount:chartData.length,
						},
						yAxis: {
							// splitNumber:5,
							// min:10,
							// max:180,
							format:(val)=>{return val.toFixed(2)}
						},
						width: this.cWidth*this.pixelRatio,
						height: this.cHeight*this.pixelRatio,
						extra: {
							line:{
								type: 'straight',
								width:1,
							}
						}
					});
					
				},
				touchLineA(e){
					 this.canvasData.canvas.showToolTip(e, {
						format: function (item, category) {
							return category + ' ' + item.name + ':' + item.data 
						}
					});
				}
			}
		}
</script>

<style lang="scss" scoped>
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
		.qiun-charts {
			width: 750upx;
			height: 500upx;
			background-color: #FFFFFF;
			margin-top: 10px;
		}
		
		.charts {
			width: 750upx;
			height: 500upx;
			background-color: #FFFFFF;
		}
</style>

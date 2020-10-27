<template>
	<view>
		<view class="u-page">
			<view>
				<u-subsection :list="tabList" active-color="#2979ff" :current="1"></u-subsection>
			</view>
			<view class="qiun-columns">
					<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
						<view class="qiun-title-dot-light">基本折线图</view>
					</view>
					<view class="qiun-charts" >
						<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
					</view>
				</view>
		</view>
		<u-tabbar :list="vuex_tabbar" :mid-button="true" :bg-color="tabbarBgColor" :active-color="tabbarActiveColor"></u-tabbar>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import uCharts from '../../js_sdk/u-charts/u-charts/u-charts.js';
		var _self;
		var canvaLineA=null;
	
	export default {
		computed: {
			...mapState(['vuex_tabbar', 'tabbarBgColor', 'tabbarActiveColor'])
		},
		data() {
			return {
				list: this.vuex_tabbar,
				tabList: [
					{
						name: '周'
					}, 
					{
						name: '月'
					}, 
					{
						name: '年'
					}
				],
				current: 2,
				cWidth:'',
								cHeight:'',
								pixelRatio:1,
			}
		},
		onLoad() {
					_self = this;
								this.cWidth=uni.upx2px(750);
								this.cHeight=uni.upx2px(500);
								this.getServerData();
				},
				methods: {
					getServerData(){
									uni.request({
										url: 'https://www.ucharts.cn/data.json',
										data:{
										},
										success: function(res) {
											console.log(res.data.data)
											let LineA={categories:[],series:[]};
											//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
											LineA.categories=res.data.data.LineA.categories;
											LineA.series=res.data.data.LineA.series;
											_self.showLineA("canvasLineA",LineA);
										},
										fail: () => {
											_self.tips="网络错误，小程序端请检查合法域名";
										},
									});
								},
								showLineA(canvasId,chartData){
									canvaLineA=new uCharts({
										$this:_self,
										canvasId: canvasId,
										type: 'line',
										fontSize:11,
										legend:{show:true},
										dataLabel:false,
										dataPointShape:true,
										background:'#FFFFFF',
										pixelRatio:_self.pixelRatio,
										categories: chartData.categories,
										series: chartData.series,
										animation: true,
										xAxis: {
											type:'grid',
											gridColor:'#CCCCCC',
											gridType:'dash',
											dashLength:8
										},
										yAxis: {
											gridType:'dash',
											gridColor:'#CCCCCC',
											dashLength:8,
											splitNumber:5,
											min:10,
											max:180,
											format:(val)=>{return val.toFixed(0)+'元'}
										},
										width: _self.cWidth*_self.pixelRatio,
										height: _self.cHeight*_self.pixelRatio,
										extra: {
											line:{
												type: 'straight'
											}
										}
									});
									
								},
								touchLineA(e) {
									canvaLineA.showToolTip(e, {
										format: function (item, category) {
											return category + ' ' + item.name + ':' + item.data 
										}
									});
								}
				}
	}
</script>

<style>
	page{background:#F2F2F2;width: 750upx;overflow-x: hidden;}
	.qiun-padding{padding:2%; width:96%;}
	.qiun-wrap{display:flex; flex-wrap:wrap;}
	.qiun-rows{display:flex; flex-direction:row !important;}
	.qiun-columns{display:flex; flex-direction:column !important;}
	.qiun-common-mt{margin-top:10upx;}
	.qiun-bg-white{background:#FFFFFF;}
	.qiun-title-bar{width:96%; padding:10upx 2%; flex-wrap:nowrap;}
	.qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
	/* 通用样式 */
	.qiun-charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
	.charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
</style>

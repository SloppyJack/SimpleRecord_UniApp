<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#5098FF" ref="tabs" :list="tabList" :current="current" @change="tabChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
						<view>
							<u-empty text="如何展示周数据呢？😊" mode="list" margin-top="100"></u-empty>
						</view>
				</swiper-item>
				<swiper-item class="swiper-item">
						<view>
							<view class="qiun-padding">
							<view class="qiun-columns">
								<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
									<view class="qiun-title-dot-light">近六个月收支分析</view>
								</view>
								<view class="qiun-charts" >
									<canvas canvas-id="canvasLineB" id="canvasLineB" class="charts" @touchstart="touchLineB"></canvas>
								</view>
							</view>
							</view>
						</view>
				</swiper-item>
				<swiper-item class="swiper-item u-p-b-x-50">
						<view>
							<view class="qiun-padding">
							<view class="qiun-columns">
								<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
									<view class="qiun-title-dot-light">年支出分析</view>
								</view>
								<view class="qiun-charts" >
									<canvas canvas-id="canvaPieA" id="canvaPieA" class="charts" @touchstart="touchPieA"></canvas>
								</view>
							</view>
							</view>
							<view class="qiun-padding">
							<view class="qiun-columns">
								<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
									<view class="qiun-title-dot-light">年收入分析</view>
								</view>
								<view class="qiun-charts" >
									<canvas canvas-id="canvaPieB" id="canvaPieB" class="charts" @touchstart="touchPieB"></canvas>
								</view>
							</view>
							</view>
						</view>
				</swiper-item>
			</swiper>
		</view>
		<u-tabbar :list="vuex_tabbar" :mid-button="true" :bg-color="tabbarBgColor" :active-color="tabbarActiveColor"></u-tabbar>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import uCharts from '../../js_sdk/u-charts/u-charts/u-charts.js';
	var _self;
	var canvaLineB=null;
	var canvaPieA = null;
	var canvaPieB = null;
	
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
				current: 1,
				swiperCurrent: 1,
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				firstIn: [true, true, true]	// 防止每次获取数据会卡顿
			}
		},
		methods: {
			tabChange(index) {
				this.swiperCurrent = index;
			},
			transition({ detail: { dx } }) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({ detail: { current } }) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				if(current == 1 && this.firstIn[1]) {
					this.getLineBData();
				} else if(current == 2 && this.firstIn[2]) {
					this.getPieData();
				}
				this.current = current;
			},
			getLineBData(){
				this.$u.api.getLatestSixMonthList({
					beginDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1 -5),
					recordTypeCode: 'expendType'
				}).then(expendRes => {
					this.$u.api.getLatestSixMonthList({
						beginDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1 -5),
						recordTypeCode: 'incomeType'
					}).then(incomeRes => {
						// 将标志设为F
						this.firstIn[1] = false;
						let LineB={categories:[],series:[]};
						let expendTemp = {
							name: '支出',
							data: [],
							color: '#fa3534'
						};
						expendRes.forEach(n => {
							LineB.categories.push(n.occurMonth);
							expendTemp.data.push(n.total);
						});
						let incomeTemp = {
							name: '收入',
							data: [],
							color: '#19be6b'
						};
						incomeRes.forEach(n => {
							incomeTemp.data.push(n.total);
						})
						LineB.series.push(expendTemp, incomeTemp);
						_self.showLineB("canvasLineB",LineB);
					});
				});
			},
			showLineB(canvasId,chartData){
				canvaLineB=new uCharts({
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
			touchLineB(e) {
				canvaLineB.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			showPieA(canvasId,chartData){
				canvaPieA=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'pie',
					fontSize:11,
					legend:{
					  show:true,
					  position:'left',
					  float:'center',
					  itemGap:10,
					  padding:5,
					  lineHeight:26,
					  margin:5,
					  borderWidth :1
					},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
						  labelWidth:15
						}
					},
				});
			},
			showPieB(canvasId,chartData){
				canvaPieB=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'pie',
					fontSize:11,
					legend:{
					  show:true,
					  position:'left',
					  float:'center',
					  itemGap:10,
					  padding:5,
					  lineHeight:26,
					  margin:5,
					  borderWidth :1
					},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
						  labelWidth:15
						}
					},
				});
			},
			touchPieA(e){
				canvaPieA.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data 
					}
				});
			},
			touchPieB(e){
				canvaPieB.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data 
					}
				});
			},
			getPieData() {
				this.$u.api.getSpendCategoryTotal(
					new Date().getFullYear(),
					'expendType'
				).then(res => {
					let pieDataA = {series:[]};;
					if(res.length == 0) {
						pieDataA.series.push({name: '暂无支出记录', data: 0});
					} else {
						res.forEach(n => {
							let temp = {name: n.spendCategoryName, data: n.total};
							pieDataA.series.push(temp);
						});
					}
					this.showPieA("canvaPieA",pieDataA);
				});
				this.$u.api.getSpendCategoryTotal(
					new Date().getFullYear(),
					'incomeType'
				).then(res => {
					// 将标志设为F
					this.firstIn[2] = false;
					let pieDataB = {series:[]};;
					if(res.length == 0) {
						pieDataB.series.push({name: '暂无收入记录', data: 0});
					} else {
						res.forEach(n => {
							let temp = {name: n.spendCategoryName, data: n.total};
							pieDataB.series.push(temp);
						});
					}
					this.showPieB("canvaPieB",pieDataB);
				});
			}
		},
		onLoad() {
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.getLineBData();
		},
		onPullDownRefresh() {
			this.firstIn=[true, true, true];
			if(this.current == 1 && this.firstIn[1]) {
				this.getLineBData();
			} else if(this.current == 2 && this.firstIn[2]) {
				this.getPieData();
			}
			uni.stopPullDownRefresh();
		}
	}
</script>

<style>
	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}
	.swiper-box {
		flex: 1;
	}
	.swiper-item {
		height: 100%;
	}
	page{background:#F2F2F2;width: 750upx;overflow-x: hidden;}
	.qiun-padding{padding:2%; width:96%;}
	.qiun-wrap{display:flex; flex-wrap:wrap;}
	.qiun-rows{display:flex; flex-direction:row !important;}
	.qiun-columns{display:flex; flex-direction:column !important;}
	.qiun-common-mt{margin-top:10upx;}
	.qiun-bg-white{background:#FFFFFF;}
	.qiun-title-bar{width:720upx; padding:10upx 2%; flex-wrap:nowrap;}
	.qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
	/* 通用样式 */
	.qiun-charts{width: 720upx; height:500upx;background-color: #FFFFFF;}
	.charts{width: 720upx; height:500upx;background-color: #FFFFFF;}
</style>

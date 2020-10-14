<template>
	<view>
		<text class="example-info">列表组件可以在其中使用图标、略缩图或放置任何你想放的元素，使用场景如：导航菜单、列表、设置中心排版等</text>
		<uni-section title="基础用法" type="line"></uni-section>
		<uni-list>
			<uni-list-item title="列表文字" rightText="右侧文字" />
			<uni-list-item title="列表文字" note="列表描述信息" rightText="右侧文字" />
			<uni-list-item title="列表文字" rightText="右侧文字" />
			<uni-list-item title="列表文字" note="列表描述信息" rightText="右侧文字" />
			<uni-list-item title="列表文字" rightText="右侧文字" />
			<uni-list-item title="列表文字" note="列表描述信息" rightText="右侧文字" />
			<uni-list-item title="列表文字" rightText="右侧文字" />
			<uni-list-item title="列表文字" note="列表描述信息" rightText="右侧文字" />
			<uni-list-item title="列表文字" rightText="右侧文字" />
			<uni-list-item title="列表文字" note="列表描述信息" rightText="右侧文字" />
			<uni-list-item title="列表文字" rightText="右侧文字" />
			<uni-list-item  clickable="false" title="列表文字" note="列表描述信息" rightText="右侧文字" >
				
			</uni-list-item>
			
		</uni-list>
		
			<uni-section title="基本用法" type="line"></uni-section>
			<uni-swipe-action>
				<uni-swipe-action-item :left-options="options" :threshold="0" :right-options="options" @click="bindClick">
					<view class="content-box">
						<text class="content-text">使用数据填充</text>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
			
		
		<u-loadmore :status="status" />
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				extraIcon: {
					color: '#4cd964',
					size: '22',
					type: 'gear-filled'
				},
				status: 'loadmore',
				year: new Date().getFullYear(),
				month: new Date().getMonth() + 1,
				recordTypeCode: 'expendType',
				pageIndex: 0,
				pageSize: 50,
				options:[
					{
						text: '取消',
						style: {
							backgroundColor: '#007aff'
						}
					}, {
						text: '确认',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			};
		},
		methods: {
			onClick(e) {
				console.log('执行click事件', e.data)
				uni.showToast({
					title: '点击反馈'
				});
			},
			switchChange(e) {
				uni.showToast({
					title: 'change:' + e.value,
					icon: 'none'
				});
			},
			onReachBottom() {
				console.log('loadmore');
			},
			getRecordListByMonth() {
				var temp = {
					'recordTypeCode': this.recordTypeCode,
					'date': this.year + '-' + this.month,
					'pageIndex': this.pageIndex,
					'pageSize': this.pageSize
				};
				console.log(temp);
				this.$u.api.getRecordListByMonth(temp).then(res => {
						console.log(res);
						this.$refs.uToast.show({
							title: '更新成功',
							type: 'success'
						});
				});
			},
			bindClick(e){
			      console.log('点击了'+(e.position === 'left' ? '左侧' : '右侧') + e.content.text + '按钮')
			    },
			    swipeChange(e,index){
			      console.log('当前状态：'+ open +'，下标：' + index)
			    }
		},
		onReady() {
			this.getRecordListByMonth();
		},
		onPullDownRefresh() {
			this.getRecordListByMonth();
			uni.stopPullDownRefresh();
		}
	};
</script>

<style lang="scss" scoped>
	.content-box {
		flex: 1;
		height: 44px;
		line-height: 44px;
		padding: 0 15px;
		position: relative;
		background-color: #fff;
		border-bottom-color: #f5f5f5;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}
	
	.content-text {
		font-size: 15px;
	}
</style>

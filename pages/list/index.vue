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
		<u-swipe-action :show="item.show" :index="index" 
			v-for="(item, index) in list" :key="item.id" 
			@click="click" @open="open"
			:options="options"
		>
			<view class="item u-border-bottom">
				<image mode="aspectFill" :src="item.images" />
				<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="title-wrap">
					<text class="title u-line-2">{{ item.title }}</text>
				</view>
			</view>
		</u-swipe-action>
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
				list: [
					{
						id: 1,
						title: '长安回望绣成堆，山顶千门次第开，一骑红尘妃子笑，无人知是荔枝来',
						images: 'https://cdn.uviewui.com/uview/common/logo.png',
						show: false
					},
					{
						id: 2,
						title: '新丰绿树起黄埃，数骑渔阳探使回，霓裳一曲千峰上，舞破中原始下来',
						images: 'https://cdn.uviewui.com/uview/common/logo.png',
						show: false
					},
					{
						id: 3,
						title: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
						images: 'https://cdn.uviewui.com/uview/common/logo.png',
						show: false,
					}
				],
				disabled: false,
				btnWidth: 180,
				show: false,
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
			click(index, index1) {
				if(index1 == 1) {
					this.list.splice(index, 1);
					this.$u.toast(`删除了第${index}个cell`);
				} else {
					this.list[index].show = false;
					this.$u.toast(`收藏成功`);
				}
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if(index != idx) this.list[idx].show = false;
				})
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
	
	.item {
		display: flex;
		padding: 20rpx;
	}
	
	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}
	
	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}
</style>

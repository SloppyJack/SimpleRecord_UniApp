<template>
	<view>
		<text class="example-info">{{recordList.length}}</text>
		<uni-section title="基础用法" type="line"></uni-section>
		<!-- <u-swipe-action :show="item.show" :index="index" 
			v-for="(item, index) in list" :key="item.id" 
			@click="click" @open="open"
			:options="options"
		>
			<view class="item u-border-bottom">
				<image mode="aspectFill" :src="item.images" />
				<view class="title-wrap">
					<text class="title u-line-2">{{ item.title }}</text>
				</view>
			</view>
		</u-swipe-action> -->
		<view v-for = "(item, index1) in recordList" :key="item.index1">
			<uni-section :title="item.occurTime" type="line"/>
			<u-swipe-action v-for="(record, index2) in item.list" :index="index2"
				:key="record.id" :options="options">
				<view >
				
						<u-row gutter="16">
							<u-col span="3" offset="1">
								<text class="title u-line-2">{{ record.spendCategoryName }}</text>
							</u-col>
							<u-col span="3" offset="1">
								<text class="title u-line-2">{{ record.amount }}</text>
							</u-col>
							<u-col span="3" offset="1">
								<text class="title u-line-2">{{ record.remarks }}</text>
							</u-col>
						</u-row>
				</view>
			</u-swipe-action>
		</view>
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
				],
				recordList: []
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
			getRecordListByMonth(init) {
				var temp = {
					'recordTypeCode': this.recordTypeCode,
					'date': this.year + '-' + this.month,
					'pageIndex': this.pageIndex,
					'pageSize': this.pageSize
				};
				console.log(temp);
				this.$u.api.getRecordListByMonth(temp).then(res => {
					if(init) {
						this.recordList = [];
					}
					res.forEach(n => {
						// 判断recordList的最后一个元素
						if(this.recordList.length < 1 || this.recordList[this.recordList.length - 1].occurTime != n.occurTime) {
							var temp = {
								'occurTime': n.occurTime,
								'list': [n]
							};
							this.recordList.push(temp);
						} else{
							this.recordList[this.recordList.length - 1].list.push(n);
						}
					});
					console.log(this.recordList);
					this.$refs.uToast.show({
						title: '更新成功'
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

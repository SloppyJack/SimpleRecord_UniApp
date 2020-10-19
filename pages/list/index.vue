<template>
	<view class="page">
		<view>
			<u-sticky>
				<view  class="sticky">
					<u-dropdown>
						<u-dropdown-item v-model="date" title="月份" :options="months" @change="changeMonth"></u-dropdown-item>
						<u-dropdown-item v-model="recordTypeCode" title="类别" :options="spendCategory" @change="changeCagegory"></u-dropdown-item>
					</u-dropdown>
				</view>
			</u-sticky>
		</view>
		<view class="item" v-for = "(item, index1) in recordList" :key="item.index1">
			<u-section :title="item.occurTime" :right="false"></u-section>
			<u-swipe-action v-for="(record, index2) in item.list" :show="record.show" :index="index1 + '-' +index2"
				:key="record.id" :options="options" @click="click" @open="open">
				<view class="content-box" >
						<u-row gutter="16">
							<u-col span="3" offset="1">
								<text class="content-text">{{ record.spendCategoryName == null ? '' : record.spendCategoryName }}</text>
							</u-col>
							<u-col span="3" offset="1">
								<text class="content-text">{{ record.amount == null ? '' : record.amount }}</text>
							</u-col>
							<u-col span="3" offset="1">
								<text class="content-text">{{ record.remarks == null ? '' : record.remarks }}</text>
							</u-col>
						</u-row>
				</view>
			</u-swipe-action>
		</view>
		<u-loadmore :status="status" @loadmore="loadmore" :load-text="loadText" />
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: 'loadmore',
				loadText: {
					'loadmore': '点击或上拉加载更多',
					'loading': '努力加载中',
					'nomore': '没有更多了'
				},
				date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
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
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],
				recordList: [],
				months:  [],
				spendCategory: [
					{
						label: '支出',
						value: 'expendType',
					},
					{
						label: '收入',
						value: 'incomeType'
					}
				],
				selectedMonth: '',
				selectedCategory: ''
			};
		},
		methods: {
			loadmore() {
				this.status = 'loading';
				// 页数增加
				this.pageIndex  = this.pageIndex + 1;
				this.getRecordListByMonth(false);
			},
			getRecordListByMonth(init) {
				if(init) {
					this.recordList = [];
					this.pageIndex = 0;
					this.status = 'loadmore';
				}
				var temp = {
					'recordTypeCode': this.recordTypeCode,
					'date': this.date,
					'pageIndex': this.pageIndex,
					'pageSize': this.pageSize
				};
				this.$u.api.getRecordListByMonth(temp).then(res => {
					if(res.length == 0) {
						this.status = 'nomore';
					}
					res.forEach(n => {
						n['show'] = false;
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
				var temp1 = Number(index.split('-')[0]);
				var temp2 = Number(index.split('-')[1]);
				if(index1 == 1) {
					this.recordList[temp1].list.splice(tmep2, 1);
					this.$u.toast(`删除了第${tmep2}个cell`);
				} else {
					this.recordList[temp1].list[temp2].show = false;
					this.$u.toast(`取消成功`);
				}
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				var temp1 = Number(index.split('-')[0]);
				var temp2 = Number(index.split('-')[1]);
				this.recordList[temp1].list[temp2].show = true;
				// 将其它的show置为false
				this.recordList.map((val, idx) => {
					if(temp1 == idx) {
						val.list.forEach((n, index) => {
							if(temp2 != index)
								n.show = false;
						});
					} else{
						val.list.forEach(n => n.show = false);
					}
					// if(temp2 != idx) this.recordList[temp1].list[idx].show = false;
				});
				console.log(this.recordList);
			},
			getLastSixMon() {
				var data = new Date();
				//获取年
				var year = data.getFullYear();
				//获取月
				var mon = data.getMonth() + 1;
				var arry = new Array();
				for (var i = 0; i < 6; i++) {
					if (mon <= 0) {
						year = year - 1;
						mon = mon + 12;
					}
					if (mon < 10) {
						mon = "0" + mon;
					}
					arry[i] = {
						'label': year + "-" + mon,
						'value': year + "-" + mon
					}
					mon = mon - 1;
				}
				return arry;
			},
			changeMonth(val) {
				this.getRecordListByMonth(true);
			},
			changeCagegory(val) {
				this.getRecordListByMonth(true);
			}
		},
		onReady() {
			this.getRecordListByMonth(true);
			this.months = this.getLastSixMon();
		},
		onPullDownRefresh() {
			this.getRecordListByMonth(true);
			uni.stopPullDownRefresh();
		}
	};
</script>

<style lang="scss" scoped>
	.sticky {
		width: 750rpx;
		height: 120rpx;
		background-color: #eeeeef;
		color: #fff;
		padding: 24rpx;
		font-size: 36rpx;
	}
	
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
		font-size: 30rpx;
	}
	
	.item {
		padding-top: 10rpx;
	}
</style>

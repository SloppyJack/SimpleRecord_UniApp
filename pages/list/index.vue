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
		<uni-swipe-action>
		<view class="item" v-for = "(item, index1) in recordList" :key="index1">
			<u-section :title="item.occurTime" :right="false"></u-section>
			<uni-swipe-action-item v-for="(record, index2) in item.list" :index="index2"
				:key="record.id" :options="options" @click="click($event, index1 + '-' + index2)">
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
			</uni-swipe-action-item>
		</view>
		</uni-swipe-action>
		<u-loadmore :status="status" @loadmore="loadmore" :load-text="loadText" />
		<u-toast ref="uToast" />
		<u-modal v-model="showUpdateModel" title="修改" @confirm="confirmUpdate" :mask-close-able="true" :show-cancel-button="true" :async-close="true">
			<view class="model-wrap">
				<u-row gutter="16">
					<u-col span="3">
						<view class="u-font-13 info">金额</view>
					</u-col>
					<u-col span="9">
						<u-input disabled=true v-model="record.amount" @click="showKeyboard" />
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="3">
						<view class="u-font-13 info">日期</view>
					</u-col>
					<u-col span="9">
						<u-input type="select" v-model="record.occurTime" @click="showCalendar"/>
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="3">
						<view class="u-font-13 info">备注</view>
					</u-col>
					<u-col span="9">
						<u-input v-model="record.remarks"/>
					</u-col>
				</u-row>
			</view>
		</u-modal>
		<!-- 数组键盘 -->
		<u-keyboard mode="number" cancel-text="清除" @change="changeKeyboard" @backspace="backspaceKeyboard" @cancel="clearKeyboard" 
		v-model="showKeyBoardFlag"></u-keyboard>
		<!-- 日期选择器 -->
		<u-calendar v-model="showCalendarFlag" mode="date" @change="changeCalendar"/>
		<u-modal v-model="showDelModel" :content="'确定要删除吗?'" :mask-close-able="true" @confirm="confirmDel" :show-cancel-button="true"/>
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
						text: '修改',
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
				selectedCategory: '',
				showUpdateModel: false,
				record: {
					parentIndex: '',	// recordList数组下标
					index: '',	// recordList中list的下标
					id: '',
					spendCategoryId: '',
					amount: '',
					occurTime: '',
					remarks: ''
				},
				showKeyBoardFlag: false,
				showCalendarFlag: false,
				showDelModel: false
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
				let temp = {
					'recordTypeCode': this.recordTypeCode,
					'date': this.date,
					'pageIndex': this.pageIndex,
					'pageSize': this.pageSize
				};
				this.$u.api.getRecordListByMonth(temp).then(res => {
					const data = res.list
					if(data.length == 0) {
						this.status = 'nomore';
					}
					data.forEach(n => {
						// 判断recordList的最后一个元素
						if(this.recordList.length < 1 || this.recordList[this.recordList.length - 1].occurTime != n.occurTime) {
							let temp = {
								'occurTime': n.occurTime,
								'list': [n]
							};
							this.recordList.push(temp);
						} else{
							this.recordList[this.recordList.length - 1].list.push(n);
						}
					});
					this.$refs.uToast.show({
						title: '更新成功'
					});
				});
			},
			click(e, index) {
				let temp1 = Number(index.split('-')[0]);
				let temp2 = Number(index.split('-')[1]);
				// 赋值
				this.record.parentIndex = temp1;
				this.record.index = temp2;
				this.record.id = this.recordList[temp1].list[temp2].id;
				this.record.spendCategoryId = this.recordList[temp1].list[temp2].spendCategoryId;
				this.record.amount = this.recordList[temp1].list[temp2].amount;
				this.record.occurTime = this.recordList[temp1].list[temp2].occurTime;
				this.record.remarks = this.recordList[temp1].list[temp2].remarks;
				this.date = this.recordList[temp1].list[temp2].occurTime;
				if(e.index == 0) {
					this.showUpdateModel = true;
				} else {
					this.showDelModel = true;
				}
			},
			getLastSixMon() {
				let data = new Date();
				//获取年
				let year = data.getFullYear();
				//获取月
				let mon = data.getMonth() + 1;
				let arry = new Array();
				for (let i = 0; i < 6; i++) {
					if (mon <= 0) {
						year = year - 1;
						mon = mon + 12;
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
			},
			confirmUpdate() {
				console.log(this.record);
				let temp = {
					'spendCategoryId': this.record.spendCategoryId,
					'amount': this.record.amount,
					'occurTime': this.record.occurTime,
					'remarks': this.record.remarks
				};
				this.$u.api.updateRecord(this.record.id, temp).then(res => {
					this.rearrangeList();
					this.showUpdateModel = false;
					this.$refs.uToast.show({
						title: '更新成功'
					});
				});
			},
			showKeyboard() {
				this.showKeyBoardFlag = true;
			},
			// 数字键盘改变的监听事件
			changeKeyboard(val) {
				this.record.amount += val;
			},
			// 退格键被点击
			backspaceKeyboard() {
				// 删除value的最后一个字符
				if(this.record.amount.length) 
					this.record.amount = this.record.amount.substr(0, this.record.amount.length - 1);
			},
			clearKeyboard() {
				this.record.amount = '';
			},
			showCalendar() {
				this.showCalendarFlag = true;
			},
			changeCalendar(e) {
				this.record.occurTime = e.result;
			},
			confirmDel() {
				console.log(this.record.id);
				this.$u.api.delRecord(this.record.id).then(res => {
					// 删除元素
					this.recordList[this.record.parentIndex].list.splice(this.record.index, 1);
					this.showDelModel = false;
					this.$refs.uToast.show({
						title: '删除成功'
					});
				});
			},
			// 根据列表下表，最高效率重排列表
			rearrangeList() {
				let temp = this.recordList[this.record.parentIndex];
				// 如没有修改日期则只需更新list中的元素
				if(temp.occurTime == this.record.occurTime) {
					temp.list[this.record.index].occurTime = this.record.occurTime;
					temp.list[this.record.index].remarks = this.record.remarks;
					temp.list[this.record.index].amount = this.record.amount;
					return;
				}
				let recordTemp = this.$u.deepClone(temp.list[this.record.index]);
				// 如修改的recordList中的list大小为1，则直接删除
				if(temp.list.length == 1) {
					this.recordList.splice(this.record.parentIndex, 1);
				} else {
					// 删除list中的执行的元素
					temp.list.splice(this.record.index, 1);
				}
				// 默认加到list的最后面
				this.recordList[this.recordList.length - 1].list.push(recordTemp);
			}
		},
		onReady() {
			this.getRecordListByMonth(true);
			this.months = this.getLastSixMon();
			console.log(this.date)
		},
		onPullDownRefresh() {
			this.getRecordListByMonth(true);
			uni.stopPullDownRefresh();
		}
	};
</script>

<style lang="scss" scoped>
	.page {
		padding-bottom: 40rpx;
	}
	.sticky {
		width: 750rpx;
		height: 120rpx;
		background-color: #eeeeef;
		color: #fff;
		padding: 24rpx;
		font-size: 36rpx;
	}
	
	.scroll-Y {
		height: 600rpx;
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
	
	.model-wrap{
		padding: 24rpx;
	}
	
	.info{
		padding-top: 18rpx;
	}
</style>

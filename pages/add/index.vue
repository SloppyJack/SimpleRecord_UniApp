<template>
	<view class="wrap">
		<view class="u-tabs-box">
			<u-tabs activeColor="#5098FF" ref="tabs" :list="tabList" :current="current" @change="changeTab" :is-scroll="false"></u-tabs>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent"  @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
					<view class="page-box">
						<u-form :model="spendForm" ref="sForm">
							<u-form-item label="金额" prop="amount"><u-input disabled=true v-model="spendForm.amount" @click="showKeyboard" /></u-form-item>
							<u-form-item label="类别" prop="categoryName"><u-input type="select" v-model="spendForm.categoryName" @click="showSpendPicker" /></u-form-item>
							<u-form-item label="日期" prop="date"><u-input type="select" v-model="spendForm.date" @click="showCalendar" /></u-form-item>
							<u-form-item label="备注">
								<u-input v-model="spendForm.remarks" type="text" />
							</u-form-item>
						</u-form>
						<u-button type="primary" @click="submmitSpend">保存</u-button>
					</view>
			</swiper-item>
			<swiper-item class="swiper-item">
					<view class="page-box">
						<u-form :model="incomeForm" ref="iForm">
							<u-form-item label="金额" prop="amount"><u-input disabled=true v-model="incomeForm.amount"  @click="showKeyboard"/></u-form-item>
							<u-form-item label="类别" prop="categoryName"><u-input type="select" v-model="incomeForm.categoryName" @click="showIncomePicker" /></u-form-item>
							<u-form-item label="日期" prop="date"><u-input type="select" v-model="incomeForm.date" @click="showCalendar" /></u-form-item>
							<u-form-item label="备注">
								<u-input v-model="incomeForm.remarks" type="text" />
							</u-form-item>
						</u-form>
						<u-button type="primary" @click="submmitSpend">保存</u-button>
					</view>
			</swiper-item>
		</swiper>
		<!-- 数组键盘 -->
		<u-keyboard mode="number" cancel-text="清除" @change="changeKeyboard" @backspace="backspaceKeyboard" @cancel="clearKeyboard" 
		v-model="showKeyBoardFlag"></u-keyboard>
		<!-- 日期选择器 -->
		<u-calendar v-model="showCalendarFlag" mode="date" @change="changeCalendar"></u-calendar>
		<!-- picker -->
		<u-picker mode="selector" v-model="showSpendPickerFlag"  :default-selector="[0]" :range="spendCategory" range-key="name" @confirm="confirmSpendPicker"></u-picker>
		<u-picker mode="selector" v-model="showIncomePickerFlag"  :default-selector="[0]" :range="incomeCategory" range-key="name" @confirm="confirmIncomePicker"></u-picker>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabList: [
				{
					name: '支出'
				},
				{
					name: '收入'
				}
			],
			current: 0,
			swiperCurrent: 0,
			dx: 0,
			showKeyBoardFlag: false,
			showCalendarFlag: false,
			showSpendPickerFlag: false,
			showIncomePickerFlag: false,
			spendForm: {
				amount: '',
				categoryName: '',
				categoryId: null,
				date: '',
				remarks: ''
			},
			incomeForm: {
				amount: '',
				categoryName: '',
				categoryId: null,
				date: '',
				remarks: ''
			},
			sRules: {
				amount: [
					{
						type: 'number',
						required: true,
						message: '金额必须为数字',
						trigger: 'change'
					}
				],
				category: [
					{
						required: true,
						message: '请选择类别',
						trigger: ['change','blur']
					}
				],
				date: [
					{
					required: true,
					message: '请选择日期',
					trigger: 'change'
					}
				]
			},
			spendCategory: [],
			incomeCategory: []
		};
	},
	methods: {
		// tab栏切换
		changeTab(index) {
			this.swiperCurrent = index;
		},
		// transition({ detail: { dx } }) {
		// 	this.$refs.tabs.setDx(dx);
		// },
		animationfinish({ detail: { current } }) {
			// this.$refs.tabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		},
		showKeyboard() {
			this.showKeyBoardFlag = true;
		},
		showCalendar() {
			this.showCalendarFlag = true;
		},
		showSpendPicker() {
			this.showSpendPickerFlag = true;
		},
		showIncomePicker() {
			this.showIncomePickerFlag = true;
		},
		// 数字键盘改变的监听事件
		changeKeyboard(val) {
			if(this.current == 0) {
				this.spendForm.amount += val;
			} else {
				this.incomeForm.amount += val;
			}
		},
		// 退格键被点击
		backspaceKeyboard() {
			// 删除value的最后一个字符
			if(this.current == 0) {
				if(this.spendForm.amount.length) 
					this.spendForm.amount = this.spendForm.amount.substr(0, this.spendForm.amount.length - 1);
			} else{
				if(this.incomeForm.amount.length)
					this.incomeForm.amount = this.incomeForm.amount.substr(0, this.incomeForm.amount.length - 1);
			}
		},
		clearKeyboard() {
			if(this.current == 0) {
				this.spendForm.amount = '';
			} else{
				this.incomeForm.amount = '';
			}
		},
		changeCalendar(e) {
			if(this.current == 0) {
				this.spendForm.date = e.result;
			} else{
				this.incomeForm.date = e.result;
			}
		},
		confirmSpendPicker(index) {
			this.spendForm.categoryName = this.spendCategory[index].name;
			this.spendForm.categoryId = this.spendCategory[index].id;
		},
		confirmIncomePicker(index) {
			this.incomeForm.categoryName = this.incomeCategory[index].name;
			this.incomeForm.categoryId = this.incomeCategory[index].id;
		},
		submmitSpend() {
			if(this.current == 0) {
				this.$refs.sForm.validate(valid => {
					if (valid) {
						this.$u.api.recordInsert({
							amount: this.spendForm.amount,
							occurTime: this.spendForm.date,
							remarks: this.spendForm.remarks,
							spendCategoryId: this.spendForm.categoryId
						}).then(res => {
							this.spendForm.amount = "";
							this.spendForm.date = "";
							this.spendForm.remarks = "";
							this.spendForm.categoryId = null;
							this.spendForm.categoryName = "";
							this.$refs.uToast.show({
								title: '记账成功'
							});
						});
					}
				});
			} else{
				this.$refs.iForm.validate(valid => {
					if (valid) {
						this.$u.api.recordInsert({
							amount: this.incomeForm.amount,
							occurTime: this.incomeForm.date,
							remarks: this.incomeForm.remarks,
							spendCategoryId: this.incomeForm.categoryId
						}).then(res => {
							this.incomeForm.amount = "";
							this.incomeForm.date = "";
							this.incomeForm.remarks = "";
							this.incomeForm.categoryId = null;
							this.incomeForm.categoryName = "";
							this.$refs.uToast.show({
								title: '记账成功'
							});
						});
					}
				});
			}
		},
		getSpendCategory() {
			this.$u.api.getSpendCategory(2).then(res => {
				this.spendCategory = [];
				res.forEach(n => {
					var temp = {
						'name': n.name,
						'id': n.id
					};
					this.spendCategory.push(temp);
				});
			});
			this.$u.api.getSpendCategory(1).then(res => {
				this.incomeCategory = [];
				res.forEach(n => {
					var temp = {
						'name': n.name,
						'id': n.id
					};
					this.incomeCategory.push(temp);
				});
			})
		}
	},
	onLoad() {
		
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		this.$refs.sForm.setRules(this.sRules);
		this.$refs.iForm.setRules(this.sRules);
		this.getSpendCategory();
	},
	onPullDownRefresh() {
		this.getSpendCategory();
		uni.stopPullDownRefresh();
	}
};
</script>

<style lang="scss">
	page{
		background-color: #ededed;
	}
	
	.page-box {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;
	}
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
</style>

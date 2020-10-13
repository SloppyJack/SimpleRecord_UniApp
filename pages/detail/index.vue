<template>
	<view>
		<view>
			<view class="banner-wrapper">
				<u-image class="banner" width="100%" height="600rpx" :src="src"></u-image>
				<view class="banner-text">
					<u-row gutter="16">
						<u-col span="3" offset="1">
							{{year}}
							<u-line color="white" />
							{{month}}月
						</u-col>
						<u-col span="1" offset="1">
							<view class="col-line">
								<u-line color="red" direction="col" hair-line="false"/>
							</view>
						</u-col>
						<u-col span="2" offset="1">
							支出
							<u-line color="white" />
							{{expendTotal}}
						</u-col>
						<u-col span="2" offset="1">
							收入
							<u-line color="white" />
							{{incomeTotal}}
						</u-col>
					</u-row>
				</view>
			</view>
			<view>
				<u-card title="本月消费前三占比" sub-title="支出统计">
					<view class="" slot="body">
						<view v-if="spendTotalCategory.length > 0">
							<view class="u-body-item" v-for="item in spendTotalCategory" :key="item.index">
								{{item.spendCategoryName}}(金额:{{item.total}})
								<u-line-progress active-color="#2979ff" :percent="item.percent"></u-line-progress>
							</view>
						</view>
						<view v-else>
							<u-empty text="试试下拉刷新" mode="list"></u-empty>
						</view>
						
						
					</view>
					<view class="" slot="foot"><u-icon name="chat-fill" size="34" color="" label="查看更多"></u-icon></view>
				</u-card>
			</view>
			<u-modal v-model="show" @confirm="modelConfirm" :show-cancel-button="false" :content="content"></u-modal>
			<u-toast ref="uToast" />
		</view>
		<u-tabbar :list="vuex_tabbar" :mid-button="true" :bg-color="tabbarBgColor" :active-color="tabbarActiveColor"></u-tabbar>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex';
	
	export default {
		computed: {
			...mapState(['hasLogin', 'vuex_tabbar', 'tabbarBgColor', 'tabbarActiveColor'])
		},
		data() {
			return {
				show: false,
				content: '请先登录',
				list: this.vuex_tabbar,
				src: '/static/img/banner/swim.png',
				year: new Date().getFullYear(),
				month: new Date().getMonth() + 1,
				expendTotal: 0.00,
				incomeTotal: 0.00,
				spendTotalCategory: []
			}
		},
		methods: {
			...mapMutations(['login']),
			modelConfirm() {
				uni.redirectTo({
				    url: '../login/index'
				})
			},
			getTopThreeSpendTotal() {
				this.$u.api.getTopThreeSpendTotal({date: this.year + '-' + this.month}).then(res => {
					// 清空数组
					this.spendTotalCategory = [];
					res.forEach((n, index) => {
						var temp = {
							'index': index,
							'spendCategoryName': n.spendCategoryName,
							'spendCategoryId': n.spendCategoryId,
							'total': n.total,
							'percent': Math.round(n.total/this.expendTotal * 10000) / 100
						};
						this.spendTotalCategory.push(temp);
					});
				});
			},
			getSpendTotal() {
				this.$u.api.getSpendTotal({date: this.year + '-' + this.month}).then(res => {
					this.expendTotal = res[0];
					this.incomeTotal = res[1];
					this.getTopThreeSpendTotal();
					this.$refs.uToast.show({
						title: '更新成功',
						type: 'success'
					});
				});
			}
		},
		onLoad() {
			/* console.log(this.hasLogin)
			if(!this.hasLogin) {
				this.show = true;
			}
			console.log(this.$store) */
		},
		onReady() {
			this.getSpendTotal();
		},
		onPullDownRefresh() {
			this.getSpendTotal();
			uni.stopPullDownRefresh();
		}
	}
</script>

<style lang="scss" scoped>
	.banner-wrapper{
		position:relative;
		width: 100%;
		height: 100%;
		.banner{
		}
		.banner-text{
			position: absolute;
			z-index: 1;
			left: 0;
			bottom:0;
			width: 100%;
			color: #fff;
			background: rgba(0,0,0,.5);
			height: 200rpx;
			line-height: 100rpx;
			overflow: hidden;
			font-size: 40rpx;
			.col-line{
				width: 100%;
				height: 200rpx;
			}
		}
	}
	.u-body-item{
		padding-top: 20rpx;
	}
</style>

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
				incomeTotal: 0.00
			}
		},
		methods: {
			...mapMutations(['login']),
			modelConfirm() {
				uni.redirectTo({
				    url: '../login/index'
				})
			},
			getSpendTotal() {
				this.$u.api.getSpendTotal({date: this.year + '-' + this.month}).then(res => {
					this.expendTotal = res[0];
					this.incomeTotal = res[1];
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
</style>

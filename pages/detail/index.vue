<template>
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
				<view class="" slot="foot"><u-icon @click="showMore" name="chat-fill" size="34" color="" label="查看更多"></u-icon></view>
			</u-card>
		</view>
		<u-modal v-model="show" @confirm="modelConfirm" :show-cancel-button="false" :content="content"></u-modal>
		<u-modal v-model="authInfo.showAuth" @confirm="confirmAuth" :show-cancel-button="true" :content="authInfo.authContent"></u-modal>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex';
	
	export default {
		computed: {
			...mapState(['hasLogin'])
		},
		data() {
			return {
				show: false,
				content: '请先登录',
				src: '/static/img/banner/swim.png',
				year: new Date().getFullYear(),
				month: new Date().getMonth() + 1,
				expendTotal: 0.00,
				incomeTotal: 0.00,
				spendTotalCategory: [],
				authInfo: {
					token: '',
					authContent: '请确认是否授权',
					uuid: '',
					isAuth: false,
					showAuth: false
				}
			}
		},
		methods: {
			modelConfirm() {
				// 关闭提示
				this.show = false;
				uni.redirectTo({
				    url: '../login/index'
				})
			},
			async getTopThreeSpendTotal() {
				await this.$u.api.getTopThreeSpendTotal(this.year + '-' + this.month).then(res => {
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
			async getSpendTotal(showToast) {
				await this.$u.api.getSpendTotal(this.year + '-' + this.month).then(res => {
					this.expendTotal = res[0];
					this.incomeTotal = res[1];
				});
				await this.getTopThreeSpendTotal();
				if(showToast) {
					this.$refs.uToast.show({
						title: '更新成功'
					});	
				}				
			},
			showMore() {
				uni.navigateTo({
				    url: '../list/index'
				});
			},
			// 确认授权
			async confirmAuth() {
				await this.qrCodeAuthorize(this.authInfo.uuid, this.authInfo.token)
				this.authInfo.showAuth = false
			},
			// 扫描二维码
			async scannQrcode(uuid) {
				await this.$u.api.qrCodeScan(uuid)
			},
			// 授权登录
			async qrCodeAuthorize(uuid, token) {
				const param = {
					'uuid': uuid,
					'token': token
				}
				await this.$u.api.qrCodeAuthorize(param).then(res => {
					this.$refs.uToast.show({
						title: '授权成功'
					});
				})
			},
			// 获取用户token
			getUserToken() {
				let userInfo = uni.getStorageSync('userInfo')
				this.authInfo.token = userInfo.token
			}
		},
		async onLoad(option) {
			console.log('detail show');
			//option为object类型，会序列化上个页面传递的参数
			const uuid = option.scene
			//等待登录成功	
			await this.$onLaunched;
			if(!this.hasLogin) {
				this.show = true;
			} else{
				await this.getSpendTotal();
				// 授权登录
				if(uuid && uuid.length === 32) {
					this.authInfo.uuid = uuid
					// 获取用户信息
					this.getUserToken()
					await this.scannQrcode(uuid)
					this.authInfo.showAuth = true
				}
			}
		},
		onPullDownRefresh() {
			this.getSpendTotal(true);
			uni.stopPullDownRefresh();
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #ededed;
	}
	
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

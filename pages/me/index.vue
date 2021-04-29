<template>
	<view>
		<view class="top">
			<u-top-tips ref="uTips"></u-top-tips>
		</view>
		<view>
			<view class="u-flex user-box u-p-t-30 u-p-l-30 u-p-r-20 u-p-b-30">
				<view class="u-m-r-10">
					<u-avatar :src="avatarUrl" size="140"></u-avatar>
				</view>
				<view class="u-flex-1">
					<view class="u-font-18 u-p-b-20">{{nikeName}}</view>
					<view class="u-font-14 u-tips-color">用户名:{{userName}}</view>
				</view>
				<view class="u-m-l-10 u-p-10">
					<u-icon name="scan" color="#969799" size="28"></u-icon>
				</view>
				<view class="u-m-l-10 u-p-10">
					<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
				</view>
			</view>
			<view class="u-m-t-20">
				<u-cell-group>
					<u-cell-item icon="star" title="收藏"></u-cell-item>
					<u-cell-item icon="photo" title="相册"></u-cell-item>
					<u-cell-item icon="coupon" title="卡券"></u-cell-item>
					<u-cell-item icon="share" title="分享"></u-cell-item>
				</u-cell-group>
			</view>
			
			<view class="u-m-t-20">
				<u-cell-group>
					<u-cell-item icon="info" title="关于"></u-cell-item>
				</u-cell-group>
			</view>
			
			<view class="u-m-t-20">
				<u-cell-group>
					<u-cell-item icon="close" title="退出" @click="exit"></u-cell-item>
				</u-cell-group>
			</view>
		</view>
		<u-modal v-model="show" @confirm="modelConfirm" :show-cancel-button="false" :content="content"></u-modal>
		<u-modal v-model="showAuth" @confirm="confirmAuth" :show-cancel-button="true" :content="authContent"></u-modal>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex';
	
	export default {
		data() {
			return {
				show: false,
				content: '请先登录',
				userName: '',
				nikeName: '',
				avatarUrl:'',
				token: '',
				authContent: '请确认是否授权',
				uuid: '',
				isAuth: false,
				showAuth: false
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		methods: {
			...mapMutations(['logout']),
			getUserInfo() {
				// 获取用户信息
				let userInfo = uni.getStorageSync('userInfo')
				this.userName = userInfo.name
				this.nikeName = userInfo.nike
				this.avatarUrl = userInfo.avatarUrl
				this.token = userInfo.token
			},
			exit() {
				this.logout();
				this.$refs.uTips.show({
					title: '退出成功',
					type: 'warning',
					duration: 1000,
					});
				setTimeout(function() {
					uni.redirectTo({
					    url: '../login/index'
					})
				},1500);
			},
			modelConfirm() {
				uni.redirectTo({
				    url: '../login/index'
				})
			},
			// 确认授权
			async confirmAuth() {
				await this.qrCodeAuthorize(this.uuid, this.token)
				this.showAuth = false
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
			}
		},
		onShow() {
			if(this.isAuth) {
				// 如为授权，则暂不请求用户信息
				return
			}
			// 等待登录成功
			if(!this.hasLogin) {
				this.show = true;
			} else{
				// 关闭提示
				this.show = false;
				this.getUserInfo();
			}
		},
		async onLoad(option) {
			//option为object类型，会序列化上个页面传递的参数
			const uuid = option.scene
			if(uuid.length === 32) {
				this.isAuth = true
				this.uuid = uuid
				// 获取用户信息
				this.getUserInfo()
				await this.scannQrcode(uuid)
				this.showAuth = true
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #ededed;
	}
	
	.camera{
		width: 54px;
		height: 44px;
		
		&:active{
			background-color: #ededed;
		}
	}
	.user-box{
		background-color: #fff;
	}
</style>

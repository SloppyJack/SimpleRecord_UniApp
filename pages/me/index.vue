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
					<u-cell-item icon="star"  @click="clickBadge" title="徽章"></u-cell-item>
					<u-cell-item icon="share"  @click="clickShare" title="分享"></u-cell-item>
				</u-cell-group>
			</view>
			
			<view class="u-m-t-20">
				<u-cell-group>
					<u-cell-item icon="info" @click="clickAbout" title="关于简账"></u-cell-item>
				</u-cell-group>
			</view>
			
			<view class="u-m-t-20">
				<u-cell-group>
					<u-cell-item icon="close" title="退出" @click="exit"></u-cell-item>
				</u-cell-group>
			</view>
		</view>
		<u-modal v-model="show" @confirm="modelConfirm" :show-cancel-button="false" :content="content"></u-modal>
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
				avatarUrl:''
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
			// 跳转至关于
			clickAbout() {
				uni.navigateTo({
				    url: './about/index'
				});
			},
			// 点击徽章
			clickBadge() {
				this.$refs.uToast.show({
					title: '徽章功能即将上线~'
				});
			},
			// 点击分享
			clickShare() {
				this.$refs.uToast.show({
					title: '分享功能即将上线~'
				});
			}
		},
		onShow() {
			// 等待登录成功
			if(!this.hasLogin) {
				this.show = true;
			} else{
				// 关闭提示
				this.show = false;
				this.getUserInfo();
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

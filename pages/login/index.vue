<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录简账</view>
			<view class="u-font-13">
				<input class="u-border-bottom" type="text" v-model="username" placeholder="请输入用户名" />
				<input class="u-border-bottom" type="password" v-model="password" placeholder="密码" />
			</view>
			<view class="center-vertical u-line-1">
				<u-button class="u-line-1" @click="submit" type="primary" shape="square"
				:ripple="true">登录</u-button>
			</view>
			<view class="alternative">
				<view class="password">注册</view>
				<view class="issue">帮助</view>
			</view>
			<view>
				<u-toast ref="uToast" />
			</view>
		</view>
		<view class="buttom">
			<view class="loginType">
				<view class="wechat item">
					<view class="icon"><u-icon size="70" name="weixin-fill" color="rgb(83,194,64)"></u-icon></view>
					微信
				</view>
				<view class="QQ item">
					<view class="icon"><u-icon size="70" name="qq-fill" color="rgb(17,183,233)"></u-icon></view>
					QQ
				</view>
			</view>
			<view class="hint">
				登录代表同意
				<text class="link">用户协议、隐私政策，</text>
				并授权使用您的账号信息（如昵称、头像、收获地址）以便您统一管理
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			username: '',
			password: ''
		}
	},
	methods: {
		submit() {
			if(!this.$u.test.isEmpty(this.username) && !this.$u.test.isEmpty(this.password)) {
				// this.$u.route({
				// 	url: 'pages/login/code'
				// })
				this.$u.post('/user/login', {
					username: this.username,
					password: this.password
				}).then(res => {
					// res为服务端返回的数据
					console.log(res)
				}).catch(res=>{
					console.log('登录失败' + res)
				})
			} else{
				// 提示
				this.$refs.uToast.show({
					title: '请输入账号密码',
					type: 'error'
				})
			}
		}
	},
	onLoad() {
		
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.center-vertical{
			text-align: center;
		}
		.alternative {
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
	.buttom {
		.loginType {
			display: flex;
			padding: 350rpx 150rpx 150rpx 150rpx;
			justify-content:space-between;
			
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: $u-content-color;
				font-size: 28rpx;
			}
		}
		
		.hint {
			padding: 20rpx 40rpx;
			font-size: 20rpx;
			color: $u-tips-color;
			
			.link {
				color: $u-type-warning;
			}
		}
	}
}
</style>

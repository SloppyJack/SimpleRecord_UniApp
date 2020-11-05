<script>
	import {mapMutations} from 'vuex'
	export default {
		methods:{
			...mapMutations(['login']),
		},
		onLaunch: function() {
			console.log('App Launch');
			let userInfo = uni.getStorageSync("userInfo");
			if(userInfo.openId) {
				// 如果本地有存储的用户信息
				this.$u.api.wxLogin({
					openId : userInfo.openId,
					username: userInfo.name,
					nickname: userInfo.nike,
					sex: userInfo.sex,
					avatar: userInfo.avatarUrl
				}).then(res => {
					this.login(res);
					this.$isResolve();
				}).catch(e => {
					console.log('login error');
					this.$isResolve();
				});
			}else {
				this.$isResolve();
			}
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style lang="scss">
	
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	@import "./static/css/iconfont.css";
</style>
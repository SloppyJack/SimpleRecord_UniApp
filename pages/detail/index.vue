<template>
	<view>
		<view class="u-page">
			<view>这里是详情页</view>
			<u-modal v-model="show" @confirm="modelConfirm" :show-cancel-button="false" :content="content"></u-modal>
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
				list: this.vuex_tabbar
			}
		},
		methods: {
			...mapMutations(['login']),
			modelConfirm() {
				uni.redirectTo({
				    url: '../login/index'
				})
			}
		},
		onLoad() {
			/* console.log(this.hasLogin)
			if(!this.hasLogin) {
				this.show = true;
			}
			console.log(this.$store) */
		}
	}
</script>

<style>
</style>

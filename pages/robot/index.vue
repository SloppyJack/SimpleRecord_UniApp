<template>
	<view>
		<view class="u-page">
			<view>这里是树洞</view>
		</view>
		<u-tabbar :list="vuex_tabbar" :mid-button="true" v-model="current" :bg-color="tabbarBgColor" :active-color="tabbarActiveColor"></u-tabbar>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	
	export default {
		computed: {
			...mapState(['vuex_tabbar', 'tabbarBgColor', 'tabbarActiveColor'])
		},
		data() {
			return {
				list: this.vuex_tabbar,
				current: 3
			}
		},
		methods: {
			
		}
	}
</script>

<style>
</style>

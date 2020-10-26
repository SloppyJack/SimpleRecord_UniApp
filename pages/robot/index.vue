<template>
	<view>
		<view class="u-page">
			<u-empty text="功能正在开发中~" mode="list" margin-top="100"></u-empty>
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

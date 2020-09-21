<template>
	<view>
		<view class="u-page">
			<view>这里是记账页</view>
			<u-modal v-model="show" @confirm="modelConfirm" :show-cancel-button="false" :content="content"></u-modal>
		</view>
		<u-tabbar :list="vuex_tabbar" :mid-button="true" :bg-color="tabbarBgColor" :active-color="tabbarActiveColor"></u-tabbar>
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
				list: this.vuex_tabbar
			}
		},
		methods: {
			
		}
	}
</script>

<style>
</style>

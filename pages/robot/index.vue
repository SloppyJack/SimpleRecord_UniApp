<template>
	<view>
		<view class="u-page">
			<u-empty text="暂无数据~" mode="list" margin-top="100"></u-empty>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	
	export default {
		data() {
			return {
				current: 3
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #ededed;
	}
</style>

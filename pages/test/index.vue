<template>
	<view>
			<u-swipe-action :show="item.show" :index="index" 
				v-for="(item, index) in list" :key="item.id" 
				@click="click" @open="open"
				:options="options"
			>
				<view class="item u-border-bottom">
					<image mode="aspectFill" :src="item.images" />
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap">
						<text class="title u-line-2">{{ item.title }}</text>
					</view>
				</view>
			</u-swipe-action>
		</view>
</template>

<script>
	export default {
			data() {
				return {
					list: [
						{
							id: 1,
							title: '长安回望绣成堆，山顶千门次第开，一骑红尘妃子笑，无人知是荔枝来',
							images: 'https://cdn.uviewui.com/uview/common/logo.png',
							show: false
						},
						{
							id: 2,
							title: '新丰绿树起黄埃，数骑渔阳探使回，霓裳一曲千峰上，舞破中原始下来',
							images: 'https://cdn.uviewui.com/uview/common/logo.png',
							show: false
						},
						{
							id: 3,
							title: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
							images: 'https://cdn.uviewui.com/uview/common/logo.png',
							show: false,
						}
					],
					disabled: false,
					btnWidth: 180,
					show: false,
					options: [
						{
							text: '收藏',
							style: {
								backgroundColor: '#007aff'
							}
						},
						{
							text: '删除',
							style: {
								backgroundColor: '#dd524d'
							}
						}
					]
				};
			},
			methods: {
				click(index, index1) {
					if(index1 == 1) {
						this.list.splice(index, 1);
						this.$u.toast(`删除了第${index}个cell`);
					} else {
						this.list[index].show = false;
						this.$u.toast(`收藏成功`);
					}
				},
				// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
				open(index) {
					// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
					// 原本为'false'，再次设置为'false'会无效
					this.list[index].show = true;
					this.list.map((val, idx) => {
						if(index != idx) this.list[idx].show = false;
					})
				}
			}
		};
</script>

<style>
	.item {
			display: flex;
			padding: 20rpx;
		}
		
		image {
			width: 120rpx;
			flex: 0 0 120rpx;
			height: 120rpx;
			margin-right: 20rpx;
			border-radius: 12rpx;
		}
		
		.title {
			text-align: left;
			font-size: 28rpx;
			color: $u-content-color;
			margin-top: 20rpx;
		}
</style>

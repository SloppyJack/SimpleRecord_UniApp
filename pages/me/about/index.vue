<template>
	<view class="u-content">
		<u-parse :html="content"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: `
					<ol class=" list-paddingleft-2" style="list-style-type: decimal;">
					    <li>
					        <h2>
					            简账是什么？
					        </h2>
					        <p>
					            <strong>简账是一款开源的记账软件</strong>
					        </p>
					        <p>
					            <br/>
					        </p>
					    </li>
					    <li>
					        <h2>
					            简账要做什么？
					        </h2>
					        <p>
					            <strong>简账要做一款无广告、功能齐全的记账软件</strong>
					        </p>
					        <p>
					            <br/>
					        </p>
					        <p>
					            <br/>
					        </p>
					    </li>
					    <li>
					        <h2>
					            简账PC端地址
					        </h2>
					        <p>
					            <strong>简账PC端地址为：http://jianzhang.jackbin.cn（可微信扫码登录）</strong>
					        </p>
					        <p>
					            <br/>
					        </p>
					    </li>
					    <li>
					        <h2>
					            如何反馈新功能和Bug？
					        </h2>
					        <p>
					            <strong>反馈提供以下三个途径：</strong>
					        </p>
					        <p>
					            <strong>a. </strong><a href="https://github.com/SloppyJack" target="_self" title="Github"><strong>Github</strong></a><strong>：https://github.com/SloppyJack</strong>
					        </p>
					        <p>
					            <strong>b.&nbsp;</strong><a href="https://blog.csdn.net/weixin_38500202/category_11027299.html" target="_self" title="CSDN"><strong>CSDN</strong></a><strong>：搜索Coding&amp;Sharing</strong>
					        </p>
					        <p>
					            <strong>c.&nbsp;</strong><a href="https://juejin.cn/column/6960993522958729224" target="_self"><strong>掘金</strong></a><strong>：搜索SloppyJack</strong>
					        </p>
					        <p>
					            <br/>
					        </p>
					    </li>
					    <li>
					        <h2>
					            想要深入了解简账？
					        </h2>
					        <p>
					            <strong>相关博客已在CSDN、掘金更新中，快来社区找我8~</strong>
					        </p>
					    </li>
					</ol>
				`
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>

	.u-content {
		margin-top: 100rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}
</style>

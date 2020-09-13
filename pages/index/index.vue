<template>
	<view class="container">
		<u-modal v-model="show" @confirm="modelConfirm" @cancel="modalCancel" :content="content"></u-modal>
		<u-action-sheet :list="list" v-model="show"></u-action-sheet>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	
	export default {
		computed: mapState(['hasLogin']),
		data() {
			show: false
			
		},
		methods: {
			modelConfirm() {
				
			}
		},
		onLoad() {
			console.log(this.$store.hasLogin)
			if(!this.$store.hasLogin) {
				this.$refs.uToast.show({
									title: '登录成功',
									type: 'warning',
									icon: 'backspace',
									url: 'pages/login/index'
								})
			}
			console.log(this.$store)
		}
	}
</script>
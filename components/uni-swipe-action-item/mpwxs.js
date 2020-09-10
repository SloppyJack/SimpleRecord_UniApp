export default {
	data() {
		return {
			position: [],
			button: []
		}
	},
	computed: {
		pos() {
			return JSON.stringify(this.position)
		},
		btn() {
			return JSON.stringify(this.button)
		}
	},
	watch: {
		show(newVal) {
			if (this.autoClose) return
			let valueObj = this.position[0]
			if (!valueObj) {
				this.init()
				return
			}
			valueObj.show = newVal
			this.$set(this.position, 0, valueObj)
		}
	},
	created() {
		if (this.swipeaction.children !== undefined) {
			this.swipeaction.children.push(this)
		}
	},
	mounted() {
		this.init()

	},
	beforeDestroy() {
		this.swipeaction.children.forEach((item, index) => {
			if (item === this) {
				this.swipeaction.children.splice(index, 1)
			}
		})
	},
	methods: {
		init() {

			setTimeout(() => {
				this.getSize()
				this.getButtonSize()
			}, 50)
		},
		closeSwipe(e) {
			if (!this.autoClose) return
			this.swipeaction.closeOther(this)
		},

		change(e) {
			this.$emit('change', e.open)
			let valueObj = this.position[0]
			if (valueObj.show !== e.open) {
				valueObj.show = e.open
				this.$set(this.position, 0, valueObj)
			}
		},
		onClick(index, item) {
			this.$emit('click', {
				content: item,
				index
			})
		},
		appTouchStart(e) {
			const {
				clientX
			} = e.changedTouches[0]
			this.clientX = clientX
			this.timestamp = new Date().getTime()
		},
		appTouchEnd(e, index, item) {
			const {
				clientX
			} = e.changedTouches[0]
			// fixed by xxxx 模拟点击事件，解决 ios 13 点击区域错位的问题
			let diff = Math.abs(this.clientX - clientX)
			let time = (new Date().getTime()) - this.timestamp
			console.log(diff);
			if (diff < 40 && time < 300) {
				// console.log('点击');
				this.$emit('click', {
					content: item,
					index
				})
			}
		},
		getSize() {
			const views = uni.createSelectorQuery().in(this)
			views
				.selectAll('.selector-query-hock')
				.boundingClientRect(data => {
					if (this.autoClose) {
						data[0].show = false
					} else {
						data[0].show = this.show
					}
					this.position = data
				})
				.exec()
		},
		getButtonSize() {
			const views = uni.createSelectorQuery().in(this)
			views
				.selectAll('.button-hock')
				.boundingClientRect(data => {
					this.button = data
				})
				.exec()
		}
	}
}

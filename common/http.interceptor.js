const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'http://192.168.1.4:5000/api',
		// 设置为json，返回后会对数据进行一次JSON.parse()
		dataType: 'json',
		showLoading: true, // 是否显示请求中的loading
		loadingText: '请求中...', // 请求loading中的文字提示
		loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		originalData: false, // 是否在拦截器中返回服务端的原始数据
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
	});
	
	// 请求拦截部分，如配置，每次请求前都会执行
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// 引用token
		config.header.token = vm.$store.state.userInfo.token;
		// 最后需要将config进行return
		return config;
	};
	
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if(res.retCode == 0) {
			return res.data;
		} else if(res.retCode == 102 || res.retCode == 103) {
			console.log(res);
			vm.$u.toast(res.message);
			// 清除vuex中的状态
			vm.$store.state = null;
			setTimeout(() => {
				// 此为uView的方法，详见路由相关文档
				vm.$u.route('pages/login/index')
			}, 1500);
			return false;
		} else {
			console.log(res);
			// 如果返回false，则会调用Promise的reject回调，
			// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
			vm.$u.toast(res.message);
			return false;
		}
	}
}

export default {
	install
}
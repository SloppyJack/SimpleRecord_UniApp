import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import store from './store';
import httpInterceptor from '@/common/http.interceptor.js';
import apis from '@/common/http.api.js'

Vue.use(uView);
Vue.config.productionTip = false
Vue.prototype.$onLaunched = new Promise(resolve => {
    Vue.prototype.$isResolve = resolve
})
Vue.prototype.$store = store	// 挂载在Vue实例上

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

// 引入http请求的设置
Vue.use(httpInterceptor, app)
Vue.use(apis, app)
app.$mount()

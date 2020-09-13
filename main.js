import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import store from './store';

Vue.use(uView);
Vue.config.productionTip = false
Vue.prototype.$store = store	// 挂载在Vue实例上

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()

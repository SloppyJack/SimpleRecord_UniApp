//引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		token: '',
		avatarUrl: '',
		userName: ''
	},
	mutations: {
		login(state, provider) {
			console.log(state)
			console.log(provider)
			state.hasLogin = true;
			state.token = provider.token;
			state.userName = provider.userName;
			state.avatarUrl = provider.avatarUrl;
		},
		logout(state) {
			state.hasLogin = false;
			state.token = '';
			state.userName = '';
			state.avatarUrl = '';
		}
	}
})

export default store

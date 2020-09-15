//引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {
			id: '',
			name: "",
			token: '',
			email: '',
			sex: '',
			avatar: ''
			}
	},
	mutations: {
		login(state, provider) {
			console.log(state)
			console.log(provider)
			state.hasLogin = true;
			state.userInfo.token = provider.token;
			state.userInfo.userName = provider.userName;
			state.userInfo.avatarUrl = provider.avatarUrl;
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

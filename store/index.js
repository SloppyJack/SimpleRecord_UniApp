//引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {
			id: '',
			name: '',
			nike: '',
			token: '',
			email: '',
			sex: '',
			avatarUrl: '',
			openId: ''
		}
	},
	mutations: {
		login(state, userInfo) {
			state.hasLogin = true;
			state.userInfo.id = userInfo.id;
			state.userInfo.token = userInfo.token;
			state.userInfo.name = userInfo.username;
			state.userInfo.nike = userInfo.nickname;
			state.userInfo.email = userInfo.email;
			state.userInfo.sex = userInfo.sex;
			state.userInfo.avatarUrl = userInfo.avatarUrl;
			state.userInfo.openId = userInfo.openId;
			// 保存到缓存中
			uni.setStorageSync('userInfo', state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.clearStorageSync('userInfo');
		}
	}
})

export default store

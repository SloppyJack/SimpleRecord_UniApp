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
		},
		// 自定义tabbar数据
		vuex_tabbar: [{
				pagePath: "/pages/detail/index",
				iconPath: "mingxi",
				selectedIconPath: "mingxi",
				customIcon: true,
				text: "明细"
			},
			{
				pagePath: "/pages/chart/index",
				iconPath: "tubiao",
				selectedIconPath: "tubiao",
				customIcon: true,
				text: "图表"
			},
			{
				pagePath: "/pages/add/index",
				iconPath: "plus",
				selectedIconPath: "plus",
				text: "记一笔",
				midButton: true
			},
			{
				pagePath: "/pages/robot/index",
				iconPath: "robot",
				selectedIconPath: "robot",
				customIcon: true,
				text: "树洞"
			},
			{
				pagePath: "/pages/me/index",
				iconPath: "account",
				selectedIconPath: "account",
				text: "我的"
			}
		],
		tabbarBgColor: "#ffffff",
		tabbarActiveColor: "#5098FF"
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

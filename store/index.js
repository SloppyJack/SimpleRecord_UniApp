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
			token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwicGVybWlzc2lvbnMiOlsibG9nOnF1ZXJ5QWxsIiwibG9nOmZpbmQiLCJpbmZvOnRlc3QiLCJpbmZvOnJlYWRMaW4iLCJsb2c6cXVlcnlIaXN0b3J5Il0sImV4cCI6MTYwMzgyNDU3MiwiaWF0IjoxNjAzODAyOTcyfQ.3WAsVAkcErrZAnLtljeRKE9TIfSYs4KLQzWZs8UopjYel76fAf4UwZcf2rkuyloVFQnVP77D2c4QVQ_YOZ-kIw',
			email: '',
			sex: '',
			avatar: ''
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

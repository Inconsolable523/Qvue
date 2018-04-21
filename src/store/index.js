import Vue from 'vue'
import Vuex from 'vuex'
import url from '@/api/server.js'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// 主题颜色
		themeColor: '',
		// 存放用户信息
		userInfo: {
			userId: '',
			nickname: '',
			headPic: ''
		},
		// 机器人信息
		robot: {
			Info: {
				userId: 'robot',
				nickname: '小美',
				headPic: '/static/img/robot-headpic.jpg'
			},
			// 机器人打招呼
			greetMsg: 'hi~ 我是机器人小美，有什么可以帮您的嘛？'
		}
	},
	getters: {
		// 获取主题颜色
		getThemeColor: state => {
			return state.themeColor
		},
		// 获取登录用户信息
		getUserinfo: state => {
			return state.userInfo
		},
		// 获取机器人信息
		getRobotinfo: state => {
			return state.robot.Info
		},
		// 获取机器人欢迎语
		getRobotGreetMsg: state => {
			return state.robot.greetMsg
		}
	},
	mutations: {
		// 设置用户信息
		setUserinfo(state, userInfo) {
			state.userInfo.userId = userInfo.userId
			state.userInfo.nickname = userInfo.nickname
			state.userInfo.headPic = userInfo.headPic
		},
		// 设置聊天记录
		setHistoryMsg(state, msgList) {
			state.msgInfo = msgList
		},
		// 设置主题颜色
		setThemeColor(state, color) {
			state.themeColor = color
		}
	},
	actions: {
		// 注册用户
		async register({commite}, data) {
			const res = await url.register(data)
			if (res.data.state === 0) {
				return {
					status: 'fail',
					data: res.data.data
				}
			}
			return {
				status: 'success',
				data: res.data.data
			}
		},
		// 登录用户
		async login({commite}, data) {
			const res = await url.login(data)
			if (res.data.state === 0) {
				return {
					status: 'fail',
					data: res.data.data
				}
			}
			return {
				status: 'success',
				data: res.data.data
			}
		},
		// 上传图片
		async upload({commite}, data) {
			await url.upload(data)
		},
		// 获取聊天记录
		async getHistoryChatMsg({commite}, data) {
			const res = await url.gethistorychatmsg(data)
			return {
				status: 'success',
				data: res.data.data.msgList
			}
		},
		// 保存留言
		async saveLeaveMsg({commite}, data) {
			const res = await	url.saveleavemsg(data)
			return {
				status: res.data.data.stateText
			}
		},
		// 获取留言数据
		async getLeaveMsg({commite}) {
			const res = await url.getleavemsg()
			return {
				status: res.data.data.stateText,
				data: res.data.data.leaveMsg
			}
		}
	}
})

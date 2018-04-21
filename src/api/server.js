import Axios from './axios.js'
// const BaseUrl = 'http://www.chenleiming.com:3000'
const BaseUrl = ''
const Server = {
	// 注册用户
	register: data => Axios.post(BaseUrl + '/register', data),
  // 登录用户
  login: data => Axios.post(BaseUrl + '/login', data),
  // 上传图片
  upload: data => Axios.post(BaseUrl + '/upload', data),
  // 获取聊天记录
  gethistorychatmsg: data => Axios.get(BaseUrl + '/getHistoryChatMsg?roomId=' + data.roomId),
  // 保存留言
  saveleavemsg: data => Axios.post(BaseUrl + '/saveLeaveMsg', data),
  // 获取留言数据
  getleavemsg: () => Axios.get(BaseUrl + '/getLeaveMsg')
}
export default Server

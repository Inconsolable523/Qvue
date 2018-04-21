# vue.js+socket.io+express+mongodb打造在线聊天
# 在线地址观看
http://www.chenleiming.com/vuechat

# 介绍
本项目基于vue.js+socket.io+express+mongodb实现的聊天效果， 界面以及功能参考QQ，微信

## 技术栈
* 前端： vue,vue-router,vuex,axios
* 构建： webpack，vue-cli
* 后端： express，multer(上传图片)，cors(跨域处理), superagent(调用机器人接口),mongoose(操作数据库)
* 通讯： socket.io
* 数据库： mongodb
* css预处理器： sass
* 代码检查： eslint

## 功能列表
* [x] 用户注册
* [x] 用户登录
* [x] 群聊
* [x] 群聊中@小美 和机器人聊天 （注意@小美和消息中间要有空格）
* [x] 机器人聊天
* [x] 留言板
* [x] 更换主题颜色
* [x] 进出聊天群提醒
* [ ] 修改个人资料

## 功能演示

### 注册和登录

![image](https://github.com/clm960227/vuechat/blob/master/gif/gif1.gif)

### 群聊

![image](https://github.com/clm960227/vuechat/blob/master/gif/gif2.gif)

### 群聊中与机器人聊天
#### postscript: 群中与机器人聊天 @小美 和 消息 中间要有空格，否则会当成普通消息

![image](https://github.com/clm960227/vuechat/blob/master/gif/gif3.gif)

### 机器人聊天

![image](https://github.com/clm960227/vuechat/blob/master/gif/gif4.gif)

### 留言板

![image](https://github.com/clm960227/vuechat/blob/master/gif/gif5.gif)

### 更改主题颜色

![image](https://github.com/clm960227/vuechat/blob/master/gif/gif6.gif)

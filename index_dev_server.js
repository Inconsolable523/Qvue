var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var multer = require('./util/multer.js')
var cors = require('cors')
var request = require('superagent')

//bodyParse Config
var bodyParser = require('body-parser')

//cors跨域
app.use(cors())
// parse application/json
app.use(bodyParser.json())

//数据库model
var User = require('./Model/User.js')
var ChatMsg = require('./Model/ChatMsg.js')
var LeaveMsg = require('./Model/LeaveMsg.js')

function getuserId(){
  var result=''
  for(var i=0; i<32; i++) {
    result += Math.floor(Math.random()*16).toString(16)//获取0-15并通过toString转16进制
  }
  return result
}
// 注册用户
app.post('/register', function(req, res) {
  const userInfo = req.body
  //设置userId
  userInfo.userId = getuserId()
  User.findOne({username: userInfo.username}, (err, user) => {
    if (err){
      console.log('find user error!')
    }
    if (user) {
      res.json({
        state: 0,
        data: {
          stateText: '用户已存在!'
        }
      })
    }else {
      var user=new User(userInfo)
      user.save(function(err) {
        if (err) {
          console.log('Inser user error!')
          return
        }
        res.json({
          state: 1,
          data: {
            stateText: '注册成功！'
          }
        })
      })
    }
  })
})
// 登录用户
app.post('/login', function(req, res) {
  const data = req.body
  User.findOne({username: data.username,password: data.password}, (err, user) => {
    if (err) {
      console.log('login err')
      return
    }
    if (user) {
      res.json({
        state: 1,
        data: {
          stateText: '登录成功！',
          userId: user.userId,
          nickname: user.nickname,
          headPic: user.picUrl
        }
      })
    }else{
      res.json({
        state: 0,
        data: {
          stateText: '用户名或者密码错误！'
        }
      })
    }
  })
})
//上传图片
app.post('/upload', multer.single('file'), function(req, res) {
  res.end('req.file' + req.file)
})
// 获取聊天记录
app.get('/getHistoryChatMsg', function(req, res) {
  const room = req.query.roomId
  // 获取最后20条数据
  ChatMsg.find({roomId: room}).sort({timeStamp: 'desc'}).limit(20).exec((err, msg) => {
    if (err) {
      console.log('get history msg error')
    }
    res.json({
      state: 1,
      data: {
        msgList: msg.reverse()
      }
    })
  })
})
// 保存留言
app.post('/saveLeaveMsg', function(req, res) {
  const saveData = req.body
  const leaveMsgModel = new LeaveMsg(saveData)
  leaveMsgModel.save( (err) => {
    if(err) {
      console.log('save leave msg error : ' + err)
      res.json({
        state: 0,
        data: {
          stateText: 'save leave msg error'
        }
      })
    }else {
      res.json({
        state: 1,
        data: {
          stateText: '发送成功！'
        }
      })
    }
  })
})
// 获取留言
app.get('/getLeaveMsg', function(req, res) {
  LeaveMsg.find((err, msgdata) => {
    if (err) {
      console.log('get leave msg error!')
      res.json({
        sata: 0,
        data: {
          stateText: 'get leave msg error!'
        }
      })
    }
    res.json({
      state: 1,
      data: {
        stateText: 'get leave msg success!',
        leaveMsg: msgdata.reverse()
      }
    })
  })
})
// 获取机器人数据
function getRobotMsg(msg, callback) {
    const apiKey = 'a99ea56982f449a580896f4c2e24bbaa'
    const options = {
      "reqType":0,
      "perception": {
        "inputText": {
          "text": msg.text
        }
      },
      "userInfo": {
        "apiKey": apiKey,
        "userId": msg.userId
      }
    }
    request.post('http://openapi.tuling123.com/openapi/api/v2')
    .send(options) // query string
    .end((err, saRes) => {
      const resText = JSON.parse(saRes.text)
      const msgObj = {
        userId: 'robot',
        roomId: msg.roomId,
        timeStamp: msg.timeStamp || Date.parse(new Date()),
        nickname: '小美',
        headPic: '/static/img/robot-headpic.jpg',
        text: resText.results[0].values.text
      }
      callback(msgObj)
    })
}
// 保存聊天记录
function saveChatMsg(msg, callback) {
  //存聊天记录
  const msgModel = new ChatMsg(msg)
  msgModel.save((err) => {
    if(err) {
      console.log('insert msg error')
      return
    }
  })
  if(callback){
    callback()
  }
}
io.on('connection', (socket) => {
  // 进入房间
  socket.on('join-room', (info) => {
    // 添加到房间
    socket.join(info.roomId)
    const joinInfo = {
      status: info.status,
      text: info.nickname + '加入了群聊'
    }
    socket.to(info.roomId).broadcast.emit('join-room', joinInfo)
  })
  // 群聊天
  socket.on('chat-msg', (msg) => {
    saveChatMsg(msg, () => {
      io.to(msg.roomId).emit('chat-msg', msg)
      // 分割聊天消息，判断是否与机器人聊天
      const msgArr = msg.text.split(' ')
      const robotParam = {
        userId: msg.userId,
        roomId: msg.roomId || null,
        timeStamp: msg.timeStamp + 1 || null,
        text: msgArr[1]
      }
      if (msgArr[0] === '@小美') {
        getRobotMsg(robotParam, (robotmsg) => {
          saveChatMsg(robotmsg)
          io.to(msg.roomId).emit('chat-msg', robotmsg)
        })
      }
    })
  })
  // 机器人聊天
  socket.on('robot-msg', (msg) => {
    const robotParam = {
      userId: msg.userId,
      timeStamp: msg.timeStamp,
      text: msg.text
    }
    getRobotMsg(robotParam, (robotmsg) => {
      socket.emit('robot-msg', robotmsg)
    })
  })
  // 离开房间
  socket.on('leave-room', (info) => {
    socket.leave(info.roomId)
    const leaveInfo = {
      status: info.status,
      text: info.nickname + '离开了群聊'
    }
    socket.to(info.roomId).broadcast.emit('leave-room', leaveInfo)
  })
})
module.exports = http

var mongoose = require('mongoose');

//创建了一个schema结构
var MsgSchema = new mongoose.Schema({
    roomId: String,
    timeStamp: String,
    userId: String,
    headPic: String,
    nickname: String,
    text: String,
    img: String
})

module.exports = MsgSchema
var mongoose = require('mongoose');

//创建了一个schema结构
var MsgSchema = new mongoose.Schema({
    timeStamp: String,
    userId: String,
    headPic: String,
    nickname: String,
    text: String
})

module.exports = MsgSchema
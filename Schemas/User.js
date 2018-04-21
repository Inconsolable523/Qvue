var mongoose = require('mongoose');

//创建了一个schema结构
var UserSchema = new mongoose.Schema({
    userId: {
      unique: true,
      type: String
    },
    nickname: String,
    username: String,
    password: String,
    sex: String,
    picUrl: String
})

module.exports = UserSchema
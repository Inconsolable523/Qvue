var mongoose = require('mongoose')
var MsgSchema = require('../Schemas/ChatMsg.js')
var ChatMsg = mongoose.model('ChatMsg', MsgSchema)

module.exports = ChatMsg

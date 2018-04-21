var mongoose = require('mongoose')
var MsgSchema = require('../Schemas/LeaveMsg.js')
var LeaveMsg = mongoose.model('LeaveMsg', MsgSchema)

module.exports = LeaveMsg

var mongoose = require('mongoose')
var UserSchema = require('../Schemas/User.js')
var User = mongoose.model('User',UserSchema)

module.exports = User

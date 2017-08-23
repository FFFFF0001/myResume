const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
  username: {type: String, require: true},
  password: {type: String, require: true},
  created_at: {type: Date, default: Date.now},
  update_at: {type: Date, default: Date.now}
})
const user = mongoose.model('User', userSchema)
module.exports = user

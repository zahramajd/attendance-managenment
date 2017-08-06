const mongoose = require('mongoose')
const Schema = mongoose.Schema
const totpToken = require('otplib/core/totpToken').default

mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/test', {
  useMongoClient: true,
});

const _Device = new Schema({
  name: String,
  secret: String
})

_Device.virtual('otp').get(function () {
  return totpToken(this.secret)
})

const Device = mongoose.model('Device', _Device);

const User = mongoose.model('User', {
  first_name: String,
  last_name: String,
  username: String
});

const Session = mongoose.model('Session', {

  name: String,
  devices: [{
    type: Schema.Types.ObjectId,
    ref: 'Device'
  }],
  managers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  times: [{
    from: Number,
    to: Number,
    day: Number
  }]

});

const Log = mongoose.model('Log', {
  type: String,
  device_id: {
    type: Schema.Types.ObjectId,
    ref: 'Device'
  },
  session: {
    type: Schema.Types.ObjectId,
    ref: 'Session'
  }
})

module.exports = {
  Device,
  User,
  Session,
  Log
}

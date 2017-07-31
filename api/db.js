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
  attendees: [Schema.Types.ObjectId],
  rooms: [Schema.Types.ObjectId]
});

const Log = mongoose.model('Log', {
  type: String,
  device_id: {
    type: Schema.Types.ObjectId,
    ref: 'Device'
  },
})

module.exports = {
  Device,
  User,
  Session,
  Log
}

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { totpToken } = require('otplib/core')
const crypto = require('crypto')


mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/test', {
  useMongoClient: true,
});

const _Device = new Schema({
  name: String,
  secret: String
})

_Device.virtual('otp').get(function () {
  return totpToken(this.secret, { step: 30, crypto })
})

const Device = mongoose.model('Device', _Device);

const User = mongoose.model('User', {
  first_name: String,
  last_name: String,
  username: String,
  password: String,
  managerOf: [{
    type: Schema.Types.ObjectId,
    ref: 'Session'
  }],
  role: [String]
});

const Session = mongoose.model('Session', {

  name: String,
  devices: [{
    type: Schema.Types.ObjectId,
    ref: 'Device'
  }],
  attendees: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  times: [{
    from: Number,
    to: Number,
    day: Number
  }],
  start_date: Date,
  end_date: Date

});

const Log = mongoose.model('Log', {
  type: String,
  device: {
    type: Schema.Types.ObjectId,
    ref: 'Device'
  },
  session: {
    type: Schema.Types.ObjectId,
    ref: 'Session'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  timestamps: {
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
})


const Audit = mongoose.model('Audit', {
  devID: String,
  ip: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // will remove after 6 min
    expires: 360
  }
})

module.exports = {
  Device,
  User,
  Session,
  Log,
  Audit
}

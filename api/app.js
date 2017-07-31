const otplib = require('otplib').default
const express = require('express')
const bodyParser = require('body-parser')
const {
  Device,
  User,
  Session
} = require('./db')


const app = module.exports = express()

app.use(bodyParser.json())

app.listen(4000)
console.log('API Server listening on 4000')

// --------------------------------
// /api/new_dev : Creates new Device
// --------------------------------
app.post('/api/devices/new', async(req, res) => {
  var dev = new Device({
    name: req.body.name,
    secret: 'GFJXE6STPBNFKS2EJBXESMLPN52FI4LC'
  });

  await dev.save()
  res.end('new device has been added')

})

// --------------------------------
// /api/devices : List all devices
// --------------------------------
app.get('/api/devices', async(req, res) => {
  let devices = await Device.find({})
  res.json(devices)
})

// --------------------------------
// /api/new_user : Creates new User
// --------------------------------
app.post('/api/users/new', async(req, res) => {
  var user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username
  });

  await user.save()
  res.end('new user has been added')

})
// --------------------------------
// /api/users : List all users
// --------------------------------
app.get('/api/users', async(req, res) => {
  let users = await User.find({})
  res.json(users)
})

// --------------------------------
// /api/editusers : edit users
// TODO:
// -------------------------------- 
app.get('/api/users/edit', async(req, res) => {
  let users = await User.find({})
  res.json(users)
})

// --------------------------------
// /api/verifyotp : verify OTP
// --------------------------------
app.post('/api/otp/verify', async(req, res) => {
  const {
    username,
    otp
  } = req.body;

  let devices = await Device.find({})
  let device = devices.find(d => d.otp === otp)

  if (!device) {
    return res.json({
      error: 'Invalid Code! (device not found)'
    })
  }

  // TODO: LOGGGGG

  return res.json({
    device
  })
})

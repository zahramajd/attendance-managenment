const otplib = require('otplib').default
const express = require('express')
const bodyParser = require('body-parser')
const {
  Device,
  User,
  Session,
  Log
} = require('./db')

const app = module.exports = express()

app.use(bodyParser.json())

app.listen(4000)
console.log('API Server listening on 4000')

// --------------------------------
// /api/new_dev : Creates new Device
// --------------------------------

//TODO: make random secret
app.post('/api/devices/new', async (req, res) => {
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
app.get('/api/devices', async (req, res) => {
  let devices = await Device.find({})
  res.json(devices)
})

// --------------------------------
// /api/new_user : Creates new User
// --------------------------------
app.post('/api/users/new', async (req, res) => {
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
app.get('/api/users', async (req, res) => {
  let users = await User.find({})
  res.json(users)
})

// --------------------------------
// /api/editusers : edit users
// -------------------------------- 
app.post('/api/users/:userID/edit', async (req, res) => {

  console.log("man")
  let user = await User.findById(req.params.userID)
  user.managerOf.push(req.body._id)

  await user.save()
})

// --------------------------------
// /api/verifyotp : verify OTP
// --------------------------------
app.post('/api/otp/verify', async (req, res) => {

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

  // Find the UserID
  async function getUserID(username) {

    return await User.findOne({
      username: username
    })
  }
  // Find the session
  async function getSession(date, deviceId, userID) {

    date = new Date(date)
    day = date.getDay()
    hour = date.getHours()

    console.log(day, hour)

    let session = await Session.findOne({
      times: {
        $elemMatch: {
          day: day,
          from: {
            $lt: hour
          },
          to: {
            $gt: hour
          },
        }
      },
      devices: deviceId,
      attendees: userID
    })

    console.log(session)
    return session
  }

  let userID = await getUserID(username)
  console.log(userID)
  let session = await getSession(Date.now(), device._id, userID._id)
  console.log(session)


  var log = new Log({
    type: 'CHECK_IN',
    device: device,
    session: session,
    user: userID
  });

  await log.save()

  return res.json({
    device
  })
})

// --------------------------------
// /api/logs : List all logs
// --------------------------------
app.get('/api/logs', async (req, res) => {
  let logs = await Log.find({})
  res.json(logs)
})

// ----------------------------------------
// /api/sessions/new : Creates new Session
// ----------------------------------------
app.post('/api/sessions/new', async (req, res) => {
  var session = new Session({
    name: req.body.name,
  });

  await session.save()
  res.end('new session has been added')

})
// ----------------------------------
// /api/sessions : List all sessions
// ----------------------------------
app.get('/api/sessions', async (req, res) => {
  let sessions = await Session.find({})
  res.json(sessions)
})

// --------------------------------------------------------
// /api/sessions/:sessionID/detail : get detail of session
// --------------------------------------------------------
app.get('/api/sessions/:sessionID/detail', async (req, res) => {
  let session = await Session.findById(req.params.sessionID).populate('devices').populate('attendees')
  res.json(session)
})

// ---------------------------------------------------------------
// /api/sessions/:sessionID/times/add : add new time to a session
// ---------------------------------------------------------------
app.post('/api/sessions/:sessionID/times/add', async (req, res) => {

  Session.findByIdAndUpdate(
    req.params.sessionID, {
      $push: {
        times: {
          day: req.body.day,
          from: req.body.from,
          to: req.body.to
        }
      }
    },
  )
})

// --------------------------------------------
// /api/sessions/:sessionID/edit: edit session
// --------------------------------------------
app.post('/api/sessions/:sessionID/edit', async (req, res) => {
  let session = await Session.findById(req.params.sessionID)
  session.attendees = req.body.attendees
  session.devices = req.body.devices
  session.times = req.body.times

  await session.save()
})


// ----------------------------------------
// /api/manager-of/:userID : get managerOf
// -----------------------------------------
app.get('/api/manager-of/:userID', async (req, res) => {
  let user = await User.findById(req.params.userID).populate('managerOf')
  res.json(user)
})

// -----------------------------------------------------------------------
// /api/logs/sessionID : List logs of a certain session at a certain time
// -----------------------------------------------------------------------
app.get('/api/logs/:sessionID', async (req, res) => {
  let logs = await Log.find({
    session: req.params.sessionID
  }).sort({ 'timestamps': 'desc' }).populate('user')
  res.json(logs)
})
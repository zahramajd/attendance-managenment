const otplib = require('otplib')
const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const FileStore = require('session-file-store')(expressSession);
const ip = require('ip')

require('nuxt/lib/common/cli/errors')

const {
  Device,
  User,
  Session,
  Log,
  Audit
} = require('./db')

const app = module.exports = express()

app.use(bodyParser.json())

app.listen(4000)
console.log('API Server listening on 4000')

// configure passport
app.use(cookieParser())
app.use(expressSession({
  secret: 'cookies secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week 
  },
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user._id + '')
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
  (username, password, done) => {
    User.findOne({
      username: username
    }, (err, user) => {
      if (err) {
        return done(err)
      }
      if (!user) {
        console.log('in !user')
        return done(null, false, {
          message: 'Incorrect username.'
        })
      }
      if (user.password !== password) {
        console.log('in !password')

        return done(null, false, {
          message: 'Incorrect password.'
        })
      }
      return done(null, user)
    })
  }
))

app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json(err)
    req.logIn(user, (err) => {
      if (err) return res.status(401).json(info.message)
      return res.json(user)
    })
  })(req, res, next)
})

// --------------------------------------
// /api/devices/new : Creates new Device
// -------------------------------------
app.post('/api/devices/new', async (req, res) => {

  let result = false
  let devices = await Device.find({
    name: req.body.name,
  })

  if (devices.length == 0) {
    result = true
    let secret = otplib.authenticator.generateSecret();
    var dev = new Device({
      name: req.body.name,
      secret: secret
    });

    await dev.save()
  }
  res.json({
    result: result
  })

})
// --------------------------------
// /api/devices/secret/refresh : 
// --------------------------------
app.get('/api/devices/:deviceID/secret/refresh', async (req, res) => {

  let new_secret = otplib.authenticator.generateSecret()
  let device = await Device.findById(req.params.deviceID)
  device.secret = new_secret

  await device.save()
  res.end('bye')
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

  let result = false
  let users = await User.find({
    username: req.body.username,
  })

  if (users.length == 0) {
    result = true
    var user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password
    });

    await user.save()
  }
  res.json({
    result: result
  })
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

  let user = await User.findById(req.params.userID)
  user.first_name = req.body.first_name
  user.last_name = req.body.last_name
  user.username = req.body.username
  user.password = req.body.password

  await user.save()
})
// --------------------------------
// /api/editusers : add manager
// -------------------------------- 
app.post('/api/users/:userID/add_manager', async (req, res) => {

  let user = await User.findById(req.params.userID)
  user.managerOf.push(req.body._id)

  await user.save()
})

// --------------------------------
// /api/verifyotp : verify OTP
// --------------------------------
app.post('/api/otp/verify', async (req, res) => {

  const {
    otp,
    devID
  } = req.body;

  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.headers['x-real-ip']

  console.log('in verify', req.user.username, otp)

  let audits = await Audit.find({
    $or: {
      devID: devID,
      ip: ip
    }
  })

  if (audits.length !== 0) {
    return res.json({
      error: 'It seems you have already checked in with this device'
    })
  }


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

    return session
  }

  let userID = await getUserID(req.user.username)
  if (!userID) {
    return res.json({
      error: 'The user does not exist'
    })
  }

  let session = await getSession(Date.now(), device._id, userID._id)

  if (!session) {
    return res.json({
      error: 'The session is not now or the user is not in the list'
    })
  }

  if (session && device && userID) {
    var log = new Log({
      type: 'CHECK_IN',
      device: device,
      session: session,
      user: userID
    });

    await log.save()

    var audit = new Audit({
      devID: devID,
      user: userID,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    })

    await audit.save()
    return res.json({
      device
    })
  }
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

  let result = false
  let sessions = await Session.find({
    name: req.body.name
  })

  if (sessions.length == 0) {
    result = true
    let session = new Session({
      name: req.body.name,
    });
    await session.save()
  }
  res.json({
    result: result
  })
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
  session.start_date = req.body.start_date
  session.end_date = req.body.end_date

  await session.save()
})


// ----------------------------------------
// /api/manager-of/ : get managerOf
// -----------------------------------------
app.get('/api/user/manager-of', async (req, res) => {
  let q = {}

  if (req.user.role.indexOf('admin') === -1) {
    q._id = { $in: req.user.managerOf }
  }

  let sessions = await Session.find(q)

  res.json({
    sessions
  })
})

// -----------------------------------------------------------------------------
// /api/logs/sessionID/:date : List logs of a certain session at a certain time
// -----------------------------------------------------------------------------
app.get('/api/logs/:sessionID/date/:date', async (req, res) => {

  //console.log('date: ', req.params.date)
  let date = moment(new Date(req.params.date))
  let logs = await Log.find({
    session: req.params.sessionID,
    'timestamps.createdAt': {
      $gte: date.clone().startOf('day'),
      $lt: date.clone().endOf('day')
    }
  }).sort({
    'timestamps': 'desc'
  }).populate('user')
  res.json(logs)
})

// --------------------------------
// /api/logs/new : Add new Log
// --------------------------------
//TODO: added by 
app.post('/api/logs/add', async (req, res) => {
  var log = new Log({
    type: 'MANUAL-CHECK-IN',
    session: req.body.session,
    user: req.body.user,
    'timestamps.createdAt': req.body.createdAt
    //  addedBy: req.body.manager
  });

  await log.save()
  res.end()
})

// --------------------------------
// /api/logs/remove : Remove Log
// --------------------------------
//TODO: removed by
app.post('/api/logs/remove', async (req, res) => {
  await Log.findByIdAndRemove(req.body.id, {
    session: req.body.session,
    user: req.body.user,
  });

  res.end()
})

// --------------------------------------------------------
// /api/devices/:deviceID/view : get detail of device
// --------------------------------------------------------
app.get('/api/devices/:deviceID/view', async (req, res) => {
  let device = await Device.findById(req.params.deviceID)
  res.json(device)
})

// --------------------------------------------------------
// /api/sessions/:sessionID/days : get days of session
// --------------------------------------------------------
app.get('/api/sessions/:sessionID/days', async (req, res) => {

  let session = await Session.findById(req.params.sessionID)
  let times_days = session.times.map(function (a) {
    return a.day;
  })

  let start = moment(new Date(session.start_date)).clone()
  let end = moment(new Date(session.end_date)).clone()

  let daysOfSession = []
  temp = start.clone()

  while (temp.isSameOrBefore(end)) {
    dayOfWeek = temp.weekday()
    if (times_days.indexOf(dayOfWeek) > -1) {
      daysOfSession.push(temp)
    }
    temp = temp.clone().add(1, 'days')
  }
  res.json(daysOfSession)
})

// --------------------------------------------------------
// /api/user :
// --------------------------------------------------------
app.get('/api/user', async (req, res) => {
  res.json({
    session: req.session,
    user: req.user
  })
})

// --------------------------------------------------------
// /api/ip :
// --------------------------------------------------------
app.get('/api/ip', async (req, res) => {
  res.end(ip.address())
})

// --------------------------------------------------------
// /api/client :
// --------------------------------------------------------
app.post('/api/client', async (req, res) => {

  console.log(req.body.qr)
})

// -----------------------------------------------------------------------------
// /api/logs/sessionID/:date/chart_per_session : 
// -----------------------------------------------------------------------------
app.get('/api/logs/:sessionID/:date/chart_per_session', async (req, res) => {

  let date = moment(new Date(req.params.date))
  let logs = await Log.find({
    session: req.params.sessionID,
    'timestamps.createdAt': {
      $gte: date.clone().startOf('day'),
      $lt: date.clone().endOf('day')
    }
  }).sort({
    'timestamps': 'desc'
  }).populate('user')

  let current_session = await Session.findById(req.params.sessionID)
  let total_attendees = current_session.attendees

  res.json({
    total: total_attendees.length,
    present: logs.length
  })
})

// -----------------------------------------------------------------------------
// /api/logs/sessionID/chart_per_term : 
// -----------------------------------------------------------------------------
app.get('/api/logs/:sessionID/chart_per_term', async (req, res) => {

  let session = await Session.findById(req.params.sessionID)
  let logs_of_session = await Log.find({
    session: req.params.sessionID
  }).populate('session')

  let start = moment(new Date(session.start_date)).clone()
  let end = moment(Date.now())

  let num_of_present_in_day = [0]
  temp = start.clone()

  for (let day = 0; temp.isSameOrBefore(end); temp.add(1, 'days'), day++) {
    num_of_present_in_day[day] = 0
    logs_of_session.forEach(el => {
      let diff = temp.diff(moment(el.timestamps.createdAt), 'days', true)
      if (diff < 1 && diff > -1) {
        num_of_present_in_day[day]++
      }
    })
  }
  res.json({
    num_of_present_in_day
  })
})

// -----------------------------------------------------------------------------
// /api/logs/sessionID/chart_for_student : 
// -----------------------------------------------------------------------------
app.get('/api/logs/:sessionID/chart_for_student/:userID', async (req, res) => {

  let logs_of_student = await Log.find({
    session: req.params.sessionID,
    user: req.params.userID
  }).populate('user')

  let session = await Session.findById(req.params.sessionID)
  let times_days = session.times.map(function (a) {
    return a.day;
  })

  let start = moment(new Date(session.start_date)).clone()
  let end = moment(new Date(session.end_date)).clone()

  let daysOfSession = []
  temp = start.clone()

  while (temp.isSameOrBefore(end)) {
    dayOfWeek = temp.weekday()
    if (times_days.indexOf(dayOfWeek) > -1) {
      daysOfSession.push(temp)
    }
    temp = temp.clone().add(1, 'days')
  }

  res.json({
    present: logs_of_student.length,
    total: daysOfSession.length
  })
})
// ----------------------------------------
// /api/session-of/ : get sessions of student
// -----------------------------------------
app.get('/api/user/session-of', async (req, res) => {

  // let q = {}
  // if (req.user.role.indexOf('admin') === -1) {
  //   q._id = { $in: req.user.managerOf }
  // }

  console.log('in server')
  let user = await User.findOne({
    username: req.user.username
  })

  let sessions = await Session.find({
    attendees: user._id
  })

  console.log('session: ', sessions)

  res.json({
    sessions
  })

})
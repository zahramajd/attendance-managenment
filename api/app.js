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
app.post('/api/new_dev', async(req, res) => {
  var dev = new Device({
    name: req.body.name
  });

  await dev.save()
  res.end('new device has been added')

})

// --------------------------------
// /api/new_user : Creates new User
// --------------------------------
app.post('/api/new_user', async(req, res) => {
  var user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username
  });

  await user.save()
  res.end('new user has been added')

})

app.get('/api/pets', async(req, res) => {
  let cats = await Device.find({})
  res.json(cats)
})

const express = require('express')
const bodyParser = require('body-parser')
const {
  Cat
} = require('./db')

const app = module.exports = express()

app.use(bodyParser.json())

app.listen(4000)
console.log('API Server listening on 4000')

// --------------------------------
// /api/new : Creates new Pet
// --------------------------------
app.post('/api/new_pet', async(req, res) => {
  var kitty = new Cat({
    name: req.body.name
  });

  await kitty.save()

  res.end('Mew!')
})

app.get('/api/pets', async(req, res) => {
  let cats = await Cat.find({})
  res.json(cats)
})

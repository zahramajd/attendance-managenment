const mongoose = require('mongoose')

mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/test', {
  useMongoClient: true,
});

// --------------------------------
// Cat model
// --------------------------------
const Cat = mongoose.model('Cat', {
  name: String
});

const Device = mongoose.model('Device', {
  name: String
});

const User = mongoose.model('User', {
  first_name: String,
  last_name: String,
  username: String
});

const Session = mongoose.model('Session', {
  attendees: [String],
  rooms: [String]
});

module.exports = {
  Device,
  User,
  Session
}

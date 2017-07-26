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

module.exports = {
  Cat
}

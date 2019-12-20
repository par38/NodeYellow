const mongoose = require('mongoose')

// // + ++++++++++ schéma MVC ++++++++++
const yellowSchema = mongoose.Schema({
  name: String,
  mail: String,
  city: String
});

// où members est la collection
const YellowModel = mongoose.model('YellowModel', yellowSchema, "members");

module.exports = { YellowModel }


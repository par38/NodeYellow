const mongoose = require('mongoose')

// // + ++++++++++ schéma MVC ++++++++++
const yellowSchema = mongoose.Schema({
  nom: String,
  mail: String,
  ville: String,
  age: Number,
  famille: String,
  role: String,
  password: String
});

// où members est la collection
const YellowModel = mongoose.model('YellowModel', yellowSchema, "members");

module.exports = { YellowModel }


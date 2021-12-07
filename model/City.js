const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/weatherDB', { useNewUrlParser: true });

const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: String,
  temperature: Number,
  condition: String,
  conditionIcon: String,
});

const City = mongoose.model('city', citySchema);

module.exports = City;
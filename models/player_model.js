const mongoose = require('mongoose')

const PlayerSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Must provide a firstname!'],
    trim: true,
    maxlength: [20, 'Firstname cannot be more than 20 chars!'],
  },
  lastname: {
    type: String,
    required: [true, 'Must provide a lastname!'],
    trim: true,
    maxlength: [20, 'Lastname cannot be more than 20 chars!'],
  },
  age: {
    type: Number,
    required: [true, 'Must provide a age!'],
    min: [1, 'Invalid Age'],
    max: [120, 'Invalid Age'],
  },
  attack: {
    type: Number,
    default: 10,
  },
  def: {
    type: Number,
    default: 5,
  },
  exp: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model('Player', PlayerSchema)

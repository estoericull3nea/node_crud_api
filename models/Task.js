const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must provide a string!'],
    trim: true,
    maxlength: [20, 'Name cannot be more than 20 chars!'],
    unique: true,
  },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
})

module.exports = mongoose.model('Task', TaskSchema)

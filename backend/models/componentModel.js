const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  use: {
    type: String,
    required: true
  },
  technologies: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
});

const Component = mongoose.model('Component', componentSchema);

module.exports = Component;

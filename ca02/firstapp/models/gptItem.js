'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var gptItemSchema = Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  recommendations: [
    {
      type: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('gptItem', gptItemSchema);


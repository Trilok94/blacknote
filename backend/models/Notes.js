const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user' // using a 'user' schema as a reference model
  },
  title: {
    type: String
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
    default: 'general'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const news = mongoose.model('notes', NotesSchema); // make a noteschema collection with the name of "notes"
module.exports = news;
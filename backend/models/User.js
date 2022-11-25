const mongoose = require('mongoose');
const { Schema } = mongoose;
// this is my user collection 
const UserSchema = new Schema({
  name: {
    type : String,
    required: true
  },
  email: {
    type : String,
    required: true,
    unique: true // only unique key in database
  },
  password: {
    type: String,
    required:true
  },
  date:{
    type: Date,
    default: Date.now
  }
});

const user = mongoose.model('user',UserSchema);
user.createIndexes(); // for creating unique index form
module.exports = user
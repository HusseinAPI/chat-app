const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String },
  phone: { type: String },
  email: { type: String },
  password: { type: String },
  contacts: { type: Array },
});

module.exports = mongoose.model('Users', userSchema);

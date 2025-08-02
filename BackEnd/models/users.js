const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  token: String,
  author: String,
  bestScore: { type: Number, default: 0 },
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
